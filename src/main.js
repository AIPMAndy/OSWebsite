import {SITE, THEMES, DEVICES, APPS} from './config.js';
import {getAppContent, titleForApp} from './apps.js';
import {$,$$,icon,escapeHTML as e,safeURL,readJSON,saveJSON,downloadText,clock,dateText} from './utils.js';

const url = new URL(location.href);
const saved = readJSON('preferences',{});
const defaults = {theme:'nebula',device:'mac',motion:true,widgets:true};
const startup = {...defaults,...saved};
const paramsDevice = DEVICES.find(d=>d.id===url.searchParams.get('device'))?.id;
const paramsTheme = THEMES.find(t=>t.id===url.searchParams.get('theme'))?.id;
const isViewer = url.searchParams.get('mode')==='site';
const custom = readJSON('site-custom',{});
const state = {
 theme:paramsTheme||startup.theme,device:paramsDevice||(isViewer&&window.innerWidth<680?'ios':startup.device),
 motion:startup.motion!==false,widgets:startup.widgets!==false,
 mode:isViewer?'site':'studio',panel:'overview',
 site:{...SITE,...custom},
 projectFilter:'全部',notes:readJSON('notes',SITE.notesSeed),tasks:readJSON('tasks',SITE.tasksSeed),
 windows:[],topZ:20,winCount:0,scale:1,palette:false,dragTask:null,toastTimeout:null,terminalLines:[],
 launchCount:0
};
const deviceFor=()=>DEVICES.find(d=>d.id===state.device)||DEVICES[0];
const isPhone=()=>deviceFor().type==='phone';
const prefSave=()=>saveJSON('preferences',{theme:state.theme,device:state.device,motion:state.motion,widgets:state.widgets});
const appById=id=>APPS.find(a=>a.id===id)||APPS[0];
const appIcon=(app,size=21)=>`<span class="app-glyph app-color-${app.color}">${icon(app.icon,size)}</span>`;
const logo=()=>'<span class="brand-mark">O<span>✳</span></span>';
const textSmall=(s)=>`<span class="eyebrow">${e(s)}</span>`;
const isKnownApp=id=>APPS.some(a=>a.id===id)||id.startsWith('project:')&&state.site.projects.some(p=>p.id===id.slice(8))||id.startsWith('gallery:')&&/^(0[1-6])$/.test(id.slice(8));

