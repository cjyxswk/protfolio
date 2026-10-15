# 闫伟平｜UI/UX 个人作品集

工作经历由 `src/components/Experience.tsx` 渲染，数据位于 `src/data/portfolio.ts` 的 `experiences`，样式位于 `src/experience.css`。按最近经历优先排列，任职时间使用语义化 time，每家公司仅三个静态专业标签。768px 及以上双栏横向时间轴，767px 及以下纵向时间轴；无大型背景卡片或桌面竖线，不设固定内容高度。沿用一次性 Scroll Reveal，支持减少动态效果。岗位、职责和标签采用本次用户确认文案，不增加业绩数据。

About 人物 Hover 技能动画：`src/components/AboutPortrait.tsx` 与 `src/portrait-skills.css` 管理，软件名单和固定位置在 `src/data/portraitSkills.ts`，仅包含 Figma、Photoshop、After Effects、Sketch、CapCut、Codex、Qoder。各图标由独立人物轮廓起点扩散到固定终点，坐标按卡片尺寸比例计算。使用 Framer Motion，初始 scale 0.6，展开 scale 1，移出 scale 0.75，沿原路径回收；每项错峰 60ms，入场最后一项约 840ms 完成。图标不超出人物卡片，不修改照片；仅桌面精细指针 Hover 生效，小屏和触屏静态展示。支持减少动态效果，无轮询或持续动画。官方素材来源见 `content/SKILL_ICON_SOURCES.md`。

暖黑橙色极简风格的高级 UI/UX 设计师作品集，使用 React、TypeScript 与 Vite。首屏采用居中胶囊导航、超大中文标题、3D 视频和橙色 CTA；公开内容只采用已提供的履历事实，不包含原始简历、电话或未确认公开的商业数据。

## 启动与构建

```bash
npm install
npm run dev
```

开发地址通常为 `http://localhost:5173`。执行 `npm run check` 进行类型检查，`npm run build` 生成生产构建到 `dist/`。

页面入口：

- `/` — 首页
- `/projects/ai-image-to-video`
- `/projects/face-swap`
- `/projects/gstory`
- `/projects/ai-painting-ai-face`
- `/projects/utility-apps`
- `/projects/dapai-nashoucai`
- `/projects/automotive-apps`

## 内容与素材

所有公开项目内容集中在 `content/portfolio.json`，由 `src/data/portfolio.ts` 导入。修改项目名称、日期、职责、成果和分类均在该 JSON 完成，不要把未确认公开的信息写入 JSON。

当前没有真实项目设计稿，因此作品区使用清晰标注为“PLACEHOLDER · 待替换设计图”的封面占位，不会伪装成线上截图。提供真实素材后，请放到：

```text
public/projects/<slug>/
```

然后在 JSON 为项目补充媒体字段，并在 `src/App.tsx` 的 `WorkPlaceholder` 位置渲染对应图片/视频。推荐字段：`media.cover`、`media.images`、`media.video`、`media.poster`、`links.live`、`links.figma`。仅当文件实际存在时才显示媒体与外链按钮。

未公开原始 PDF。若本人确认公开，请将已经审查过的副本放为 `public/resume.pdf`，并仅在确认包含公开电话与个人资料后，在数据配置中增加下载按钮。

## 部署

这是 history 路由结构的 SPA。静态托管需把未知路径回退到 `/index.html`，否则直接打开或刷新项目详情页会得到服务器 404。例如 Netlify 可增加 `_redirects`：`/* /index.html 200`；其他平台使用同等 history fallback 设置。

## 视觉与响应式

### 首页电影式开场

“继续探索”采用 `src/components/SpecularButton.tsx`：根据用户提供的 React Bits SpecularButton 着色器适配为 TypeScript 原生锚点，橙色实心按钮边缘的暖白高光随附近鼠标移动，按下时短暂增强，键盘 Focus 也有高光反馈。无需新增依赖。WebGL 不可用时降级为橙色按钮与细描边；减少动态效果模式不启用鼠标追光。离屏或切换标签页后停止渲染，光线位置稳定后不持续运行 RAF。作品锚点由统一滚动控制器处理，重复点击保护保持不变。`src/button-motion.css` 保留上浮、按压及箭头轻移，删除旧扫光以避免效果叠加。

