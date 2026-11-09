'use strict';
const fs=require('fs'),path=require('path'),root=path.resolve(__dirname,'..');
const config="window.gtag('config', 'G-2559V4GJ25', { allow_google_signals: false, allow_ad_personalization_signals: false });";
const ready="\n      window.azrarAnalyticsReady=true;window.dispatchEvent(new Event('azrar:analytics-ready'));";
let count=0;
for(const file of fs.readdirSync(root).filter(f=>f.endsWith('.html'))){
 const p=path.join(root,file);let h=fs.readFileSync(p,'utf8');
 h=h.replaceAll('GTM-WXHDB8R','GTM-5V5KN5FB').replaceAll(ready,'');
 const configPattern=/(?:window\.)?gtag\('config',\s*'G-2559V4GJ25',\s*\{ allow_google_signals: false, allow_ad_personalization_signals: false \}\);/;
 if(configPattern.test(h)){h=h.replace(configPattern,m=>m+ready);count++;}
 fs.writeFileSync(p,h);
}
console.log(JSON.stringify({analyticsPages:count,measurement:'G-2559V4GJ25'}));
