export const site = {
  name: '闫伟平',
  englishName: 'Weiping Yan',
  role: 'Senior UI/UX Designer',
  heroLabel: 'Senior UI/UX Designer',
  headline: ['你好，', '设计不止会画图。'],
  subtitle: '还会思考产品、打磨体验，顺便把想法变成现实。',
  description: 'More Than Just Pixels.',
  portrait: '/assets/about-portrait-stylized.png',
  portraitMask: '/assets/about-portrait-stylized-mask.png',
  avatar: '/assets/weiping-avatar.jpg',
  heroVideo: '/assets/hero-background.mp4',
  heroPoster: '/assets/hero-poster.jpg',
  links: { resume: '', figma: '', behance: '' },
  media: {
    'ai-image-to-video': { cover: '/assets/work-ai-image-to-video-v5.png', alt: 'AI Image to Video 封面：图片输入、模型配置与动态视频生成工作台' },
    gstory: { cover: '/assets/cover-gstory-v6.png', alt: 'GStory 封面：浅蓝色背景下，黑色笔记本电脑展示 GStory 首页' },
    'face-swap': { cover: '/assets/cover-face-swap-v6.png', alt: 'Face Swap 产品矩阵封面：深蓝色背景中的人像换脸前后效果展示' },
    'ai-painting': { cover: '/assets/cover-ai-painting-v3.png', alt: 'AI Painting 封面：浅薄荷青纯色背景上的双手机样机，展示绘画首页与 AI 头像页面' },
    'ai-face': { cover: '/assets/cover-ai-face-v5.png', alt: 'AI Face 封面：明黄至薄荷青渐变背景，左侧生成状态界面与右侧首页手机样机' },
    'automotive-apps': { cover: '/assets/cover-automotive-apps-generated-v1.png', alt: '车佳佳与易捷加油概念封面：汽车、加油站、维修与车主生活路线' },
    chejiajia: { cover: '/assets/cover-chejiajia-v1.png', alt: '车佳佳 App 蓝色封面：洗车、加油、充电与车主服务展示' },
    yijie: { cover: '/assets/cover-yijie-v1.png', alt: '易捷加油 App 红色封面：加油、购物与人车生活服务展示' },
    'other-works': { cover: '/assets/cover-other-works-generated-v1.png', alt: '更多作品概念封面：动效帧、抽象视觉画作与立体创意设计' },
  } as Record<string, { cover?: string; images?: string[]; alt?: string; inset?: boolean }>,
}

export const labels = {
  navigation: [['关于', 'About', '#about'], ['作品', 'Works', '#works'], ['能力', 'Expertise', '#skills'], ['联系', 'Contact', '#contact']],
  sections: {
    about: ['About Me', '关于我'],
    works: ['Selected Works', '作品展示'],
    capabilities: ['Core Expertise', '核心能力'],
    experience: ['Work Experience', '工作经历'],
    contact: ["Let's Create Together.", '开启合作'],
  },
  buttons: { explore: '全面了解我', contact: '联系我', view: 'View project', copy: '复制邮箱', back: '返回作品', next: '下一项目' },
  categories: { Web: 'Web 产品设计', App: '移动端体验设计', 小程序: '小程序设计' } as Record<string, string>,
}
