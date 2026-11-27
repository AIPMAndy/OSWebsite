<div align="center">

# ✳ OSWebsite

**Your corner of the internet, reimagined.**

**一个真正可交互的网站操作系统。不只是个人主页，也不只是换皮。**

[在线体验](https://aipmandy.github.io/OSWebsite/) · [English](./docs/README.en.md) · [快速部署](#-5-分钟启动) · [产品路线图](./docs/ROADMAP.md) · [设计规范](./docs/DESIGN.md)

![MIT License](https://img.shields.io/badge/License-MIT-b7f5db) ![Vanilla JavaScript](https://img.shields.io/badge/Vanilla_JS-No_build_step-cedeff) ![Desktop + Mobile](https://img.shields.io/badge/Devices-5_modes-b6e6ff) ![Themes](https://img.shields.io/badge/Themes-5-efc6fb)

</div>

<!-- andy-geo:start -->
## 一句话简介

**可交互的个人网站操作系统：多主题、5 种设备模式、零构建 Vanilla JS 个人主页**

- 作者：AI酋长Andy（Andy Liu，英文名 AI Chief Andy），流量 AI 联合创始人、星觉 AI 创始人。星觉科技，北京。
- 阅读或使用：[在线阅读/使用](https://aipmandy.github.io/OSWebsite/) · [GitHub 仓库](https://github.com/AIPMAndy/OSWebsite)
- 联系：微信 `AIPMAndy`（备注「OSWebsite」）· [官网 metaver.vip](https://metaver.vip/) · [X @AIPMAndy](https://x.com/AIPMAndy)
- 许可：MIT。内容免费使用；企业合作或个人陪跑请先沟通，公开页不公示价格。
- 机器可读摘要：[llms.txt](llms.txt)（供 AI 引擎与检索工具读取）

## 常见问题

**这是什么？**可交互的个人网站操作系统：多主题、5 种设备模式、零构建 Vanilla JS 个人主页

**包含什么？**主要模块：为什么做 OSWebsite？、当前已实现（v1.0）、5 分钟启动、五种主题 × 五种设备、自定义你的网站、部署。

**要花钱吗？**按 MIT 许可免费使用；付费只涉及作者的企业合作与一对一咨询，不影响仓库内容。

**怎么开始？**直接打开 https://aipmandy.github.io/OSWebsite/ 在线阅读；想本地运行或参与贡献，见下方 README 的快速开始部分。

<!-- andy-geo:end -->

## 为什么做 OSWebsite？

普通个人网站是“看”的。OSWebsite 让访客像用操作系统一样**探索你的世界**：打开应用、拖动窗口、浏览作品、写本地笔记、操作小看板，切换设备和风格。

这不是完整的 Windows / macOS / iOS / Android 操作系统，不具备原生系统 API，也**不运行真实终端命令**。它是一套纯前端的高保真 OS 风格网站体验与网站模板。

## ✨ 当前已实现（v1.0）

| 模块 | 当前能力 |
| --- | --- |
| 5 套主题 | Nebula 深空星云、Alpine 冰川晨光、Atelier 黑白艺廊、Solstice 琥珀日落、Circuit 赛博终端 |
| 5 种设备模拟 | macOS 风格、Windows 风格、iPadOS 风格、iOS 风格、Android 风格 |
| 2 种使用模式 | `Studio` 设计台（设备预览 + 配置） / `Site` 访客网站 |
| 桌面系统 | 半透明菜单栏、壁纸、应用图标、Dock、窗口拖动、最小化、最大化、层叠聚焦 |
| 手机系统 | 状态栏、主屏小组件、应用网格、Dock、手机内全屏应用切换 |
| 11 个内置应用 | 关于我、项目展厅、文件管理、灵感画廊、笔记、任务看板、终端、网络导航、数据实验室、联系我、设置 |
| 命令中心 | `⌘/Ctrl + K` 搜索应用和项目；`⌘/Ctrl + ,` 打开设置 |
| 数据持久化 | 主题、设备偏好、个人笔记、任务看板、编辑的品牌信息保存在浏览器 `localStorage` |
| 配置驱动 | 通过 `src/config.js` 配置品牌、时间线、项目和真实链接；Studio 支持基础字段编辑、导入 / 导出 JSON |
| 易部署 | 零前端构建依赖、无需 API Key；GitHub Pages / Vercel / Netlify / 静态服务器均可 |
| 自适应 | 手机访问 `?mode=site` 默认自动显示 iOS 风格；可显式添加 `&device=android` 等参数 |

### 已实现的交互实例

- 桌面：打开多个窗口、移动、切换焦点、缩放、关闭、最小化。
- 手机：在主屏和全屏应用之间切换。
- **项目展厅**：分类筛选、详情页和 GitHub 外链。
- **灵感笔记**：实时自动保存、导出 Markdown。
- **任务看板**：添加任务、在状态列之间拖放或使用下拉框移动、删除任务（需确认）、本地保存。
- **终端**：内置 `help`, `whoami`, `ls`, `projects`, `open`, `theme`, `device`, `date`, `links`, `clear`；所有命令都在浏览器内模拟，不执行 shell。
- **命令面板**：搜索应用和作品，回车打开第一条结果。
- **数据实验室**：视觉演示数据，不是实时访客数据，不进行访客追踪。

## 🚀 5 分钟启动

要求：现代浏览器 + 任意静态文件服务器。**不需要 `npm install`。**

```bash
# clone your own repo, or unzip the OSWebsite release
cd OSWebsite
python3 -m http.server 8000
```

浏览器打开：

- `http://localhost:8000` — Studio 设计台（默认）
- `http://localhost:8000/?mode=site` — 正式网站访客模式
- `http://localhost:8000/?mode=site&device=ios` — 强制 iPhone UI
- `http://localhost:8000/?mode=site&device=windows&theme=atelier` — Windows + 黑白风

**最简单的体验方式**：下载并直接打开根目录的 `OSWebsite-demo.html`。它是所有 CSS、JavaScript、图标已内联的单文件版本，适合快速预览；生产部署仍推荐使用模块化源码。若修改源码，运行 `npm run build:single` 重新生成它。

如果需要运行本地自动化测试（仅依赖 Node.js 内置 test runner）：

```bash
npm test
```

## 🎨 五种主题 × 五种设备

| 主题 | 设计语言 |
| --- | --- |
| `nebula` | 宇宙、玻璃、冷蓝紫与柔光渐变 |
| `alpine` | 冰川、浅色、自然、晨光 |
| `atelier` | 黑白极简、编辑式排版 |
| `solstice` | 暖色、日落、琥珀叙事 |
| `circuit` | 深绿、电子终端、未来感 |

设备 `mac`, `windows`, `ipad`, `ios`, `android` 是 Web 模拟外壳；**不需要真正运行在对应设备上**。Studio 中随时切换，内容共用一份。

## 🛠️ 自定义你的网站

最简单的方式：编辑 `src/config.js` 中的 `SITE` 对象。

```js
export const SITE = {
  brand: '你的名字',
  shortName: 'Your Name',
  role: '你的一句话身份',
  tagline: '你的核心价值主张',
  intro: '你的完整介绍...',
  links: [
    { label: 'GitHub', url: 'https://github.com/yourname', icon: 'github' }
  ],
  projects: [
    { id:'my-project', name:'MyProject', kind:'开源工具', tag:'Open Source',
      subtitle:'一句话介绍', description:'完整描述',symbol:'✳',tone:'mint',
      link:'https://github.com/yourname/my-project' }
  ]
};
```

也可以在 Studio 左侧打开“内容配置”并保存基本信息。Studio 修改和 JSON 导入只在本地浏览器生效；**若要让全球访客看到修改，需把内容写入 `src/config.js` 并重新部署**。这是刻意保留的静态无后端边界。

为了避免误导，演示项目暂时以用户的 GitHub 仓库列表为入口，未声称每个示例项目拥有已核实的单独仓库链接。正式发布前请替换为自己的真实链接。

## ☁️ 部署

### GitHub Pages

1. 新建公开仓库并上传本项目的**全部文件**，确保 `index.html` 位于仓库根目录。
2. 打开仓库 **Settings → Pages**。
3. 在 **Build and deployment** 中选择 `Deploy from a branch`，选 `main` 和 `/ (root)`，保存。
4. Pages URL 后加 `?mode=site`，用于对外展示。也可以改 `index.html` 或入口默认参数，把访客模式设为默认。

### Vercel / Netlify

导入 GitHub 仓库，选择静态站点，不需要构建命令，发布目录填 `/`（仓库根目录）。

## 📁 目录

```text
OSWebsite/
├── index.html             # 入口
├── OSWebsite-demo.html    # 独立单文件演示（由构建脚本生成）
├── src/
│   ├── main.js            # Studio, OS Shell, window manager, interactions
│   ├── apps.js            # Application views
│   ├── config.js          # Brand, projects, apps, themes, devices
│   ├── utils.js           # Icons, escaping, storage, download
│   └── styles.css         # Design system + all OS skins
├── assets/favicon.svg
├── docs/
│   ├── README.en.md
│   ├── DESIGN.md
│   ├── ROADMAP.md
│   └── TEST-REPORT.md
├── scripts/build-single.mjs
├── tests/project.test.mjs
├── tests/runtime.test.mjs
├── LICENSE
└── package.json
```

## 🔒 安全 / 隐私 / 产品边界

- 没有用户登录、云端同步、真实模拟操作系统或 AI 服务；这些是未来候选能力，不是当前承诺。
- 项目默认不请求访客定位、不收集个人信息、不上传笔记或任务。
- `localStorage` 可被浏览器清理；请使用笔记的“导出 .md”备份重要内容。
- 终端是受限的指令解释器，不会执行任意代码或操作用户电脑。
- 外部链接使用 HTTPS allowlist 和 `rel="noopener noreferrer"`。
- 本项目没有捆绑原参考项目的用户素材、媒体、商标或后端代码。
- 未来引入分析能力前，应先落实隐私声明、数据可核验与用户同意。

## 🤝 灵感来源与版权

产品灵感参考 [chuspeeism/xiaozao-os](https://github.com/chuspeeism/xiaozao-os)，其公开仓库使用 MIT 许可证。OSWebsite v1 采用**全新编写的源码、设计系统与原创 CSS 视觉效果**，没有复制该项目的 HTML、JavaScript、图片、音视频或品牌素材。原项目作者拥有其原创内容的权利。

本站以 [MIT License](./LICENSE) 开源。欢迎提交 PR、Issue 和自己的主题 / 应用！

---

**OSWebsite** — Build a website people want to *explore*, not just scroll.
