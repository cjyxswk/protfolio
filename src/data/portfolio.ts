import source from '../../content/portfolio.json'

export type Project = typeof source.projects[number]
export const portfolio = source
export const projects = source.projects
export const projectBySlug = (slug: string) => projects.find((project) => project.slug === slug)
export const experiences = [
  {
    startDate: '2023-04', endDate: '2026-09',
    company: '上海方亿信息科技有限公司',
    title: '高级 UI/UX 设计师',
    brief: '主导多个面向海外市场的 App、Web 及 AI 产品从 0 到 1 的 UI/UX 设计，涵盖交互体验、视觉系统、国际化适配与开发交付，持续推动产品上线及体验迭代',
    tags: ['海外 AI 产品设计', '多产品 0–1 主导', 'AI 辅助开发交付'],
  },
  {
    startDate: '2021-10', endDate: '2023-02',
    company: '车车佳汽车科技（上海）有限公司',
    title: 'UI 设计师',
    brief: '参与车佳佳、易捷加油 App 的重大版本改版与体验重构，优化核心交互流程、视觉界面及设计规范，并支持线下视觉物料设计。',
    tags: ['汽车服务 App 设计', '核心业务体验重构', '品牌与线下视觉设计'],
  },
] as const
