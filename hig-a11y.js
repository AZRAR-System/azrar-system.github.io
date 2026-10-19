/* AZRAR · hig-a11y.js — keyboard + screen-reader support for click-only widgets
   (screenshot gallery, video list, lightbox). دعم لوحة المفاتيح لعناصر النقر فقط. */
(function () {
  var ar = (document.documentElement.lang || 'ar').slice(0, 2) === 'ar';
  var L = ar ? { close: 'إغلاق', prev: 'السابق', next: 'التالي', dlg: 'عارض اللقطات', vid: 'مشغّل فيديو شرح نظام أزرار' }
             : { close: 'Close', prev: 'Previous', next: 'Next', dlg: 'Screenshot viewer', vid: 'AZRAR tutorial video player' };

  function press(e) {
    if (e.key !== 'Enter' && e.key !== ' ') return;
    var t = e.target;
    if (t.matches && t.matches('[data-kbd]')) { e.preventDefault(); t.click(); }
  }
  function kbd(el) { el.setAttribute('tabindex', '0'); el.setAttribute('role', 'button'); el.setAttribute('data-kbd', ''); }

  document.querySelectorAll('figure.shot[onclick], .vid[onclick]').forEach(kbd);
  document.addEventListener('keydown', press);

  var v = document.getElementById('main-video-player');
  if (v && !v.getAttribute('aria-label')) v.setAttribute('aria-label', L.vid);

  var lb = document.getElementById('lightbox');
  if (!lb) return;
  lb.setAttribute('role', 'dialog'); lb.setAttribute('aria-modal', 'true'); lb.setAttribute('aria-label', L.dlg);
  var x = lb.querySelector('.lightbox-x');
  if (x) { kbd(x); x.setAttribute('aria-label', L.close); x.onclick = function (e) { e.stopPropagation(); closeShot(); }; }
  lb.querySelectorAll('.lightbox-nav').forEach(kbd);

  var opener = null, openShotOrig = window.openShot, closeShotOrig = window.closeShot;
  window.openShot = function (el) { opener = el; openShotOrig(el); if (x) x.focus(); };
  window.closeShot = function () { closeShotOrig(); if (opener) opener.focus(); };

  // keep Tab inside the dialog while it is open
  lb.addEventListener('keydown', function (e) {
    if (e.key !== 'Tab') return;
    var f = [].slice.call(lb.querySelectorAll('[data-kbd]'));
    if (!f.length) return;
    var first = f[0], last = f[f.length - 1];
    if (e.shiftKey && document.activeElement === first) { e.preventDefault(); last.focus(); }
    else if (!e.shiftKey && document.activeElement === last) { e.preventDefault(); first.focus(); }
  });
})();
