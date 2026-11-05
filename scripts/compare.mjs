import { chromium } from 'playwright-core';
import pixelmatch from 'pixelmatch';
import { PNG } from 'pngjs';
import fs from 'fs';
const [,, W='1440', H='900', tag='d'] = process.argv;
const b = await chromium.launch({executablePath:'/usr/bin/google-chrome',args:['--no-sandbox']});
async function shot(url, out, hide, clipY) {
  const p = await b.newPage({viewport:{width:+W,height:+H}});
  await p.goto(url,{waitUntil:'networkidle'}).catch(()=>{});
  await p.addStyleTag({content: hide});
  await p.waitForTimeout(2500);
  await p.screenshot({path:out});
  await p.close();
}
const hideRef = 'img,video,canvas,picture,[class*=cookie],[id*=axeptio],#axeptio_overlay,[class*=axeptio]{visibility:hidden!important} h1~*{} ';
const hideMine = '[aria-hidden=true]{visibility:hidden!important}';
await shot('https://mistral.ai/fr/news/', `ref-${tag}.png`, hideRef);
await shot('http://127.0.0.1:4322/', `mine-${tag}.png`, hideMine);
await b.close();
const a = PNG.sync.read(fs.readFileSync(`ref-${tag}.png`)), m = PNG.sync.read(fs.readFileSync(`mine-${tag}.png`));
const w=Math.min(a.width,m.width), h=Math.min(a.height,m.height);
const crop=(img)=>{const o=new PNG({width:w,height:h});PNG.bitblt(img,o,0,0,w,h,0,0);return o};
const A=crop(a),M=crop(m),D=new PNG({width:w,height:h});
// aucun masque de pixels : seuls images, bandeau cookies cachés (visibility) des deux côtés
const maskY0 = 0, maskY1 = 0;
for (const img of [A,M]) for (let y=maskY0;y<maskY1;y++) for (let x=0;x<w;x++){const i=(y*w+x)*4;img.data[i]=img.data[i+1]=img.data[i+2]=255;img.data[i+3]=255;}
const n = pixelmatch(A.data,M.data,D.data,w,h,{threshold:0.1});
fs.writeFileSync(`diff-${tag}.png`,PNG.sync.write(D));
const bands={}; 
for (let y0=0;y0<h;y0+=100){let c=0;for(let y=y0;y<Math.min(h,y0+100);y++)for(let x=0;x<w;x++){const i=(y*w+x)*4;if(D.data[i]===255&&D.data[i+1]===0)c++;}bands[y0]=(100*c/(w*Math.min(100,h-y0))).toFixed(1)+'%'}
console.log(JSON.stringify({size:[w,h],differing_px:n,pct:(100*n/(w*h)).toFixed(2)+'%',bands}));
