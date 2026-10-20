/* AZRAR · late-fee-calc.js — late rent fee calculator for the late-fees article (AR + EN).
   حاسبة غرامة تأخير الإيجار. Pure logic is exposed as window.computeLateFee for testing. */
(function (root) {
  'use strict';

  function num(v) {
    var n = parseFloat(String(v).replace(',', '.'));
    return isFinite(n) && n > 0 ? n : 0;
  }

  /** method: 'fixed' | 'daily' | 'percent'. cap 0 = no cap. Fixed and percent apply once, only when late. */
  function computeLateFee(o) {
    var amount = num(o.amount), days = Math.floor(num(o.days)), rate = num(o.rate), cap = num(o.cap);
    var fee = 0;
    if (days > 0) {
      if (o.method === 'daily') fee = rate * days;
      else if (o.method === 'percent') fee = amount * rate / 100;
      else fee = rate;
    }
    var capped = false;
    if (cap > 0 && fee > cap) { fee = cap; capped = true; }
    fee = Math.round(fee * 100) / 100;
    return { fee: fee, total: Math.round((amount + fee) * 100) / 100, capped: capped };
  }
  root.computeLateFee = computeLateFee;

  if (typeof document === 'undefined') return;
  var form = document.getElementById('late-fee-calc');
  if (!form) return;

  var ar = (document.documentElement.lang || 'ar').slice(0, 2) === 'ar';
  var fmt = new Intl.NumberFormat(ar ? 'ar-JO-u-nu-latn' : 'en-US', { maximumFractionDigits: 2 });
  var L = ar
    ? { fixed: 'مبلغ الغرامة المقطوع', daily: 'مبلغ الغرامة لكل يوم', percent: 'نسبة الغرامة من القسط (%)', capped: ' (بلغت السقف)' }
    : { fixed: 'Flat fee amount', daily: 'Fee amount per day', percent: 'Fee as % of the installment', capped: ' (cap reached)' };

  var $ = function (id) { return document.getElementById(id); };
  function update() {
    var method = $('lf-method').value;
    $('lf-rate-label').textContent = L[method];
    var r = computeLateFee({ amount: $('lf-amount').value, days: $('lf-days').value, method: method, rate: $('lf-rate').value, cap: $('lf-cap').value });
    $('lf-fee').textContent = fmt.format(r.fee) + (r.capped ? L.capped : '');
    $('lf-total').textContent = fmt.format(r.total);
  }
  form.addEventListener('input', update);
  form.addEventListener('change', update);
  form.addEventListener('submit', function (e) { e.preventDefault(); });
  update();
})(typeof window !== 'undefined' ? window : globalThis);
