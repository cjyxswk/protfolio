import { experiences } from '../data/portfolio'
import { Star } from 'lucide-react'

export function Experience() {
  return <section className="work-experience" aria-labelledby="work-experience-title">
    <header className="experience-heading" data-reveal>
      <p lang="en">WORK EXPERIENCE</p>
      <h3 id="work-experience-title">工作经历</h3>
    </header>
    <div className="experience-grid" data-reveal>
      {experiences.map((item, index) => <article className="experience-entry" key={item.company}>
        <p className="experience-period">
          <Star className="experience-node" aria-hidden="true" style={{ transitionDelay: `${index * 100 + 100}ms` }} />
          <span className="experience-dates"><time dateTime={item.startDate}>{item.startDate.replace('-', '.')}</time><span aria-hidden="true"> — </span><time dateTime={item.endDate}>{item.endDate.replace('-', '.')}</time></span>
        </p>
        <div className="experience-identity" data-reveal style={{ transitionDelay: `${index * 100}ms` }}>
          <h4 className="experience-company">{item.company}</h4>
          <p className="experience-role">{item.title}</p>
        </div>
        <p className="experience-description" data-reveal style={{ transitionDelay: `${index * 100 + 100}ms` }}>{item.brief}</p>
        <ul className="experience-tags" aria-label={`${item.company}专业能力`} data-reveal style={{ transitionDelay: `${index * 100 + 200}ms` }}>
          {item.tags.map(tag => <li key={tag}>{tag}</li>)}
        </ul>
      </article>)}
    </div>
  </section>
}