function renderApp(){document.body.dataset.theme=state.theme;document.body.dataset.motion=state.motion?'on':'off';document.body.dataset.mode=state.mode;
 const root=$('#app');root.innerHTML=state.mode==='studio'?studioHTML():viewerHTML();renderSystem();if(state.mode==='studio')updateInspector();setTimeout(updateLayout,0);
}
function studioHTML(){return `<div class="studio-shell"><aside class="studio-sidebar"><div class="sidebar-brand">${logo()}<span><strong>OSWebsite</strong><small>YOUR DIGITAL UNIVERSE</small></span><span class="brand-dot"></span></div>
<div class="sidebar-workspace"><div class="workspace-avatar">A</div><div><strong>${e(state.site.shortName||'Creator')}'s workspace</strong><small>FREE • COMMUNITY EDITION</small></div>${icon('chevron',15)}</div>
<div class="sidebar-label">WORKSPACE</div><nav class="side-nav" aria-label="Studio navigation">
${[{id:'overview',icon:'layout',name:'工作台'},{id:'appearance',icon:'sun',name:'外观与主题'},{id:'apps',icon:'grid',name:'应用程序'},{id:'content',icon:'note',name:'内容配置'},{id:'deploy',icon:'globe',name:'发布与分享'}].map(n=>`<button data-panel="${n.id}" class="${state.panel===n.id?'active':''}">${icon(n.icon,18)} ${n.name} ${state.panel===n.id?'<span class="nav-active-dot"></span>':''}</button>`).join('')}</nav>
<div class="sidebar-divider"></div><div class="sidebar-label">INSTALLED APPS <span>${APPS.length}</span></div><div class="sidebar-apps">${APPS.slice(0,8).map(a=>`<button class="sidebar-app" data-open="${a.id}" title="打开${a.name}">${appIcon(a,16)}<span>${e(a.name)}</span>${icon('chevron',13)}</button>`).join('')}</div>
<div class="sidebar-bottom"><div class="side-quote"><span>✳</span><p>Good ideas deserve<br>beautiful spaces.</p><small>OPEN SOURCE. OPEN POSSIBILITIES.</small></div><a href="https://github.com/AIPMAndy" target="_blank" rel="noopener noreferrer">${icon('github',18)} AIPMAndy <span>${icon('external',14)}</span></a></div></aside>
<section class="studio-main"><header class="studio-header"><div class="header-path">WORKSPACE <span>/</span> <strong>Preview studio</strong> <span class="header-live"><i></i> LIVE</span></div><div class="header-actions"><button class="ghost-btn" data-palette-trigger title="搜索应用 (⌘ K)">${icon('search',17)} <span>快速查找</span> <kbd>⌘ K</kbd></button><button class="icon-btn" data-open="settings" title="系统设置">${icon('settings',18)}</button><button class="primary-btn header-publish" data-mode="site">${icon('external',15)} 预览网站</button></div></header>
<div class="preview-top"><div><div class="preview-eyebrow">INTERACTIVE PREVIEW <span class="preview-pulse"></span></div><h1>你的世界，<em>随心切换。</em></h1><p>不是一张网页截图，而是一整套可以交互的数字空间。</p></div><div class="view-legend">${icon('sparkles',17)} INTERACTIVE OS EXPERIENCE</div></div>
<div class="device-toolbar"><div class="device-tabs" role="group" aria-label="设备预览">${DEVICES.map(d=>`<button data-device="${d.id}" class="device-tab ${state.device===d.id?'active':''}" title="预览 ${d.name}">${icon(d.icon,17)}<span>${e(d.name)}</span></button>`).join('')}</div><div class="toolbar-right"><span class="preview-resolution" id="resolution-label">${deviceFor().width} × ${deviceFor().height}</span><span class="toolbar-divider"></span><button class="icon-btn" data-reset-view title="重置预览">${icon('refresh',16)}</button><button class="icon-btn" data-mode="site" title="全屏网站模式">${icon('maximize',16)}</button></div></div>
<div class="stage" id="stage"><div class="stage-viewport" id="stage-viewport"><div id="device-host"></div></div></div>
<div class="stage-footer"><div class="stage-status">${icon('check',14)} <span>本地实时预览</span><b>•</b> <span>无需后端服务</span></div><div>尝试打开应用、切换主题、拖动窗口 <span>✳</span></div></div></section>
<aside class="studio-inspector"><div class="inspector-header"><span>${icon('layout',16)} INSPECTOR</span><button class="inspector-more" data-palette-trigger title="快速操作">${icon('more',18)}</button></div><div class="inspector-body" id="inspector-body"></div><div class="inspector-bottom"><span>${icon('help',15)} 所有修改仅保存在当前浏览器</span><strong>OSW / V1.0</strong></div></aside></div><div id="modal-root"></div><div id="toast-root" role="status"></div><div id="os-live" class="sr-only" aria-live="polite"></div>`;}
function viewerHTML(){return `<main class="viewer-stage" id="stage"><div class="stage-viewport" id="stage-viewport"><div id="device-host"></div></div><div class="viewer-controls"><button data-mode="studio" title="返回设计工作台">${icon('layout',17)} <span>Studio</span></button><button data-palette-trigger title="搜索应用">${icon('search',17)}</button><button data-open="settings" title="设置">${icon('settings',17)}</button></div></main><div id="modal-root"></div><div id="toast-root" role="status"></div><div id="os-live" class="sr-only" aria-live="polite"></div>`;}