导航始终 fixed 吸顶悬浮，PC 顶部 32px（短屏 24px）、高度 76px，移动端考虑安全区、高度 58px。已删除自动隐藏状态、500ms 停止计时、Hover/Focus 隐藏锁及重现动画。事件驱动的 passive scroll + requestAnimationFrame 更新背景与 Active，位置、高度不变。首次媒体时间轴入场保留在独立 navbar-motion 层。导航、Hero CTA 和页脚共用 useSectionNavigation，使用 JS 坐标 + window.scrollTo；CSS scroll-margin/scroll-padding 均为 0。

导航品牌区使用本人提供的照片 `public/assets/weiping-avatar.jpg`，路径配置在 `site.avatar`。圆形头像桌面 44px、移动端 38px，橙色描边 1.5px；中文姓名与英文职业标签上下排列。原图保持不变，通过 `navbar.css` 的 `.brand-avatar img` 静态裁切（scale / transform-origin）聚焦面部；更换照片时需要重新调整裁切位置。品牌区域通过同一滚动控制器返回首页顶部。

`.navbar-visibility` 独立负责 280ms 隐藏和 320ms 显示，原 `.navbar-motion` 的视频时间轴入场不变；隐藏时向上 16px 并完全淡出、关闭 pointer-events；再次出现从 -8px 恢复，不移除键盘可访问性。减少动态效果模式取消过渡，显隐规则仍保留。

导航组件独立在 `src/components/Header.tsx`，位于 `main` 外的顶层布局。`src/navbar.css` 统一定义外层 fixed 定位与遮挡层级（1000），内部 `.navbar-motion` 仅负责入场动画，避免居中与动画 transform 冲突。导航宽度遵循全站 Container，桌面顶部 32px；滚动达到 60px 后仅加深背景，不改变 76px 高度。移动端顶部考虑安全区、高度 58px。全局弹窗层级预留 `--z-modal:2000`。锚点位于无 transform 的标题外层，Active 由实际标题位置更新，不触发任何额外滚动。

导航使用 Warm Dark Glass：默认暖黑棕色 52% 半透明背景，滚动后 88%，悬停再轻微加深；桌面 blur(18px) saturate(130%)，移动端 blur(12px) saturate(125%)。玻璃材质在 `.pill-nav::before` 独立渲染，避免父级 backdrop root 令移动菜单无法模糊实际页面。细暖橙边框、柔和外阴影与 6% 内侧高光；菜单仅以橙色 Active 强调。支持 Safari 前缀；无任何 backdrop-filter 支持时降级为不透明暖黑背景。导航之外的颜色、布局和视频不变。

`src/components/CinematicHero.tsx` 管理首页内容、CTA 和轻量滚动视差；`src/components/HeroBackground.tsx` 管理视频播放与媒体时间轴；`src/cinematic.css` 管理分组 Reveal、导航、按钮反馈和降级状态。

保留原始 `public/assets/hero-background.mp4`，首帧封面为 `public/assets/hero-poster.jpg`。视频原长约 3.04 秒，人物约第 1 秒抬头挥手，首尾不连续，因此以 0.75 倍速播放一次并停留末帧，不生硬循环。入场依据视频 `currentTime`：导航 0.375s、标题 1.05s、副标题 1.8s、英文 1.935s、CTA 2.4s、底部标签 2.85s；对应正常播放时约 0.5 / 1.4 / 2.4 / 2.58 / 3.2 / 3.8 秒。

视频拒绝自动播放、加载失败或启动等待超过 1.8 秒时，立即展示封面和全部文字、操作。减少动态效果及支持 `saveData` 的省流量环境采用静态首帧，禁用入场位移与视差。页面不可见时暂停，恢复可见后继续，不重置播放进度。更换视频时请同时更新封面、媒体时间阈值和主体裁切位置。

