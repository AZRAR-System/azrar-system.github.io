// Renders a Microsoft Store rating badge + AggregateRating structured data,
// but only if store-rating.json (synced from the real Store catalog API via
// scripts/sync_store_rating.py) actually has reviews. No reviews yet = no
// badge, no schema — never fabricate a rating that doesn't exist.
(function () {
  fetch('/store-rating.json', { cache: 'no-store' })
    .then(function (r) { return r.ok ? r.json() : null; })
    .then(function (data) {
      if (!data || !data.ratingCount || data.ratingCount < 1) return;

      var rating = Math.round(data.averageRating * 10) / 10;
      var full = Math.round(rating);
      var stars = '★'.repeat(full) + '☆'.repeat(5 - full);

      var badge = document.getElementById('store-rating-badge');
      if (badge) {
        badge.innerHTML =
          '<span class="stars">' + stars + '</span>' +
          '<span class="ar">' + rating + ' من 5 · ' + data.ratingCount + ' تقييم على Microsoft Store</span>' +
          '<span class="en">' + rating + ' / 5 · ' + data.ratingCount + ' ratings on Microsoft Store</span>';
        badge.hidden = false;
      }

      var ld = document.getElementById('ld-schema');
      if (ld) {
        try {
          var json = JSON.parse(ld.textContent);
          var app = (json['@graph'] || []).find(function (n) { return n['@type'] === 'SoftwareApplication'; });
          if (app) {
            app.aggregateRating = {
              '@type': 'AggregateRating',
              ratingValue: String(rating),
              ratingCount: String(data.ratingCount),
              bestRating: '5',
              worstRating: '1'
            };
            ld.textContent = JSON.stringify(json);
          }
        } catch (e) { /* malformed schema, leave untouched */ }
      }
    })
    .catch(function () { /* offline or endpoint unavailable — stay hidden */ });
})();