function inspectorThemeCards(){return `<div class="theme-grid">${THEMES.map(t=>`<button data-theme="${t.id}" class="theme-choice ${state.theme===t.id?'selected':''}" aria-label="选择 ${t.cn} 主题"><span class="theme-preview" style="background:${t.preview}"><i></i></span><span class="theme-choice-name">${e(t.cn)}</span><small>${e(t.name)}</small>${state.theme===t.id?`<span class="theme-check">${icon('check',12)}</span>`:''}</button>`).join('')}</div>`;}
function inspectorDeviceCards(){return `<div class="inspector-device-list">${DEVICES.map(d=>`<button data-device="${d.id}" class="${state.device===d.id?'selected':''}">${icon(d.icon,18)} <span>${e(d.name)}</span><small>${d.width}×${d.height}</small>${state.device===d.id?icon('check',15):''}</button>`).join('')}</div>`;}
function inspectorHTML(){const section=(title,description,inner)=>`<section class="inspector-section"><div class="inspector-section-header"><h3>${title}</h3>${description?`<small>${description}</small>`:''}</div>${inner}</section>`;
if(state.panel==='overview')return `<div class="inspector-intro"><span class="intro-cube">✳</span><strong>Make it yours.</strong><p>把作品集、品牌和创意变成一个真正值得探索的网站。</p></div>${section('视觉主题','5 STYLES',inspectorThemeCards())}${section('当前设备','DEVICE PREVIEW',`<div class="device-info-card">${icon(deviceFor().icon,23)}<span><strong>${deviceFor().name} Simulator</strong><small>${deviceFor().width} × ${deviceFor().height} CSS px</small></span><button data-panel="appearance">切换 ${icon('chevron',13)}</button></div>`)}${section('快速打开','QUICK ACTIONS',`<div class="quick-action-grid"><button data-open="projects">${icon('grid',17)} 项目展厅</button><button data-open="gallery">${icon('image',17)} 灵感画廊</button><button data-open="terminal">${icon('terminal',17)} 终端</button><button data-open="tasks">${icon('check',17)} 任务看板</button></div>`)}<div class="inspector-highlight">${icon('sparkles',18)} <span>TIP: 按 <kbd>⌘</kbd> + <kbd>K</kbd> 搜索任何应用。</span></div>`;
if(state.panel==='appearance')return `${section('主题引擎','05 DISTINCT WORLDS',inspectorThemeCards())}${section('设备模拟','MULTI-DEVICE',inspectorDeviceCards())}${section('动态与桌面','PREFERENCES',`<label class="inspector-toggle"><span><strong>动态效果</strong><small>流畅过渡与微动效</small></span><input type="checkbox" data-setting="motion" ${state.motion?'checked':''}><i></i></label><label class="inspector-toggle"><span><strong>桌面小组件</strong><small>时间及项目卡片</small></span><input type="checkbox" data-setting="widgets" ${state.widgets?'checked':''}><i></i></label>`)}`;
if(state.panel==='apps')return `<div class="inspector-intro compact"><span class="intro-cube">${icon('grid',22)}</span><strong>App Library</strong><p>11 个可交互应用，一套网站内容。</p></div><div class="inspector-app-list">${APPS.map(a=>`<button data-open="${a.id}">${appIcon(a,21)}<span><strong>${a.name}</strong><small>${a.description}</small></span>${icon('arrow',15)}</button>`).join('')}</div>`;
if(state.panel==='content')return `<div class="inspector-intro compact"><span class="intro-cube">${icon('note',22)}</span><strong>站点内容</strong><p>编辑品牌文字并实时预览。也可以导出 JSON，在代码里继续扩展。</p></div><form id="site-form" class="site-edit-form"><label>品牌名称<input name="brand" maxlength="64" value="${e(state.site.brand)}"></label><label>短名称<input name="shortName" maxlength="32" value="${e(state.site.shortName)}"></label><label>身份介绍<input name="role" maxlength="100" value="${e(state.site.role)}"></label><label>一句话主张<textarea name="tagline" maxlength="180" rows="3">${e(state.site.tagline)}</textarea></label><button type="submit" class="primary-btn">${icon('check',16)} 保存并预览</button></form><div class="inspector-button-list"><button data-export-config>${icon('download',17)} 导出当前配置</button><button data-import-config>${icon('upload',17)} 导入 JSON 配置</button><input type="file" id="config-file-input" accept="application/json,.json" hidden></div><p class="inspector-caution">本地修改不会写入 Git 仓库。正式发布时请更新 <code>src/config.js</code>。</p>`;
return `<div class="inspector-intro compact"><span class="intro-cube">${icon('globe',22)}</span><strong>Ship it to the world.</strong><p>零构建工具依赖，直接发布到静态托管平台。</p></div><div class="deploy-steps"><div><span>01</span><strong>修改配置</strong><p>编辑 <code>src/config.js</code>，填入自己的品牌、链接和作品。</p></div><div><span>02</span><strong>提交 GitHub</strong><p>推送项目目录，然后开启 GitHub Pages，或连接 Vercel / Netlify。</p></div><div><span>03</span><strong>使用访客地址</strong><p>在网站 URL 后加 <code>?mode=site</code>，获得完整的作品集体验。</p></div></div><div class="inspector-button-list"><button data-copy-site>${icon('copy',16)} 复制访客预览地址</button><button data-mode="site">${icon('eye',16)} 打开访客预览</button><button data-export-config>${icon('download',16)} 下载站点配置</button></div>`;}
function updateInspector(){const target=$('#inspector-body');if(target)target.innerHTML=inspectorHTML();$$('[data-panel]').forEach(b=>b.classList.toggle('active',b.dataset.panel===state.panel));}

function renderSystem(){const host=$('#device-host');if(!host)return;const d=deviceFor();host.innerHTML=`<div class="device-shell ${d.type==='phone'?'is-phone':''} device-${d.id} ${state.mode==='site'?'device-native':''}" data-os="${d.id}"><div class="device-edge"></div><div class="device-screen" id="device-screen"><div class="os-surface">${isPhone()?renderPhone():renderDesktop()}<div id="os-windows" class="window-layer"></div></div></div></div>`;
 renderWindows();if(state.mode==='studio')updateInspector();updateLayout();}
