export const automotiveProjects = {
  yijie: { name: '易捷加油', count: 18, digits: 2 },
  chejiajia: { name: '车车佳', count: 7, digits: 1 },
} as const

/** Preserve the supplied portfolio PDF pages, including their original order and layout. */
export function AutomotiveProjectContent({ project }: { project: keyof typeof automotiveProjects }) {
  const { name, count, digits } = automotiveProjects[project]
  return <div className="automotive-project-pages" role="group" aria-label={`${name} App 项目作品，共 ${count} 页`}>
    {Array.from({ length: count }, (_, index) => {
      const page = index + 1
      return <img key={page} id={`project-page-${page}`} src={`/assets/cases/${project}/page-${String(page).padStart(digits, '0')}.jpg`}
        alt={`${name} App 项目作品，第 ${page} 页，共 ${count} 页`}
        width="1920" height="1080" loading={index === 0 ? 'eager' : 'lazy'} decoding="async" />
    })}
  </div>
}