当前 Warm Dark 配色在 `src/palette.css` 集中管理：背景 `#100D0B`、卡片 `#1C1713`、品牌橙色 `#FF792E`、Hover `#FF8B49`、标题暖白 `#F5EFE7`、辅助暖灰 `#B9AFA4`。首页按钮使用 `.button-primary` 橙色实心与深暖黑文字，联系按钮使用 `.button-outline` 橙色描边。导航背景与棕色描边、Focus、Active、选中文字、卡片及各模块保持统一。背景没有新增色彩渐变，原视频未调色，入场和交互动画、字体层级与页面结构均保留。

V3.1 中英排版：导航仅使用中文；栏目采用英文 Title Case 主标题和中文副标题。中文正文使用 PingFang SC / Microsoft YaHei / Noto Sans CJK SC，英文使用 Inter / SF Pro Display / Arial，均有系统回退。`src/typography.css` 管理 Display / Section / Label / Body / Meta 五类字体尺度。仅 `.eyebrow` 微标签允许全大写，产品专名保留原始大小写。

栏目、导航、按钮与类别文案集中在 `src/data/site.ts` 的 `labels` 中，可统一编辑。

About 定位、介绍和四张个人优势卡片集中在 `src/data/about.ts`。100万+ 对应工具类代表产品累计使用量，来源为 `content/portfolio.json`，不归因为设计师个人创造的增长。`src/about.css` 管理双栏、4:5 肖像与优势卡片：默认 2×2，430px 及以下单列；卡片 450ms Fade Up、相邻错峰 100ms，仅播放一次，支持减少动态效果。Hover 提亮并上浮 2px，无点击功能。正式肖像通过 `src/data/site.ts` 的 `portrait` 配置，无图片时显示无文案占位，不自动生成肖像。

教育背景在 `src/data/education.ts` 管理，学校、专业、学历与就读时间使用用户已确认的信息：河北传媒学院 / 视觉传达设计 / 本科 / 2017—2021。未填写的字段自动隐藏。请填写真实资料，不推断学历或毕业时间。所有字段均为空时不显示教育区域。教育背景位于成果数据下方，仅有一条分割线，跟随 About 原有 Scroll Reveal，样式在 `src/education.css` 和 `src/about.css`。

全局视觉 token 位于 `src/dark.css`，参考图 05 的排版与响应式校准位于 `src/refinements.css`。履历与项目内容位于 `content/portfolio.json`；首页标题、外链及真实图片配置集中在 `src/data/site.ts`。

为项目添加真实图片时，在 `site.media` 中按 slug 配置：

```ts
media: {
  'ai-image-to-video': {
    cover: '/projects/ai-image-to-video/cover.webp',
    alt: 'AI Image to Video 核心界面',
    images: ['/projects/ai-image-to-video/workflow.webp'],
  },
}
```

图片保持原始配色、懒加载展示。未填写简历或作品平台 URL 时不展示按钮。页面包含首页、关于（含工作经历）、作品、能力和联系五个主锚点；项目详情为 `/projects/<slug>`。

### 全站 Container System

`src/components/Container.tsx` 提供公共语义容器，支持 `as="section" / "header" / "footer"`。导航、Hero 文案与底部标签、关于（工作经历继承其容器）、作品、能力、联系、页脚和全部项目详情都使用它。不要在这些组件中另外设置水平外边距。Hero 视频保持视口全宽。

`src/layout.css` 为最终布局层，统一覆盖历史样式中的零散外层宽度与间距。可调整 `--container-max`、`--page-gutter`、`--section-space`、`--heading-space` 和 `--grid-gap`：

| 屏幕宽度 | 内容规范 | Section 上下间距 |
| --- | --- | --- |
| ≥1440px | 最大 1200px 居中 | 140px |
| 1024–1439px | 左右 48px | 140px |
| 768–1023px | 左右 32px | 100px |
| 376–767px | 左右 20px | 72px |
| ≤375px | 左右 16px | 64px |

桌面卡片间距 24px，移动端 18px、小屏 16px。移动端卡片采用上方媒体、下方自然高度文字，避免窄屏遮挡；后续真实图片为 4:3，当前概念占位为 1:1。标题保持原有层级，Hero 最大字号受容器宽度约束。

已检查首页 1920、1440、1280、1024、768、430、390、375、320px 的容器边界和溢出，并检查 7 个详情页对应的 63 组断点；未发现横向溢出。补充真实项目图后仍需重新检查封面裁切与长文案。
