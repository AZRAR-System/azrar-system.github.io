// Renders video.html frame-by-frame through Electron and pipes PNG frames into ffmpeg.
// Usage: electron render.cjs [out.mp4] [fromSec] [toSec]   (fromSec/toSec only for quick previews)
const { app, BrowserWindow } = require('electron');
const { spawn } = require('child_process');
const path = require('path');
const fs = require('fs');

app.disableHardwareAcceleration();
const out = path.resolve(process.argv[2] && !process.argv[2].startsWith('-') ? process.argv[2] : 'out/azrar-tour.mp4');
const from = Number(process.argv[3] || 0);
app.whenReady().then(async () => {
  const win = new BrowserWindow({ width: 1920, height: 1080, useContentSize: true, show: false, webPreferences: { offscreen: true, backgroundThrottling: false } });
  win.webContents.setFrameRate(60);
  await win.loadFile(path.join(__dirname, 'video.html'));
  while (!(await win.webContents.executeJavaScript('window.READY === true'))) await new Promise((r) => setTimeout(r, 100));
  const fps = await win.webContents.executeJavaScript('window.FPS');
  const dur = await win.webContents.executeJavaScript('window.DURATION');
  const to = Number(process.argv[4] || dur);
  const n = Math.round((to - from) * fps);
  fs.mkdirSync(path.dirname(out), { recursive: true });
  const ff = spawn('ffmpeg', ['-y', '-loglevel', 'error', '-f', 'image2pipe', '-framerate', String(fps), '-i', '-',
    '-vf', 'scale=1920:1080:flags=lanczos,format=yuv420p', '-c:v', 'libx264', '-preset', 'slow', '-crf', '15', '-movflags', '+faststart', out]);
  ff.stderr.on('data', (d) => process.stderr.write(d));
  for (let i = 0; i < n; i++) {
    await win.webContents.executeJavaScript(`setTime(${(from + i / fps).toFixed(4)})`);
    await new Promise((r) => setTimeout(r, 40)); // let the offscreen compositor paint the new frame
    const img = await win.webContents.capturePage();
    if (!ff.stdin.write(img.toPNG())) await new Promise((r) => ff.stdin.once('drain', r));
    if (i % 60 === 0) console.log(`frame ${i}/${n}`);
  }
  ff.stdin.end();
  await new Promise((r) => ff.on('close', r));
  console.log('done', out);
  app.quit();
});
