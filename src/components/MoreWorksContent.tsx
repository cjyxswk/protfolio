export const moreWorksPages = [
  '盲盒活动', '邀请有礼 H5 活动', '家政服务运营 Banner', '萌宠主题运营 Banner', '夏季上新运营 Banner',
  '角色建模练习', '角色场景设计', '电脑人角色建模', '电脑人场景展示', 'STAR LAB 数字藏品艺术平台',
  'STAR LAB 设计目标', 'STAR LAB 主页面设计', 'STAR LAB 其他页面设计', '大牌拿手菜小程序', '大牌拿手菜界面展示',
]

export const moreWorksSections: [string, string][] = [
  ['other-work-page-1', 'H5 活动'],
  ['other-work-page-3', '运营设计'],
  ['other-work-page-6', '3D 建模'],
  ['other-work-page-10', 'STAR LAB 小程序'],
  ['other-work-page-14', '大牌拿手菜小程序'],
]

export function MoreWorksContent() {
  return <div className="other-works-pages" aria-label="更多作品完整展示">
    {moreWorksPages.map((label, index) => <section id={`other-work-page-${index + 1}`} className="other-works-page" key={label} aria-label={label}>
      <img src={`/assets/cases/other-works/page-${String(index + 1).padStart(2, '0')}.jpg`} width={1920} height={1080} alt={label} loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
    </section>)}
  </div>
}
