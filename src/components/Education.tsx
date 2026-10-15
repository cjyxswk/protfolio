import { education } from '../data/education'

export function Education() {
  const { school, major, degree, startDate, endDate } = education
  if (!school && !major && !degree && !startDate && !endDate) return null
  const period = startDate && endDate ? `${startDate} — ${endDate}` : ''
  return <section className="about-education" aria-labelledby="education-title">
    <h4 id="education-title">教育背景</h4>
    <div className="education-entry">
      <div className="education-info">
        {school && <p className="education-school">{school}</p>}
        <dl className="education-details">
          {major && <div><dt>专业</dt><dd>{major}</dd></div>}
          {degree && <div>{major && <span className="education-separator" aria-hidden="true">·</span>}<dt>学历</dt><dd>{degree}</dd></div>}
        </dl>
      </div>
      {period && <p className="education-period" aria-label={`就读时间：${period}`}>{period}</p>}
    </div>
  </section>
}
