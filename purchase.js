'use strict';
(()=>{
 const plans={solo:{name:'Solo',usd:49,devices:1},office:{name:'Office',usd:79,devices:2},pro:{name:'Pro',usd:119,devices:3}};
 const plan=document.getElementById('purchase-plan'),method=document.getElementById('payment-method'),details=document.getElementById('payment-details'),form=document.getElementById('purchase-form');
 const requested=new URLSearchParams(location.search).get('plan');if(Object.hasOwn(plans,requested))plan.value=requested;
 function amount(p){return (p.usd*709/1000).toFixed(3)}
 function reset(){const p=plans[plan.value];document.getElementById('usd-total').textContent=p.usd+' USD / سنة';document.getElementById('jod-total').textContent=amount(p)+' دينار أردني';details.hidden=true;document.getElementById('purchase-agree').checked=false;}
 plan.addEventListener('change',reset);method.addEventListener('change',reset);reset();
 form.addEventListener('submit',e=>{e.preventDefault();if(!form.reportValidity())return;const p=plans[plan.value],ref='AZ-'+new Date().toISOString().slice(0,10).replaceAll('-','')+'-'+crypto.randomUUID().slice(0,8).toUpperCase();const summary=p.name+' — '+p.devices+' جهاز / أجهزة — 12 شهرًا — '+amount(p)+' JOD';document.getElementById('order-summary').textContent=summary;document.getElementById('order-ref').textContent=ref;document.getElementById('cliq-details').hidden=method.value!=='cliq';document.getElementById('bank-details').hidden=method.value!=='bank';const body='مرجع الطلب: '+ref+'\nالباقة: '+summary+'\nطريقة الدفع: '+(method.value==='bank'?'تحويل مصرفي':'CliQ')+'\nاسم المرسل: \nرقم عملية التحويل: \nتاريخ التحويل: \nيرجى مراجعة وصول المبلغ وتفعيل الترخيص.';document.getElementById('payment-email').href='mailto:info@azrar-systems.com?subject='+encodeURIComponent('تأكيد تحويل ترخيص أزرار — '+ref)+'&body='+encodeURIComponent(body);details.hidden=false;details.focus();details.scrollIntoView({behavior:'smooth',block:'start'});});
 document.getElementById('payment-edit').addEventListener('click',()=>{details.hidden=true;form.scrollIntoView({behavior:'smooth'});plan.focus()});
})();
