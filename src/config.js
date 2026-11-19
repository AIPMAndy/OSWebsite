/**
 * OSWebsite demo site data.
 * Replace the values to launch your own site. All content below is editable.
 * No visitor analytics or follower counts are fabricated.
 */
export const SITE = {
  brand: 'AI 酋长 Andy',
  shortName: 'Andy',
  role: '星觉 AI 创始人 / AI 产品专家',
  tagline: '让 AI 变成每个人的真实生产力。',
  subline: 'From product ideas to things that actually work.',
  intro: '从 2017 年开始做 AI，经历腾讯、百度、大模型创业公司，从产品经理到 VP，再到独立创业。今天，继续把复杂的技术做成普通人用得上的产品。',
  email: '',
  links: [
    { label: 'GitHub', url: 'https://github.com/AIPMAndy', icon: 'github' },
    { label: '个人网站', url: 'https://metaver.vip', icon: 'globe' },
    { label: 'AI 求职与成长', url: 'https://www.a6no1.cn', icon: 'briefcase' }
  ],
  highlights: [
    { label: '开始探索 AI', value: '2017' },
    { label: '走过的路径', value: 'PM → VP' },
    { label: '持续做的事', value: 'Build & Share' }
  ],
  timeline: [
    { date: '2017 —', title: 'AI 产品的起点', copy: '持续研究人工智能如何改善人的工作、学习和生活。' },
    { date: '职业经历', title: '腾讯 · 百度', copy: '从产品经理岗位出发，把 AI 技术落进复杂的真实业务。' },
    { date: '创业阶段', title: '大模型独角兽 VP', copy: '从组织和业务视角，推动 AI 产品从零到一。' },
    { date: '现在', title: '星觉 AI · 独立创业', copy: '开源工具、AI 产品与个人成长；将可复用的方法开放给更多人。' }
  ],
  projects: [
    { id: 'freegif', name: 'FreeGIF', kind: '开源工具', tag: 'Creator tools', subtitle: '把动图制作变得简单', description: '面向创作者的轻量化 GIF 工具方向，围绕低门槛、可复用、易分享展开。', symbol: '◎', tone: 'mint', link: 'https://github.com/AIPMAndy?tab=repositories' },
    { id: 'freecover', name: 'FreeCover', kind: '开源工具', tag: 'Design', subtitle: '更自由的封面创作', description: '帮助内容创作者更快完成视觉包装，减少重复设计工作。', symbol: '◈', tone: 'violet', link: 'https://github.com/AIPMAndy?tab=repositories' },
    { id: 'freephoto', name: 'FreePhoto', kind: '开源工具', tag: 'Photo utilities', subtitle: '照片处理工作流', description: '围绕照片处理与生产效率构建的开放工具。', symbol: '◐', tone: 'orange', link: 'https://github.com/AIPMAndy?tab=repositories' },
    { id: 'andyskill', name: 'Andy Video Skill', kind: '教程项目', tag: 'AI × Video', subtitle: '让视频制作流程标准化', description: '把 AI 视频制作流程转化成可以持续优化、复用的技能。', symbol: '▶', tone: 'blue', link: 'https://github.com/AIPMAndy?tab=repositories' },
    { id: 'localai', name: 'Local Business AI', kind: '商业实践', tag: 'Growth', subtitle: '本地生意 AI 获客', description: '研究 AI 如何帮助线下门店建立稳定的数字化获客能力。', symbol: '✳', tone: 'gold', link: 'https://github.com/AIPMAndy?tab=repositories' },
    { id: 'creator', name: 'How To Be An AI Creator', kind: '教程项目', tag: 'Playbook', subtitle: '普通人的 AI 创作者路线图', description: '面向从零起步者的实践指南，把信息差变成可执行步骤。', symbol: '↗', tone: 'pink', link: 'https://github.com/AIPMAndy?tab=repositories' }
  ],
  notesSeed: '# 你的灵感，从这里开始\n\n这是一张可编辑的本地便签。内容只保存在当前浏览器，不会发送到服务器。\n\n- [ ] 写下一个好点子\n- [ ] 做出第一个可用版本\n- [ ] 分享给世界',
  tasksSeed: [
    { id: 't1', title: '确定产品的第一性原理', lane: 'done' },
    { id: 't2', title: '做好移动端体验', lane: 'doing' },
    { id: 't3', title: '发布第一个开源版本', lane: 'todo' }
  ]
};
export const THEMES = [
  { id:'nebula', name:'Nebula', cn:'深空星云', preview:'linear-gradient(135deg,#0a1829,#1a5276 46%,#7454aa)' },
  { id:'alpine', name:'Alpine', cn:'冰川晨光', preview:'linear-gradient(135deg,#b7eff0,#9db2e0 52%,#f3d4da)' },
  { id:'atelier', name:'Atelier', cn:'黑白艺廊', preview:'linear-gradient(135deg,#030303,#4a4a4a 50%,#a4a4a4)' },
  { id:'solstice', name:'Solstice', cn:'琥珀日落', preview:'linear-gradient(135deg,#301d29,#b75954 51%,#efb47b)' },
  { id:'circuit', name:'Circuit', cn:'赛博终端', preview:'linear-gradient(135deg,#010f16,#096754 50%,#94fbcd)' }
];
export const DEVICES = [
  {id:'mac', name:'macOS', short:'Mac', icon:'monitor', width:1120, height:700, type:'desktop'},
  {id:'windows', name:'Windows', short:'Win', icon:'monitor', width:1120, height:700, type:'desktop'},
  {id:'ipad', name:'iPadOS', short:'iPad', icon:'tablet', width:900, height:660, type:'tablet'},
  {id:'ios', name:'iOS', short:'iPhone', icon:'smartphone', width:390, height:820, type:'phone'},
  {id:'android', name:'Android', short:'Android', icon:'smartphone', width:390, height:820, type:'phone'}
];
export const APPS = [
 {id:'about',name:'关于我',english:'Identity',icon:'user',color:'sky',description:'故事与履历',inDock:true},
 {id:'projects',name:'项目展厅',english:'Projects',icon:'grid',color:'purple',description:'开源与产品',inDock:true},
 {id:'files',name:'文件管理',english:'Files',icon:'folder',color:'blue',description:'目录式浏览',inDock:true},
 {id:'gallery',name:'灵感画廊',english:'Gallery',icon:'image',color:'rose',description:'视觉作品集',inDock:true},
 {id:'notes',name:'灵感笔记',english:'Notes',icon:'note',color:'yellow',description:'本地自动保存',inDock:true},
 {id:'tasks',name:'任务看板',english:'Tasks',icon:'check',color:'mint',description:'拖动任务流转',inDock:true},
 {id:'terminal',name:'终端',english:'Terminal',icon:'terminal',color:'slate',description:'探索式命令行',inDock:true},
 {id:'browser',name:'网络导航',english:'Web',icon:'globe',color:'teal',description:'网站与链接',inDock:false},
 {id:'analytics',name:'数据实验室',english:'Analytics',icon:'chart',color:'orange',description:'示例图表展示',inDock:false},
 {id:'contact',name:'联系我',english:'Contact',icon:'mail',color:'indigo',description:'社交与合作',inDock:false},
 {id:'settings',name:'系统设置',english:'Settings',icon:'settings',color:'steel',description:'个性化外观',inDock:true}
];
