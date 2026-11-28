import fs from 'node:fs/promises';
import {execFileSync} from 'node:child_process';
const host='azrar-systems.com', origin='https://'+host;
const key='4610a56fbf0f0262fa8f3f5bd06be961';
const forceAll=process.argv.includes('--all')||process.env.GITHUB_EVENT_NAME==='workflow_dispatch';
const sitemap=await fs.readFile('sitemap.xml','utf8');
const all=[...sitemap.matchAll(/<loc>([^<]+)<\/loc>/g)].map(m=>m[1]);
const changed=forceAll?null:execFileSync('git',['diff','--name-only','HEAD^','HEAD'],{encoding:'utf8'}).trim().split('\n');
const urls=all.filter(url=>{const p=new URL(url).pathname.slice(1)||'index.html';return !changed||changed.includes(p)||changed.some(f=>/\.(css|js)$/.test(f)&&!f.startsWith('scripts/'))||changed.includes('scripts/submit-indexnow.mjs')||changed.includes('.github/workflows/indexnow.yml');});
if(!urls.length){console.log('No indexable page updates to submit.');process.exit(0);}
if(process.argv.includes('--dry-run')){console.log(JSON.stringify({host,count:urls.length,urls}));process.exit(0);}
// Wait for Pages to expose this deployment before notifying search engines.
if(process.env.GITHUB_SHA){
 let deployed=false;
 for(let attempt=0;attempt<30;attempt++){
  const response=await fetch('https://api.github.com/repos/AZRAR-System/azrar-system.github.io/actions/runs?event=dynamic&head_sha='+process.env.GITHUB_SHA,{headers:{Accept:'application/vnd.github+json'},signal:AbortSignal.timeout(15000)});
  if(!response.ok)throw new Error('Cannot check Pages deployment: HTTP '+response.status);
  const runs=(await response.json()).workflow_runs||[];
  const pages=runs.find(run=>run.name==='pages build and deployment');
  if(pages?.conclusion==='success'){deployed=true;break;}
  if(pages?.status==='completed')throw new Error('Pages deployment failed: '+pages.conclusion);
  await new Promise(resolve=>setTimeout(resolve,10000));
 }
 if(!deployed)throw new Error('Pages deployment is still pending; rerun IndexNow after deployment.');
}
let ready=false;for(let attempt=0;attempt<24;attempt++){try{const response=await fetch(origin+'/'+key+'.txt',{signal:AbortSignal.timeout(15000)});if(response.ok&&(await response.text()).trim()===key){ready=true;break;}}catch{}await new Promise(resolve=>setTimeout(resolve,10000));}
if(!ready)throw new Error('IndexNow ownership file is not live yet. Re-run after Pages deployment.');
const response=await fetch('https://api.indexnow.org/indexnow',{method:'POST',headers:{'Content-Type':'application/json; charset=utf-8'},body:JSON.stringify({host,key,keyLocation:origin+'/'+key+'.txt',urlList:urls}),signal:AbortSignal.timeout(30000)});
console.log(JSON.stringify({status:response.status,submitted:urls.length}));if(![200,202].includes(response.status))throw new Error('IndexNow rejected submission: '+await response.text());
