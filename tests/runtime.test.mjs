import test from 'node:test';
import assert from 'node:assert/strict';
import vm from 'node:vm';
import {readFileSync} from 'node:fs';
import {resolve,dirname} from 'node:path';
import {fileURLToPath} from 'node:url';
const root=resolve(dirname(fileURLToPath(import.meta.url)),'..');
const standalone=readFileSync(resolve(root,'OSWebsite-demo.html'),'utf8');
const script=standalone.split('<script>')[1].split('</script>')[0];
const rootNode={innerHTML:''};
const events={};
const storage={};
const document={
  body:{dataset:{},classList:{add(){},remove(){}}},
  querySelector(q){return q==='#app'?rootNode:null},querySelectorAll(){return []},
  addEventListener(type,handler){events[type]=handler},
  getElementById(){return null}
};
const win={innerWidth:1440,addEventListener(){}};
const ctx=vm.createContext({document,window:win,location:{href:'http://example.local/?smoke=1'},
 localStorage:{getItem(k){return storage[k]??null},setItem(k,v){storage[k]=v}},
 URL,Intl,Date,Math,Number,String,Array,Object,JSON,RegExp,Boolean,Error,
 setInterval(){return 1},setTimeout(){return 1},clearTimeout(){},requestAnimationFrame(){return 1},
 console
});
vm.runInContext(script,ctx,{timeout:2000});
const ev=(code)=>vm.runInContext(code,ctx,{timeout:2000});

test('standalone boots into Studio and exposes a device renderer',()=>{
  assert.match(rootNode.innerHTML,/OSWebsite/);
  assert.match(rootNode.innerHTML,/INTERACTIVE PREVIEW/);
  assert.match(rootNode.innerHTML,/data-device="ios"/);
  assert.equal(win.__OSWebsiteTest.getState().appCount,11);
  assert.equal(win.__OSWebsiteTest.getState().device,'mac');
});
test('all built-in views render actual HTML without throwing',()=>{
  const apps=['about','projects','files','gallery','notes','tasks','terminal','browser','analytics','contact','settings'];
  for(const id of apps){
    const view=ev(`getAppContent(${JSON.stringify(id)},state)`);
    assert.equal(typeof view,'string',id);
    assert.ok(view.length>300,id);
  }
  assert.match(ev(`getAppContent('projects',state)`),/FreeGIF/);
  assert.match(ev(`getAppContent('analytics',state)`),/演示数据/);
});
test('each OS shell renders without crashing',()=>{
  for(const device of ['mac','windows','ipad','ios','android']){
    ev(`state.device=${JSON.stringify(device)}`);
    const view=ev(`state.device==='ios'||state.device==='android' ? renderPhone() : renderDesktop()`);
    assert.match(view,/wallpaper/);
    assert.match(view,/data-open="projects"/);
  }
});
test('local config import strips unsafe URLs and unknown keys',()=>{
 const v=ev(`validateImported({brand:'test',other:'ignored',links:[{label:'danger',url:'javascript:alert(1)'},{label:'OK',url:'https://example.com'}]})`);
 assert.equal(v.brand,'test');assert.equal('other' in v,false);assert.equal(v.links.length,1);
});
