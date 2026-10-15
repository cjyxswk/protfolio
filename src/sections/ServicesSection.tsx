import { FadeIn } from '../components/FadeIn';import { services } from '../data/services'
export function ServicesSection(){return <section className="services3d"><h2>CAPABILITIES</h2><div>{services.map(([name,text],i)=><FadeIn key={name} delay={i*.1}><article><b>{String(i+1).padStart(2,'0')}</b><div><h3>{name}</h3><p>{text}</p></div></article></FadeIn>)}</div></section>}
