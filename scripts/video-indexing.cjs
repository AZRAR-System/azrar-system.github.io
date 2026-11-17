'use strict';

const assert = require('node:assert/strict');
const fs = require('node:fs');
const path = require('node:path');
const root = path.resolve(__dirname, '..');
const read = file => fs.readFileSync(path.join(root, file), 'utf8');
const check = process.argv.includes('--check');
const save = (file, before, after) => {
  if (check) assert.ok(before === after, file + ': run node scripts/video-indexing.cjs');
  else if (before !== after) fs.writeFileSync(path.join(root, file), after);
};
const xml = value => String(value).replace(/[&<>]/g, char => ({'&': '&amp;', '<': '&lt;', '>': '&gt;'})[char]);
const simulation = 'simulation-introduction.html';
const pages = fs.readdirSync(root).filter(file => file === simulation || /^(?:lesson-.+|azrar-introduction(?:-en)?)\.html$/.test(file));
const sitemap = read('video-sitemap.xml');
const pageSitemap = read('sitemap.xml');
const missing = [];

for (const suffix of ['', '-en']) {
  const file = 'index' + suffix + '.html';
  const html = read(file);
  const updated = html
    .replace(/<button type="button" class="youtube-facade" data-youtube-id="[^"]+"([^>]+)>([\s\S]*?)<\/button>/,
      '<a class="youtube-facade" href="azrar-introduction' + suffix + '.html"$1>$2</a>')
    .replace(/<video id="promo-video-el"[^>]*poster="([^"]+)"[^>]*>[\s\S]*?<\/video><button class="video-play"[^>]*>([\s\S]*?)<\/button>/,
      '<a class="youtube-facade" href="lesson-introduction' + suffix + '.html"><img src="$1" width="960" height="540" loading="lazy" alt=""><span class="video-play">$2</span></a>');
  save(file, html, updated);
}

for (const file of pages) {
  const html = read(file);
  const main = html.match(/<main\b[^>]*>([\s\S]*?)<\/main>/)[1];
  const players = [...main.matchAll(/<video\b[^>]*>[\s\S]*?<\/video>|<iframe\b[^>]*>[\s\S]*?<\/iframe>/g)];
  assert.equal(players.length, 1, file + ': expected one video player');
  const [player] = players[0];
  const wrapper = '<div class="page-wrap" style="padding-top:16px">' + player + '</div>';
  const body = main.startsWith(wrapper) ? main : wrapper + main.replace(player, '');
  const canonical = html.match(/<link rel="canonical" href="([^"]+)"/)[1];
  assert.ok(pageSitemap.includes('<loc>' + canonical + '</loc>'), file + ': missing from page sitemap');

  const video = [...html.matchAll(/<script\b[^>]*type="application\/ld\+json"[^>]*>([\s\S]*?)<\/script>/g)]
    .map(match => JSON.parse(match[1]))
    .flatMap(schema => schema['@graph'] || [schema])
    .find(schema => schema['@type'] === 'VideoObject');
  assert.ok(video?.thumbnailUrl && video.name && video.description, file + ': incomplete VideoObject');
  const source = new URL(player.match(/\bsrc="([^"]+)"/)[1].replace(/&amp;/g, '&'), canonical);
  assert.equal(source.href, video.contentUrl || video.embedUrl, file + ': video source differs from VideoObject');

  if (!sitemap.includes('<loc>' + canonical + '</loc>')) {
    const thumbnail = [video.thumbnailUrl].flat()[0];
    const locationTag = video.contentUrl ? 'content_loc' : 'player_loc';
    missing.push('<url><loc>' + xml(canonical) + '</loc><video:video>'
      + '<video:thumbnail_loc>' + xml(thumbnail) + '</video:thumbnail_loc>'
      + '<video:title>' + xml(video.name) + '</video:title>'
      + '<video:description>' + xml(video.description) + '</video:description>'
      + '<video:' + locationTag + '>' + xml(source.href) + '</video:' + locationTag + '>'
      + '</video:video></url>');
  }
  save(file, html, html.replace(main, () => body));
}

save('video-sitemap.xml', sitemap, sitemap.replace('</urlset>', () => (
  missing.length ? '\n' + missing.join('\n') + '\n</urlset>' : '</urlset>'
)));
console.log('Video watch pages checked: ' + pages.length);
