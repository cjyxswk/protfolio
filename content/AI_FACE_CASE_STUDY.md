# AI Face 案例交付说明

## 运行与入口

沿用现有 React + Vite + TypeScript 工程，无新增依赖。

```sh
npm run dev -- --host 127.0.0.1 --port 5174 --strictPort
```

- 独立页面：http://127.0.0.1:5174/projects/ai-face
- 首页作品画廊：AI Face 卡片普通点击打开全屏弹窗；Command/Ctrl 点击仍使用独立路由。
- 构建：`npm run build`。
- 未发布、提交或推送至远端。

## 文件结构

```text
src/components/ai-face/
  AiFaceCaseStudy.tsx   # 00–11 章节（09 分为生成与结果两屏）
  CaseStudyOpening.tsx # 参考版式：双手机封面、项目介绍、架构、用户任务、竞品思考
  FunctionArchitecture.tsx # Styles / Brush / Settings 完整树状架构，折叠与路径高亮
  architectureData.ts  # 用户指定的一级、二级功能及三级标签配置
  CaseStudyModal.tsx   # 原生 dialog、独立滚动、背景锁定及关闭恢复
  CaseStudyNav.tsx     # 复用作品集悬浮导航、右侧章节圆点、返回作品（无右侧关闭图标）
  SectionHeading.tsx   # 章节标题
  PhoneFrame.tsx       # 原比例手机截图、原图局部视窗
  ProcessTimeline.tsx # 八步旅程及对应界面高亮
  ImageGallery.tsx    # 五张宣传素材与原图放大
  data.ts             # 素材、任务、策略、旅程、交付及验证项
src/ai-face-case.css  # 以 af- 前缀隔离的响应式视觉样式
src/ai-face-reference.css # 参考图的编辑式排版及五档响应式适配
src/ai-face-architecture.css # 与 AI Face 统一的黑底架构模块；桌面横向树 / 移动纵向树
public/assets/ai-face/ # 用户提供的 10 张原图，未修改文件内容
artifacts/ai-face/     # 桌面端各章节截图
```

接入文件：`src/App.tsx`、`src/components/WorksGallery.tsx`。未替换其他项目的详情页。

## 素材与内容依据

- 原素材来自 `/Users/xiaoxiao/Downloads/ai-face-assets/`，完整复制至 public。
- 五张实际界面：home / create / loading / result / result-ads；均为 750 × 1624。
- 五张宣传素材：promo-1 至 promo-5；均为 946 × 2048。宣传素材与产品 UI 明确区分。
- 图片采用 contain 或 SVG 原比例局部视窗，不生成、拉伸或重绘 App 截图；没有新增状态栏。
- 当前封面使用 home 与 create 两张真实界面，采用错位双手机排版，不暗示为同一张照片的生成前后对比。
- 各阶段截图中的照片不同，旅程标明为界面流程序列，非同一次生成记录。
- 原图缩略对比实际出现在 loading.png；result.png 未显示该原图，因此未虚构结果页对比照片。

## 验证记录

- `npm run build` 通过。
- 已检查 1920、1440、1024、768、375px 宽度，页面宽度与视口一致，无页面级横向滚动。
- 窄屏宣传图采用有意的内部横滑，SVG 局部图片在视窗内裁切，不构成页面溢出。
- 手机截图均保持 `object-fit: contain`。
- 功能架构根据用户最新提供的完整功能清单展示 3 个一级模块、16 个二级节点；默认展开，Brush 折叠后对应子节点和连线隐藏，展开后恢复。
- 架构 SVG 使用 ResizeObserver 根据实际节点坐标绘制；节点焦点验证对应根路径与子路径高亮。五档宽度均无页面级溢出。
- 独立页面导航与章节高亮、旅程点击高亮、图片预览均已浏览器验证。
- 从作品集打开全屏弹窗，body 固定、内部独立滚动；实际点击 Process 可定位到 sticky 导航下方。
- 案例打开时背景作品画廊暂停自动切换。
- 图片 Esc 仅关闭图片；再次 Esc 关闭案例；关闭后恢复原滚动位置（测试 1915 → 1915px）。
- 原生 dialog 提供键盘焦点约束；按钮有可访问名称，图片有替代说明。
- 减少动态偏好通过 CSS 与锚点逻辑支持；未在浏览器中切换系统偏好进行单独实测。

## 未证实与待补充信息

无阻塞页面运行的缺失素材。以下内容不当作既有事实：

1. 用户研究样本数、实际点击转化、提交完成率、失败率、留存及商业绩效，均未提供，因此未展示。
2. 产品模式观察是设计推演，不声称已完成正式竞品研究或用户访谈。
3. 视觉 token、字号示例为作品集提炼建议，不宣称为 App 官方精确规范。
4. 按下、不可用、失败和重试状态只列为后续补充建议，不伪装为产品已有界面。
5. 未推断历史记录、账户体系与后端算法实现。架构中的会员状态和 Upgrade to Pro 来自用户后续提供的明确功能清单，未新增订阅价格或权益。
6. 原截图中的英文提示保持原样，改进文案仅写在设计说明中。

## 模块截图

当前参考排版截图：`reference-cover.png`、`reference-overview.png`、`reference-analysis.png`、`reference-mobile.png`。下表 00–04 为初版历史截图，其余流程内容仍保留。

| 文件 | 模块 |
| --- | --- |
| [00.png](../artifacts/ai-face/00.png) | Hero |
| [01.png](../artifacts/ai-face/01.png) | 项目概述 |
| [02.png](../artifacts/ai-face/02.png) | 产品分析 |
| [03.png](../artifacts/ai-face/03.png) | 产品模式与策略 |
| [04.png](../artifacts/ai-face/04.png) | 功能架构 |
| [05.png](../artifacts/ai-face/05.png) | 核心旅程 |
| [06.png](../artifacts/ai-face/06.png) | 视觉体系 |
| [07.png](../artifacts/ai-face/07.png) | 首页探索 |
| [08.png](../artifacts/ai-face/08.png) | 创作体验 |
| [09.png](../artifacts/ai-face/09.png) | 等待反馈 |
| [10.png](../artifacts/ai-face/10.png) | 结果展示 |
| [11.png](../artifacts/ai-face/11.png) | 传播素材 |
| [12.png](../artifacts/ai-face/12.png) | 交付复盘 |
| [13.png](../artifacts/ai-face/13.png) | 结束页 |
