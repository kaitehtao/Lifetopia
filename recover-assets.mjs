import fs from 'node:fs';import path from 'node:path';import {spawn} from 'node:child_process';
const refs=new Set();
for(const f of fs.readdirSync('archive')){let h=fs.readFileSync('archive/'+f,'utf8').replace(/<!--[\s\S]*?-->/g,'');for(const m of h.matchAll(/<img[^>]+src=["']([^"']+)/gi)){if(!m[1].startsWith('http')&&!m[1].includes('?'))refs.add(m[1].replace(/^\//,''));}}
refs.add('assets/Lifetopia.mp4');
const queue=[...refs].filter(x=>!fs.existsSync('dist/'+x));
async function worker(){while(queue.length){const rel=queue.shift();fs.mkdirSync(path.dirname('dist/'+rel),{recursive:true});await new Promise(resolve=>{const p=spawn('curl',['-sSL','--fail','--max-time','90','https://web.archive.org/web/20200221225249id_/http://www.lifetopia.com/'+rel,'-o','dist/'+rel]);p.on('close',code=>{console.log(rel,code);resolve()});});}}
await Promise.all(Array.from({length:6},worker));
