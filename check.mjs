import fs from 'node:fs';
let pages=0;const errors=[];
for(const file of fs.readdirSync('dist').filter(f=>f.endsWith('.html'))){
 pages++;const html=fs.readFileSync('dist/'+file,'utf8');
 for(const match of html.matchAll(/(?:href|src)="([^"]+)"/g)){
  const url=match[1];if(/^(https?:|mailto:|tel:|#|data:)/.test(url))continue;
  if(!fs.existsSync('dist/'+url.replace(/^\//,'').split(/[?#]/)[0]))errors.push(file+': '+url);
 }
}
if(errors.length){console.error(errors.join('\n'));process.exit(1);}
console.log(`Verified local links and asset targets across ${pages} pages.`);
