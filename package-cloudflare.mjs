import fs from 'node:fs';
import path from 'node:path';
import { createRequire } from 'node:module';
const require=createRequire(import.meta.url);
const JSZip=require('jszip');
const zip=new JSZip();let count=0;
function add(directory,prefix=''){
 for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
  const relative=path.posix.join(prefix,entry.name);
  const full=path.join(directory,entry.name);
  if(entry.isDirectory())add(full,relative);
  else {zip.file(relative,fs.readFileSync(full));count++;}
 }
}
if(!fs.existsSync('dist/index.html'))throw new Error('Run node build.mjs first.');
add('dist');
const output=path.resolve('../lifetopia-cloudflare-pages.zip');
fs.writeFileSync(output,await zip.generateAsync({type:'nodebuffer',compression:'DEFLATE'}));
console.log(JSON.stringify({archive:output,files:count,bytes:fs.statSync(output).size}));
