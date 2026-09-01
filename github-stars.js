// Shows a real GitHub star-count badge for the public releases repo.
// GitHub's public repo API is CORS-enabled, so this fetches live —
// no fabricated numbers, badge stays hidden while stars are 0.
(function () {
  fetch('https://api.github.com/repos/AZRAR-System/azrar-releases', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !data.stargazers_count) return;

      var stars = data.stargazers_count;
      var badge = document.getElementById('github-stars-badge');
      if (!badge) return;

      badge.innerHTML =
        '<span class="stars">★</span>' +
        '<span class="ar">' + stars + ' نجمة على GitHub</span>' +
        '<span class="en">' + stars + ' stars on GitHub</span>';
      badge.removeAttribute('aria-label'); // injected text is now the accessible name
      badge.hidden = false;
    })
    .catch(function () { /* offline or API unavailable — stay hidden */ });
})();