function renderDesktop(){return `<div class="wallpaper"><div class="wallpaper-orb wallpaper-orb-one"></div><div class="wallpaper-orb wallpaper-orb-two"></div><div class="wallpaper-grid"></div><div class="wallpaper-noise"></div></div>
<header class="os-menubar"><div class="os-menu-left"><button class="os-menu-brand" data-open="about">✳</button><strong>${state.device==='windows'?'OSWebsite':e(state.site.shortName)+' OS'}</strong><button data-palette-trigger>文件</button><button data-open="projects">项目</button><button data-open="gallery">画廊</button><button data-open="settings">偏好设置</button></div><div class="os-menu-right"><span class="os-top-label">${icon('wifi',15)} ${icon('battery',18)}</span><span class="os-status-dot"></span><span data-clock>${clock()}</span></div></header>
<div class="desktop-icons">${['files','projects','about','gallery'].map(id=>{const a=appById(id);return `<button class="desktop-icon" data-open="${id}">${appIcon(a,27)}<span>${e(a.name)}</span></button>`;}).join('')}</div>
<main class="desktop-content"><div class="desk-welcome"><div class="welcome-deco"><span>✳</span><small>EST. 2017</small></div><div class="welcome-eyebrow"><i></i> OPEN TO NEW IDEAS <span> / 01</span></div><span class="welcome-overline">HELLO, WORLD. I'M</span><h1>${e(state.site.shortName)}<span class="welcome-period">.</span></h1><p class="welcome-tagline">${e(state.site.tagline)}</p><div class="welcome-actions"><button class="welcome-primary" data-open="projects">探索项目 ${icon('arrow',17)}</button><button class="welcome-secondary" data-open="about">关于我 ${icon('external',15)}</button></div><div class="welcome-bottom"><span class="tiny-spacer">✳</span><span>BUILD / EXPLORE / SHARE</span><span>SCROLL INSIDE TO EXPLORE →</span></div></div>
${state.widgets?`<aside class="desktop-widgets"><div class="widget-time"><span>${dateText()}</span><strong data-widget-time>${clock()}</strong><small>${e(state.site.role)}</small></div><button class="widget-feature" data-open="projects"><span class="widget-feature-label">FEATURED SPACE ${icon('arrow',15)}</span><div class="widget-feature-art"><span>OS / 01</span><b>Make<br>something<br>real.</b><span class="widget-feature-star">✳</span></div><span class="widget-feature-foot">项目展厅 <b>VIEW PROJECTS ↗</b></span></button><button class="widget-mini" data-open="notes">${icon('note',17)} <span>有新想法？写下来。</span> ${icon('arrow',14)}</button></aside>`:''}
</main>${desktopDock()}${state.device==='windows'?`<div class="windows-launcher" id="win-launcher" hidden><h3>Pinned apps</h3><div>${APPS.slice(0,8).map(a=>`<button data-open="${a.id}">${appIcon(a,22)}<span>${a.name}</span></button>`).join('')}</div></div>`:''}`;}
function desktopDock(){const items=APPS.filter(a=>a.inDock);return `<nav class="os-dock" aria-label="常用应用">${state.device==='windows'?`<button class="dock-start" data-win-start title="开始菜单">${icon('grid',24)}</button>`:''}${items.map(a=>`<button class="dock-item" data-open="${a.id}" title="${a.name}">${appIcon(a,25)}<span class="dock-tooltip">${e(a.name)}</span>${state.windows.find(w=>w.id===a.id&&!w.minimized)?'<i class="dock-indicator"></i>':''}</button>`).join('')}<span class="dock-separator"></span><button class="dock-item dock-search" data-palette-trigger title="搜索应用">${icon('search',22)}<span class="dock-tooltip">快捷搜索</span></button></nav>`;}
function renderPhone(){const d=deviceFor();const ios=state.device==='ios';const topApps=APPS.filter(a=>a.id!=='settings');return `<div class="wallpaper phone-wallpaper"><div class="wallpaper-orb wallpaper-orb-one"></div><div class="wallpaper-orb wallpaper-orb-two"></div><div class="wallpaper-grid"></div></div>
<div class="phone-top-status"><b data-clock>${clock()}</b>${ios?'<span class="phone-dynamic-island"></span>':'<span class="phone-camera-dot"></span>'}<span class="phone-signals">${icon('wifi',15)}${icon('battery',18)}</span></div>
<div class="phone-home"><div class="phone-headline"><span>WELCOME TO</span><h1>${e(state.site.shortName)}<span>.</span></h1><p>${e(state.site.tagline)}</p></div>
${state.widgets?`<div class="phone-widgets"><button class="phone-widget-large" data-open="about"><div><span>✳ &nbsp; MY WORLD</span><strong>Building<br>what's next<span>.</span></strong></div><small>关于我 ${icon('arrow',15)}</small><i class="phone-widget-glow"></i></button><button class="phone-widget-small" data-open="projects"><span>PROJECTS / ${String(state.site.projects.length).padStart(2,'0')}</span><strong>探索<br>更多可能</strong><small>${icon('arrow',15)}</small></button></div>`:''}
<div class="phone-section-label"><span>APPS</span><span>ALL COLLECTIONS ↗</span></div><div class="phone-app-grid">${topApps.slice(0,ios?8:9).map(a=>`<button class="phone-app" data-open="${a.id}">${appIcon(a,26)}<span>${e(a.name)}</span></button>`).join('')}</div><div class="phone-page-dots"><i class="selected"></i><i></i><i></i></div></div>
${!ios?`<div class="android-search" data-palette-trigger>${icon('search',16)} <span>搜索应用和内容...</span> ${icon('sparkles',15)}</div>`:''}
<nav class="phone-dock" aria-label="移动端常用应用">${['about','projects','notes','settings'].map(id=>{const a=appById(id);return `<button data-open="${id}" title="${a.name}">${appIcon(a,25)}</button>`;}).join('')}</nav><div class="phone-home-indicator"></div>`;}

function getWindowDims(id){const d=deviceFor();let w= id==='terminal'?680:id==='settings'?820:id==='tasks'?900:id==='gallery'?850:id==='projects'?900:800;
let h=id==='terminal'?460:id==='settings'?550:Math.min(590,d.height-125);if(d.type==='tablet'){w=Math.min(w,d.width-64);h=Math.min(h,d.height-96);}else{w=Math.min(w,d.width-100);h=Math.min(h,d.height-110);}return {w,h};}
function openApp(id){if(!isKnownApp(id))return;const existing=state.windows.find(w=>w.id===id);if(existing){existing.minimized=false;existing.z=++state.topZ;renderWindows();return;}
if(isPhone())state.windows=[];
const {w,h}=getWindowDims(id);const d=deviceFor();const offset=(state.winCount++%4)*22;state.windows.push({id,w,h,x:Math.max(28,Math.round((d.width-w)/2)+offset),y:Math.max(45,Math.round((d.height-h)/2)-10+offset),minimized:false,maximized:false,z:++state.topZ});renderWindows();}
function closeApp(id){state.windows=state.windows.filter(w=>w.id!==id);renderWindows();}
function focusApp(id){const w=state.windows.find(w=>w.id===id);if(w){w.z=++state.topZ;const el=$(`.os-window[data-window-id="${CSS.escape(id)}"]`);if(el){el.style.zIndex=w.z;$$('.os-window').forEach(n=>n.classList.toggle('is-focused',n===el));}}}
function renderWindows(){const layer=$('#os-windows');if(!layer)return;let windows=state.windows.filter(w=>!w.minimized);if(isPhone())windows=windows.slice(-1);
layer.innerHTML=windows.map(w=>{const app=appById(w.id.startsWith('project:')?'projects':w.id.startsWith('gallery:')?'gallery':w.id);const mobile=isPhone();const baseClass=`os-window ${mobile?'mobile-window':''} ${w.maximized?'maximized':''} ${w.z===Math.max(...windows.map(x=>x.z))?'is-focused':''}`;
const style=mobile?'':w.maximized?`left:14px;top:40px;width:calc(100% - 28px);height:calc(100% - 110px);z-index:${w.z}`:`left:${w.x}px;top:${w.y}px;width:${w.w}px;height:${w.h}px;z-index:${w.z}`;
return `<section class="${baseClass}" data-window-id="${e(w.id)}" style="${style}"><header class="window-titlebar" data-drag-title="${e(w.id)}">${mobile?`<button class="mobile-back" data-close="${e(w.id)}">${icon('back',19)} 返回</button>`:`<div class="window-buttons"><button data-close="${e(w.id)}" aria-label="关闭窗口"></button><button data-min="${e(w.id)}" aria-label="最小化窗口"></button><button data-max="${e(w.id)}" aria-label="最大化窗口"></button></div>`}<div class="window-title-center">${appIcon(app,17)} <span>${e(titleForApp(w.id,state.site))}</span></div>${mobile?`<button class="mobile-window-dots" data-palette-trigger>${icon('more',20)}</button>`:`<div class="window-title-actions"><button data-palette-trigger title="搜索">${icon('search',16)}</button><button data-max="${e(w.id)}" title="放大">${icon('maximize',15)}</button></div>`}</header><div class="window-content">${getAppContent(w.id,state)}</div></section>`;}).join('');
const dock=$('.os-dock');if(dock){const old=dock;old.outerHTML=desktopDock();}
 const inp=$('.terminal-input');if(inp)inp.focus();}
function updateLayout(){const host=$('#device-host');const stage=$('#stage');const vp=$('#stage-viewport');if(!host||!vp||!stage)return;const d=deviceFor();if(state.mode==='site'){
 host.style.width='100%';host.style.height='100%';host.style.transform='none';vp.style.width='100%';vp.style.height='100%';state.scale=1;return;}
 const rect=stage.getBoundingClientRect();if(rect.width<20||rect.height<20)return;const padding=d.type==='phone'?44:34;const frameW=d.width+(d.type==='phone'?20:0);const frameH=d.height+(d.type==='phone'?20:0);
 const scale=Math.min(1.2,(rect.width-padding*2)/frameW,(rect.height-padding*2)/frameH);state.scale=Math.max(.2,scale);
 host.style.width=d.width+'px';host.style.height=d.height+'px';host.style.transform=`scale(${state.scale})`;vp.style.width=d.width*state.scale+'px';vp.style.height=d.height*state.scale+'px';
 const label=$('#resolution-label');if(label)label.textContent=`${d.width} × ${d.height} · ${Math.round(state.scale*100)}%`;}
function setTheme(theme){if(!THEMES.some(t=>t.id===theme))return;state.theme=theme;prefSave();renderApp();toast(`已切换到 ${THEMES.find(t=>t.id===theme).cn}`);}
function setDevice(device){if(!DEVICES.some(d=>d.id===device))return;state.device=device;state.windows=[];state.winCount=0;prefSave();renderApp();toast(`正在预览 ${deviceFor().name}`);}
function changeSetting(name,value){if(!['motion','widgets'].includes(name))return;state[name]=value;prefSave();renderApp();toast('偏好设置已保存');}
function setPanel(panel){if(!['overview','appearance','apps','content','deploy'].includes(panel))return;state.panel=panel;updateInspector();}
function modeChange(mode){const next=new URL(location.href);next.searchParams.set('mode',mode);if(mode==='site')next.searchParams.delete('device');location.href=next.toString();}
function copySite(){const link=new URL(location.href);link.searchParams.set('mode','site');link.searchParams.delete('device');navigator.clipboard?.writeText(link.toString()).then(()=>toast('访客地址已复制'),()=>fallbackCopy(link.toString()))||fallbackCopy(link.toString());}
function fallbackCopy(value){const a=document.createElement('textarea');a.value=value;document.body.appendChild(a);a.select();try{document.execCommand('copy');toast('访客地址已复制');}catch{toast('复制失败，请手动复制地址栏');}a.remove();}
function toast(text){const root=$('#toast-root');if(!root)return;root.innerHTML=`<div class="toast">${icon('check',18)} ${e(text)}</div>`;clearTimeout(state.toastTimeout);state.toastTimeout=setTimeout(()=>{if(root)root.innerHTML='';},3000);}
function togglePalette(show){state.palette=typeof show==='boolean'?show:!state.palette;const root=$('#modal-root');if(!root)return;
 if(!state.palette){root.innerHTML='';return;}
 root.innerHTML=`<div class="palette-overlay" data-palette-backdrop><div class="palette-dialog" role="dialog" aria-modal="true" aria-label="快捷搜索"><div class="palette-search">${icon('search',23)}<input id="palette-input" aria-label="搜索命令" placeholder="搜索应用、项目或输入指令..." autocomplete="off"><span>ESC</span></div><div class="palette-results" id="palette-results"></div><div class="palette-hint"><span>OSWebsite Command Center</span><span>选择一项以打开 ↵</span></div></div></div>`;updatePalette('');$('#palette-input')?.focus();}
function updatePalette(text){const q=text.toLowerCase().trim();const items=[...APPS.map(a=>({type:'app',id:a.id,title:a.name,sub:a.english,icon:a.icon,color:a.color})),...state.site.projects.map(p=>({type:'project',id:p.id,title:p.name,sub:p.subtitle,icon:'grid',color:'purple'}))].filter(a=>[a.title,a.sub].some(s=>s.toLowerCase().includes(q))).slice(0,12);
const root=$('#palette-results');if(root)root.innerHTML=items.length?items.map((a,i)=>`<button class="palette-result ${i===0?'palette-selected':''}" data-palette-open="${a.type==='project'?'project:':''}${e(a.id)}">${appIcon({icon:a.icon,color:a.color},20)}<span><strong>${e(a.title)}</strong><small>${e(a.sub)}</small></span>${icon('arrow',16)}</button>`).join(''):'<div class="palette-empty">没有找到匹配的结果</div>';}
function onTerminalCommand(text){const out=$('#terminal-output');if(!out)return;const input=text.trim();if(!input)return;const [cmd,...args]=input.split(/\s+/);if(cmd==='clear'){const greeting=$('.terminal-greeting',out);out.innerHTML=greeting?greeting.outerHTML:'';return;}
 const append=(content,klass='')=>{const line=document.createElement('div');line.className='term-line '+klass;line.textContent=content;out.appendChild(line);};append('visitor@oswebsite ~ % '+input,'cmd');
 switch(cmd.toLowerCase()){
 case 'help':append('命令: help, whoami, ls, projects, open <app>, theme <name>, device <name>, date, links, clear');break;
 case 'whoami':append(`${state.site.brand} — ${state.site.role}`);break;
 case 'ls':append(APPS.map(a=>a.id+'/').join('   '));break;
 case 'projects':append(state.site.projects.map(p=>p.name).join(' / '));break;
 case 'date':append(new Date().toLocaleString('zh-CN'));break;
 case 'links':state.site.links.forEach(l=>append(l.label+'  '+l.url));break;
 case 'open':{const id=args[0];if(isKnownApp(id)){append('Opening '+id+' ...');setTimeout(()=>openApp(id),120);}else append('未知应用，输入 ls 查看列表','error');break;}
 case 'theme':{const id=args[0];if(THEMES.some(t=>t.id===id)){append('Applying theme '+id);setTimeout(()=>setTheme(id),120);}else append('可选主题: '+THEMES.map(t=>t.id).join(', '),'error');break;}
 case 'device':{const id=args[0];if(DEVICES.some(d=>d.id===id)){append('Switching device '+id);setTimeout(()=>setDevice(id),120);}else append('可选设备: '+DEVICES.map(d=>d.id).join(', '),'error');break;}
 default:append(`Unknown command: ${cmd}。请输入 help。`,'error');}
 out.scrollTop=out.scrollHeight;}
function updateTask(id,lane){if(!['todo','doing','done'].includes(lane))return;const t=state.tasks.find(t=>t.id===id);if(t){t.lane=lane;saveJSON('tasks',state.tasks);renderWindows();}}
function validateImported(input){if(!input||typeof input!=='object'||Array.isArray(input))throw Error('JSON 根节点必须是对象');const permitted=['brand','shortName','role','tagline','subline','intro','email'];const clean={};for(const key of permitted){if(typeof input[key]==='string')clean[key]=input[key].slice(0,2000)}
if(input.links){if(!Array.isArray(input.links)||input.links.length>30)throw Error('links 格式错误');clean.links=input.links.filter(v=>v&&typeof v.label==='string'&&typeof v.url==='string'&&safeURL(v.url)!=='#').map(v=>({label:v.label.slice(0,100),url:safeURL(v.url),icon:['github','globe','briefcase','mail'].includes(v.icon)?v.icon:'globe'}));}
if(input.projects){if(!Array.isArray(input.projects)||input.projects.length>60)throw Error('projects 格式错误');clean.projects=input.projects.filter(v=>v&&typeof v.id==='string'&&typeof v.name==='string').map(v=>({id:v.id.replace(/[^a-z0-9_-]/gi,'').slice(0,40),name:v.name.slice(0,100),kind:String(v.kind||'开源工具').slice(0,50),tag:String(v.tag||'Project').slice(0,50),subtitle:String(v.subtitle||'').slice(0,200),description:String(v.description||'').slice(0,500),symbol:String(v.symbol||'✳').slice(0,3),tone:['mint','violet','orange','blue','gold','pink'].includes(v.tone)?v.tone:'blue',link:safeURL(v.link)}));}
return clean;}
function handleFile(file){if(file.size>100000)throw Error('配置文件太大（最大 100 KB）');const reader=new FileReader();reader.onload=()=>{try{const data=validateImported(JSON.parse(reader.result));saveJSON('site-custom',data);state.site={...SITE,...data};renderApp();toast('配置已导入，请检查预览');}catch(error){toast(error.message||'无法解析配置');}};reader.readAsText(file);}
function exportConfig(){const data={...state.site};downloadText('oswebsite.config.json',JSON.stringify(data,null,2),'application/json');toast('配置文件已下载');}

// Global event delegation: all apps, both device modes, one interaction model.
document.addEventListener('click',event=>{
 if(event.target.closest('[data-palette-backdrop]')&&!event.target.closest('.palette-dialog')){togglePalette(false);return;}
 const b=event.target.closest('button, a');if(!b)return;
 if(b.hasAttribute('data-palette-open')){const id=b.dataset.paletteOpen;togglePalette(false);openApp(id);return;}
 if(b.hasAttribute('data-palette-trigger')){togglePalette();return;}
 if(b.dataset.open){openApp(b.dataset.open);return;}
 if(b.dataset.project){openApp('project:'+b.dataset.project);return;}
 if(b.dataset.gallery){openApp('gallery:'+b.dataset.gallery);return;}
 if(b.dataset.close){closeApp(b.dataset.close);return;}
 if(b.dataset.min){const w=state.windows.find(w=>w.id===b.dataset.min);if(w)w.minimized=true;renderWindows();return;}
 if(b.dataset.max){const w=state.windows.find(w=>w.id===b.dataset.max);if(w)w.maximized=!w.maximized;renderWindows();return;}
 if(b.dataset.theme){setTheme(b.dataset.theme);return;}
 if(b.dataset.device){setDevice(b.dataset.device);return;}
 if(b.dataset.panel){setPanel(b.dataset.panel);return;}
 if(b.dataset.mode){modeChange(b.dataset.mode);return;}
 if(b.hasAttribute('data-copy-site')){copySite();return;}
 if(b.hasAttribute('data-export-config')){exportConfig();return;}
 if(b.hasAttribute('data-import-config')){$('#config-file-input')?.click();return;}
 if(b.hasAttribute('data-export-notes')){downloadText('my-notes.md',state.notes,'text/markdown;charset=utf-8');toast('笔记已导出');return;}
 if(b.hasAttribute('data-reset-view')){state.windows=[];renderSystem();toast('已重置窗口布局');return;}
 if(b.hasAttribute('data-win-start')){const launcher=$('#win-launcher');if(launcher)launcher.hidden=!launcher.hidden;return;}
 if(b.dataset.taskDelete){if(!confirm('确定删除这项任务吗？'))return;state.tasks=state.tasks.filter(t=>t.id!==b.dataset.taskDelete);saveJSON('tasks',state.tasks);renderWindows();toast('任务已删除');return;}
});
document.addEventListener('change',event=>{
 const t=event.target;
 if(t.matches('[data-setting]')){changeSetting(t.dataset.setting,t.checked);return;}
 if(t.matches('[data-task-move]')){updateTask(t.dataset.taskMove,t.value);return;}
 if(t.matches('#config-file-input')&&t.files?.[0]){try{handleFile(t.files[0]);}catch(error){toast(error.message||'文件导入失败');}return;}
});
document.addEventListener('input',event=>{
 const t=event.target;if(t.id==='palette-input'){updatePalette(t.value);return;}
 if(t.matches('.note-textarea')){state.notes=t.value;saveJSON('notes',state.notes);const count=$('#note-count');if(count)count.textContent=state.notes.length+' 字符';return;}
});
document.addEventListener('submit',event=>{
 const form=event.target;
 if(form.id==='terminal-form'){event.preventDefault();const input=form.elements.namedItem('command');onTerminalCommand(input.value);input.value='';input.focus();return;}
 if(form.id==='task-add-form'){event.preventDefault();const input=form.elements.namedItem('title');const title=input.value.trim();if(!title)return;state.tasks.push({id:'t'+Date.now().toString(36),title:title.slice(0,120),lane:'todo'});saveJSON('tasks',state.tasks);renderWindows();toast('已添加到待开始');return;}
 if(form.id==='site-form'){event.preventDefault();const formData=new FormData(form);const fields=['brand','shortName','role','tagline'];const next={...readJSON('site-custom',{})};fields.forEach(k=>next[k]=String(formData.get(k)||'').trim());saveJSON('site-custom',next);state.site={...SITE,...next};renderApp();state.panel='content';updateInspector();toast('品牌配置已保存');return;}
});
document.addEventListener('keydown',event=>{
 if((event.metaKey||event.ctrlKey)&&event.key.toLowerCase()==='k'){event.preventDefault();togglePalette();return;}
 if((event.metaKey||event.ctrlKey)&&event.key===','){event.preventDefault();openApp('settings');return;}
 if(event.key==='Escape'&&state.palette){togglePalette(false);return;}
 if(event.key==='Enter'&&state.palette&&event.target.id==='palette-input'){const first=$('.palette-result');if(first){event.preventDefault();first.click();}return;}
});
// Desktop windows: pointer-based dragging, accounting for scaled Studio previews.
let dragging=null;
document.addEventListener('pointerdown',event=>{
 const win=event.target.closest('.os-window');if(!win)return;focusApp(win.dataset.windowId);
 const bar=event.target.closest('[data-drag-title]');if(!bar||event.target.closest('button')||isPhone())return;
 const w=state.windows.find(w=>w.id===win.dataset.windowId);if(!w||w.maximized)return;
 dragging={id:w.id,startX:event.clientX,startY:event.clientY,x:w.x,y:w.y,pointerId:event.pointerId};bar.setPointerCapture?.(event.pointerId);document.body.classList.add('is-dragging');});
document.addEventListener('pointermove',event=>{if(!dragging)return;const w=state.windows.find(w=>w.id===dragging.id);if(!w)return;const d=deviceFor();w.x=Math.max(0,Math.min(d.width-110,dragging.x+(event.clientX-dragging.startX)/state.scale));w.y=Math.max(32,Math.min(d.height-80,dragging.y+(event.clientY-dragging.startY)/state.scale));const el=$(`.os-window[data-window-id="${CSS.escape(w.id)}"]`);if(el){el.style.left=w.x+'px';el.style.top=w.y+'px';}});
document.addEventListener('pointerup',()=>{dragging=null;document.body.classList.remove('is-dragging');});
document.addEventListener('dragstart',event=>{const card=event.target.closest('[data-task-id]');if(card){state.dragTask=card.dataset.taskId;event.dataTransfer.effectAllowed='move';}});
document.addEventListener('dragover',event=>{const lane=event.target.closest('[data-lane]');if(lane&&state.dragTask){event.preventDefault();lane.classList.add('drag-over');}});
document.addEventListener('dragleave',event=>{const lane=event.target.closest('[data-lane]');if(lane&&!lane.contains(event.relatedTarget))lane.classList.remove('drag-over');});
document.addEventListener('drop',event=>{const lane=event.target.closest('[data-lane]');if(lane&&state.dragTask){event.preventDefault();updateTask(state.dragTask,lane.dataset.lane);}state.dragTask=null;$$('.drag-over').forEach(el=>el.classList.remove('drag-over'));});
document.addEventListener('dragend',()=>{state.dragTask=null;$$('.drag-over').forEach(el=>el.classList.remove('drag-over'));});
window.addEventListener('resize',()=>requestAnimationFrame(updateLayout));
setInterval(()=>{ $$('[data-clock]').forEach(el=>el.textContent=clock());$$('[data-widget-time]').forEach(el=>el.textContent=clock()); },15000);
renderApp();
// Public test surface: no destructive operations or browser APIs exposed.
if(url.searchParams.has('smoke'))window.__OSWebsiteTest={getState:()=>({theme:state.theme,device:state.device,mode:state.mode,windows:state.windows.map(w=>w.id),appCount:APPS.length})};
