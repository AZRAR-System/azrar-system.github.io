/* AZRAR conversion events (GA4). One delegated listener per page.
   Events: store_click, trial_lead, whatsapp_click, email_click.
   Params are ONLY {destination, placement, page_lang}: never the href, phone number,
   e-mail address or pre-filled WhatsApp text (those are personal data / PII).
   A store click is a CLICK, not an install; a WhatsApp click is a contact, not a sale.
   Installs happen outside the site (Partner Center is the source of truth). */
(function () {
  if (window.__azTrack) return;
  window.__azTrack = 1;
  window.dataLayer = window.dataLayer || [];
  if (typeof window.gtag !== 'function') window.gtag = function () { window.dataLayer.push(arguments); };

  function placement(a) {
    if (a.closest('nav')) return 'nav';
    if (a.closest('footer')) return 'footer';
    if (a.closest('.wa-float-btn')) return 'floating';
    if (a.closest('.cta')) return 'cta';
    if (a.closest('.hero')) return 'hero';
    var s = a.closest('section[id]');
    return s ? s.id : 'page';
  }

  document.addEventListener('click', function (e) {
    var a = e.target && e.target.closest && e.target.closest('a[href]');
    if (!a || e.__azSent) return;
    var href = a.getAttribute('href') || '', name, dest;
    if (href.indexOf('apps.microsoft.com') > -1) { name = 'store_click'; dest = 'microsoft_store'; }
    else if (href.indexOf('wa.me') > -1 || href.indexOf('api.whatsapp') > -1) {
      var t = ''; try { t = decodeURIComponent(href); } catch (_) {}
      name = /تجرب|trial|try azrar/i.test(t) ? 'trial_lead' : 'whatsapp_click'; dest = 'whatsapp';
    } else if (href.indexOf('mailto:') === 0) { name = 'email_click'; dest = 'email'; }
    else return;
    e.__azSent = 1;
    window.gtag('event', name, {
      destination: dest,
      placement: placement(a),
      page_lang: document.documentElement.getAttribute('data-lang') || document.documentElement.lang || '',
      transport_type: 'beacon'
    });
  }, true);
})();
