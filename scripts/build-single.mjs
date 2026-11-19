/** Build a self-contained HTML file using only Node.js core modules. */
import {readFileSync,writeFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=path=>readFileSync(resolve(root,path),'utf8');
const js=['src/config.js','src/utils.js','src/apps.js','src/main.js'].map(path=>read(path)
  .replace(/^import\s+[^\n]*\s+from\s+['"][^'"]+['"];?\s*$/gm,'')
  .replace(/\bexport\s+(?=(?:const|let|function|class)\b)/g,''));
const code=js.slice(0,2).join('\n')+'\nconst e = escapeHTML;\n'+js.slice(2).join('\n');
if(/(?:^|\n)\s*import\s/m.test(code))throw new Error('Unbundled imports remain');
const original=read('index.html');
const svg=read('assets/favicon.svg');
const favicon=`data:image/svg+xml,${encodeURIComponent(svg)}`;
const html=original.replace('<link rel="icon" href="./assets/favicon.svg" type="image/svg+xml">',`<link rel="icon" href="${favicon}" type="image/svg+xml">`)
 .replace('<link rel="stylesheet" href="./src/styles.css">',`<style>${read('src/styles.css')}</style>`)
 .replace('<script type="module" src="./src/main.js"></script>','')
 .replace('</body>',()=>`<script>${code.replace(/<\/script/gi,'<\\/script')}</script>\n</body>`);
const output=resolve(root,'OSWebsite-demo.html');
writeFileSync(output,html);
console.log('Built OSWebsite-demo.html:',Math.round(Buffer.byteLength(html)/1024),'KB');
