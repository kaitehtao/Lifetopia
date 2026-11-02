import fs from 'node:fs';
import path from 'node:path';
const repository=process.env.GITHUB_REPOSITORY||'kaitehtao/Lifetopia';
const name=repository.split('/')[1];
const base=name.toLowerCase().endsWith('.github.io')?'':`/${name}`;
const destination='github-pages';
fs.mkdirSync(destination,{recursive:true});
fs.cpSync('dist',destination,{recursive:true});
function visit(directory){
 for(const entry of fs.readdirSync(directory,{withFileTypes:true})){
  const file=path.join(directory,entry.name);
  if(entry.isDirectory()){visit(file);continue;}
  if(/\.(css|html|aspx)$/.test(file)){
   let content=fs.readFileSync(file,'utf8');
   content=content.replace(/((?:href|src)=["'])\/(?!\/)/g,`$1${base}/`);
   content=content.replace(/(url\(["']?)\/(?!\/)/g,`$1${base}/`);
   content=content.replace(/(@import\s+["'])\/(?!\/)/g,`$1${base}/`);
   fs.writeFileSync(file,content);
  }
 }
}
visit(destination);
fs.writeFileSync(path.join(destination,'.nojekyll'),'');
console.log(`Prepared GitHub Pages assets for ${base||'/'}`);
