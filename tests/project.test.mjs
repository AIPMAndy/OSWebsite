import test from 'node:test';
import assert from 'node:assert/strict';
import {readFileSync,existsSync} from 'node:fs';
import {fileURLToPath} from 'node:url';
import {resolve,dirname} from 'node:path';
import {SITE, THEMES, DEVICES, APPS} from '../src/config.js';
import {escapeHTML,safeURL,readJSON,icon} from '../src/utils.js';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const read=x=>readFileSync(resolve(root,x),'utf8');

test('static entrypoints exist and use same JS core',()=>{
 for(const x of ['index.html','src/main.js','src/apps.js','src/styles.css','assets/favicon.svg','LICENSE'])assert.ok(existsSync(resolve(root,x)),x);
 assert.match(read('index.html'),/type="module" src="\.\/src\/main\.js"/);
 assert.match(read('index.html'),/viewport/);
});
test('five distinct themes and five device shells',()=>{
 assert.equal(THEMES.length,5);assert.equal(new Set(THEMES.map(x=>x.id)).size,5);
 assert.equal(DEVICES.length,5);assert.equal(new Set(DEVICES.map(x=>x.id)).size,5);
 for(const d of DEVICES){assert.ok(d.width>=300&&d.height>=600);assert.ok(['desktop','tablet','phone'].includes(d.type));}
});
test('eleven uniquely identified interactive apps',()=>{
 assert.equal(APPS.length,11);assert.equal(new Set(APPS.map(x=>x.id)).size,11);
 for(const x of APPS)assert.ok(x.name&&x.icon&&x.color);
 assert.match(read('src/main.js'),/function openApp\(/);
 assert.match(read('src/main.js'),/function renderWindows\(/);
});
test('example site has meaningful content and absolute safe links',()=>{
 assert.ok(SITE.brand&&SITE.intro&&SITE.tagline);
 assert.ok(SITE.projects.length>=5);
 assert.equal(new Set(SITE.projects.map(p=>p.id)).size,SITE.projects.length);
 for(const link of [...SITE.links,...SITE.projects.map(p=>({url:p.link}))])assert.match(safeURL(link.url),/^https:\/\//);
});
test('HTML encoding prevents untrusted HTML insertion',()=>{
 assert.equal(escapeHTML('<img src=x onerror="x">'),'&lt;img src=x onerror=&quot;x&quot;&gt;');
 assert.equal(safeURL('javascript:alert(1)'),'#');
 assert.equal(safeURL('data:text/html,<script>alert(1)</script>'),'#');
 assert.match(icon('grid'),/<svg/);
});
test('terminology and data provenance are honest',()=>{
 assert.match(read('src/apps.js'),/演示数据，非真实业务指标/);
 assert.match(read('src/apps.js'),/不会执行系统命令/);
 assert.match(read('README.md'),/MIT License/);
 assert.match(read('README.md'),/没有用户登录/);
});
test('local workflows and keyboard commands have handlers',()=>{
 const script=read('src/main.js');
 for(const token of ['note-textarea','task-add-form','task-add-form','data-task-move','data-export-config','config-file-input','metaKey','ctrlKey','data-drag-title','dragstart','dragover','drop'])assert.ok(script.includes(token),token);
});
