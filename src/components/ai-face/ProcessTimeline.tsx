import { journeyScreens } from './data'
import { PhoneFrame } from './PhoneFrame'

export function ProcessTimeline() {
  return <div className="af-process">
    <div className="af-journey-screens">{journeyScreens.map((item, i) => <article key={item.screen}><PhoneFrame screen={item.screen} device /><p className="af-eyebrow">0{i + 1} / {item.title}</p><p>{item.detail}</p></article>)}</div>
  </div>
}
