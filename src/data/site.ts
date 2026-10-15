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
    'ai-image-to-video': { cover: '/assets/work-ai-image-to-video-v3.png', alt: 'AI Image to Video：静态山景照片转换为动态视频', inset: true },
    gstory: { cover: '/assets/cover-gstory-generated-v1.png', alt: 'Gstory 概念封面：图片高清、图像清理与视频翻译工具组合' },
    'face-swap': { cover: '/assets/cover-face-swap-generated-v1.png', alt: 'Face Swap 概念封面：单人换脸对比与多人视频画面' },
    'ai-painting': { cover: '/assets/cover-ai-painting-generated-v1.png', alt: 'AI Painting 概念封面：提示词生成不同绘画风格的山水画作' },
    'ai-face': { cover: '/assets/cover-ai-face-generated-v1.png', alt: 'AI Face 概念封面：同一个人的照片转换为不同风格写真' },
    'automotive-apps': { cover: '/assets/cover-automotive-apps-generated-v1.png', alt: '车佳佳与易捷加油概念封面：汽车、加油站、维修与车主生活路线' },
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
  buttons: { explore: '看看我做了什么', contact: '联系我', view: '查看项目', copy: '复制邮箱', back: '返回作品', next: '下一项目' },
  categories: { Web: 'Web 产品设计', App: '移动端体验设计', 小程序: '小程序设计' } as Record<string, string>,
}
