# Contributing to OSWebsite

欢迎参与！我们希望把 OSWebsite 发展成真正可靠的开源产品，而不只是一张炫酷的网页。

## Workflow

1. Fork 仓库，新建语义明确的分支。
2. 运行 `npm test`（使用 Node.js 22 或更新版本，无需安装依赖）。
3. 修改原有模块 `src/`，运行 `npm run build:single` 同步生成单文件演示版。
4. 提交包含功能说明、手动测试步骤的 PR；界面更新请附真实截图。
5. 新增外部服务前必须写明数据来源、隐私、授权、故障回退与费用。

## Quality bar

- 避免复制其他项目的 UI 资产、商标、图片和业务内容。
- 不把演示数据描述成真实数据。
- 默认无数据收集、无账户、无远程执行。
- 交互要支持键盘、触屏、减弱动效。
- 每个新主题都要在 Mac、Windows、iPad、iPhone、Android 模拟器下检查。
- 所有用户输入显示到 HTML 前要转义，外链要校验协议。

## Good first issues

移动端可访问性、键盘窗口管理、搜索排序、主题扩展、项目配置编辑器、Playwright E2E / Lighthouse 基线。
