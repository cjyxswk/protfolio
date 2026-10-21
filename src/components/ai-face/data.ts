export const asset = (name: string) => `/assets/ai-face/${name}.png`
export const screens = {
  home: '首页：Trending、Realism 与 Comic 风格分类',
  create: '创作界面：照片裁剪、比例选择、相似度滑块与 Create',
  loading: '提交界面：作品预览、原图缩略图、38% 进度与 Submitting 状态',
  result: '作品结果界面：Save 与社交分享入口',
  'result-ads': '结果界面：对比、点赞点踩、分享与广告横幅',
}
export type ScreenName = keyof typeof screens
export const tasks = [
  { en: 'Discover', title: '发现喜欢的风格', scene: '快速浏览照片风格，理解结果大致效果。', opportunity: '以作品示例组织分类，让选择更直观。' },
  { en: 'Create', title: '创建自己的作品', scene: '理解上传、裁剪、比例与相似度的关系。', opportunity: '先完成关键操作，再逐步开放控制。' },
  { en: 'Share', title: '让创作继续发生', scene: '感知生成状态，方便地保存与分享。', opportunity: '连接等待、结果与下一步行动。' },
]
export const strategies = [
  ['作品先行', '以结果图引导选择，而非先呈现复杂功能术语。'],
  ['渐进式控制', '先完成关键操作，必要时再调整比例和相似度。'],
  ['状态可感知', '让等待、结果、保存分享形成连贯闭环。'],
]
export const journey = ['Explore', 'Pick Style', 'Upload & Crop', 'Adjust', 'Generate', 'Wait', 'Preview', 'Save / Share']
export const journeyScreens: { screen: ScreenName; title: string; detail: string; range: number[] }[] = [
  { screen: 'home', title: '探索与选择', detail: '预期：用真实风格示例帮助判断结果。', range: [0, 1] },
  { screen: 'create', title: '上传与调整', detail: '控制：裁剪、比例和相似度集中设置。', range: [2, 3, 4] },
  { screen: 'loading', title: '提交与等待', detail: '反馈：进度与状态提示让等待有依据。', range: [5] },
  { screen: 'result', title: '预览与分享', detail: '行动：在结果附近提供保存与分享。', range: [6, 7] },
]
export const promos = [
  { name: 'promo-1', title: '照片风格化', alt: 'AI Face 宣传素材：真人照片与粉色动漫人像的前后对比' },
  { name: 'promo-2', title: '个人表达', alt: 'AI Face 宣传素材：原始照片与插画风格化形象' },
  { name: 'promo-3', title: '艺术风格', alt: 'AI Face 宣传素材：多种艺术效果与风格卡片' },
  { name: 'promo-4', title: '模板探索', alt: 'AI Face 宣传素材：Anime 2D 等风格模板展示' },
  { name: 'promo-5', title: '社交分享', alt: 'AI Face 宣传素材：作品与社交分享场景' },
]
export const palette = [
  ['Canvas', '#090909'], ['Surface', '#131313'], ['Text', '#FFFFFF'], ['Secondary', '#A0A0A0'],
]
export const deliverables = ['首页信息布局与风格分类', '照片上传与裁剪编辑', '比例与相似度控制', '提交加载与进度反馈', '结果展示与保存分享', '界面规范与关联视觉资源']
export const validation = ['浏览 → 进入创作的点击转化', '进入创作 → 提交的完成率', '提交失败与放弃率', '结果页保存 / 分享意愿', '比例与相似度设置使用分布', '广告对结果查看体验的影响']
