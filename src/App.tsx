import { useEffect, useState } from 'react'
import { ArrowUpRight, Check, Copy } from 'lucide-react'
import { portfolio, projectBySlug } from './data/portfolio'
import { site, labels } from './data/site'
import { CinematicHero } from './components/CinematicHero'
import { Header } from './components/Header'
import { Container } from './components/Container'
import { Education } from './components/Education'
import { about } from './data/about'
import { AboutPortrait } from './components/AboutPortrait'
import { Experience } from './components/Experience'
import { WorksGallery } from './components/WorksGallery'
import { CapabilityCards } from './components/CapabilityCards'
import { ContactBackdrop } from './components/ContactBackdrop'

const capabilities = [
  ['01', '多产品 0–1 主导能力', 'Product', '从需求分析、体验设计到上线交付，推动多个产品落地。'],
  ['02', '设计系统与规范构建', 'System', '沉淀组件、交互规范与视觉体系，提升设计一致性。'],
  ['03', 'AI 辅助设计交付', 'Ai workflow', '结合 AI Coding 工具，实现从设计稿到可交互前端页面的高效交付。'],
  ['04', '海外 App 与国际化设计', 'Global app', '熟悉海外应用体验、多语言适配及不同平台设计规范。'],
  ['05', '产品上架与迭代验收', 'Release', '熟悉应用商店上架流程、审核要求及版本更新验收。'],
]

function useReveal() {
  useEffect(() => {
    const nodes = document.querySelectorAll<HTMLElement>('[data-reveal]')
    const observer = new IntersectionObserver(entries => entries.forEach(entry => { if (entry.isIntersecting) { (entry.target as HTMLElement).dataset.reveal = 'shown'; observer.unobserve(entry.target) } }), { threshold: .12 })
    nodes.forEach(node => observer.observe(node))
    return () => observer.disconnect()
  }, [])
}

function WorkPlaceholder({ title, index }: { title: string; index: number }) {
  return <div className={`work-placeholder place-${index}`} role="img" aria-label={`${title}：待替换真实设计图`}><div className="placeholder-top"><span>0{index + 1}</span><span lang="en">Project preview</span></div><div className="placeholder-grid"><i /><i /><i /><i /></div><div className="placeholder-copy"><b>{title}</b><span>Placeholder · 待替换设计图</span></div></div>
}

function ProjectMedia({ slug, title, index }: { slug: string; title: string; index: number }) {
  const media = site.media[slug]
  return media?.cover ? <img className="work-cover" src={media.cover} alt={media.alt || `${title} 设计界面`} loading="lazy" /> : <WorkPlaceholder title={title} index={index} />
}

function SectionTitle({ section, number }: { section: 'about' | 'works' | 'capabilities' | 'contact'; number: string }) {
  return <div className="layered-section-title" data-section-number={number}>
    <span className="section-title-backdrop" aria-hidden="true">{section === 'contact' ? 'CONTACT' : labels.sections[section][0]}</span>
    <h2 className="section-title">{section === 'contact' ? '联系我' : labels.sections[section][1]}</h2>
  </div>
}

function About() {
  return <Container as="section" className="section about" data-section="about">
    <div id="about" className="section-heading-anchor"><div className="section-heading" data-reveal><SectionTitle section="about" number="01" /></div></div>
    <div className="about-top">
      <AboutPortrait />
      <div className="about-copy about-profile">
        <div data-reveal>
          <h3>{about.headline}</h3>
        </div>
        <p className="about-introduction" data-reveal>{about.introduction}</p>
        <div className="about-results">
          <ul className="about-advantages" aria-label="个人优势">
            {about.advantages.map((item, index) => <li key={item.label} data-reveal style={{ transitionDelay: `${index * 100}ms` }}>
              <article className="advantage-card">
                <p className="advantage-value">{item.value}</p>
                <h4>{item.label}</h4>
              </article>
            </li>)}
          </ul>
        </div>
        <div data-reveal><Education /></div>
      </div>
    </div>
    <Experience />
  </Container>
}


function Works() { return <Container as="section" className="section works" data-section="works"><div id="works" className="section-heading-anchor"><div className="section-heading works-heading" data-reveal><div><SectionTitle section="works" number="02" /></div></div></div><WorksGallery /></Container> }


function Capabilities() { return <Container as="section" className="section capabilities" data-section="skills"><div id="skills" className="section-heading-anchor"><div className="section-heading" data-reveal><SectionTitle section="capabilities" number="03" /></div></div><CapabilityCards items={capabilities} /></Container> }

function Contact() {
  const [status, setStatus] = useState<'idle' | 'success' | 'error'>('idle')
  const [phoneStatus, setPhoneStatus] = useState<'idle' | 'success' | 'error'>('idle')
  useEffect(() => {
    if (phoneStatus === 'idle') return
    const timer = window.setTimeout(() => setPhoneStatus('idle'), 3000)
    return () => window.clearTimeout(timer)
  }, [phoneStatus])
  useEffect(() => {
    if (status === 'idle') return
    const timer = window.setTimeout(() => setStatus('idle'), 3000)
    return () => window.clearTimeout(timer)
  }, [status])
  const email = portfolio.person.email
  const phone = '13522772293'
  const copyPhone = async () => { try { await navigator.clipboard.writeText(phone); setPhoneStatus('success') } catch { setPhoneStatus('error') } }
  const copy = async () => { try { await navigator.clipboard.writeText(email); setStatus('success') } catch { setStatus('error') } }
  return <Container as="section" className="contact contact-invitation" data-section="contact">
    <div id="contact" className="section-heading-anchor"><div className="section-heading" data-reveal><SectionTitle section="contact" number="04" /></div></div>
    <div className="contact-invitation-body" data-reveal>
      <div><h3 className="contact-invitation-title">下一个好项目，<br /><span>一起创造。</span></h3><p className="contact-invitation-description">有想法？刚好，我有办法。</p><p className="contact-invitation-description">聊聊你的项目，也许下一个精彩作品就从这里开始。</p></div>
    </div>
    <div className="contact-email-area" data-reveal>
      <span className="contact-email-label" lang="en">Email</span>
      {email ? <><div className="contact-email-row"><span className="contact-email-address">{email}</span><button className="contact-email-copy" type="button" onClick={copy} aria-label={status === 'success' ? '邮箱已复制' : '复制邮箱'}>{status === 'success' ? <Check aria-hidden="true"/> : <Copy aria-hidden="true"/>}</button></div><span className="contact-copy-status" role="status">{status === 'error' ? '复制失败，请选择上方邮箱手动复制。' : ''}</span></> : <p>请在网站配置中填写联系邮箱。</p>}
      <div className="contact-phone-area">
        <span className="contact-email-label" lang="en">Phone / Wechat</span>
        <div className="contact-phone-row"><span className="contact-email-address">{phone}</span><button className="contact-email-copy" type="button" onClick={copyPhone} aria-label={phoneStatus === 'success' ? '手机号已复制' : '复制手机号'}>{phoneStatus === 'success' ? <Check aria-hidden="true"/> : <Copy aria-hidden="true"/>}</button></div>
        <span className="contact-copy-status" role="status">{phoneStatus === 'error' ? '复制失败，请选择上方手机号手动复制。' : ''}</span>
      </div>
      {Object.entries(site.links).filter(([,url])=>url).map(([label,url])=><a key={label} href={url}>{label} ↗</a>)}
    </div>
  </Container>
}

function CasePage({ slug }: { slug: string }) { const project = projectBySlug(slug); if (!project) return <main className="case-page"><a href="/#works">← 返回作品</a><h1>项目暂未找到。</h1></main>; return <main className="case-page"><Container as="header"><a className="wordmark" href="/#home">闫伟平<span lang="en">UI/UX Designer</span></a><a href="/#works">← 返回作品</a></Container><Container as="section"><p className="case-meta">{project.category} / {project.stage} / {project.period.replace(/—/g, " — ")}</p><h1>{project.title}</h1><p className="case-summary">{project.summary}</p><ProjectMedia slug={project.slug} title={project.title} index={0} /><div className="case-info"><div><span lang="en">My Role / 我的职责</span><b>{project.role}</b></div><div><span lang="en">Overview / 项目背景</span><p>{project.scope}</p></div></div><div className="case-list"><h2><small lang="en">Process</small>设计重点</h2>{project.focus.map(item => <p key={item}>— {item}</p>)}</div>{project.results.length > 0 && <div className="case-list"><h2><small lang="en">Outcome</small>成果</h2>{project.results.map(item => <p key={item}>— {item}</p>)}</div>}{'subcases' in project && project.subcases?.map(item => <div className="case-list" key={item.name}><h2>{item.name}</h2><p>{item.period} · {item.role}</p><p>{item.scope}</p>{item.results.map(result => <p key={result}>{result}</p>)}</div>)}<div className="case-gallery">{site.media[slug]?.images?.map(src=><img key={src} src={src} alt={`${project.title} 代表界面`} loading="lazy" />)}</div><p className="pending">详细过程与真实界面图待补充后展示。</p><a className="next-case" href={`/projects/${portfolio.projects[(portfolio.projects.findIndex(item=>item.slug===slug)+1)%portfolio.projects.length].slug}`}>下一项目 <ArrowUpRight /></a></Container></main> }

export default function App() { useReveal(); const slug = typeof window !== 'undefined' ? window.location.pathname.match(/^\/projects\/([^/]+)$/)?.[1] : undefined; if (slug) return <CasePage slug={slug} />; return <><Header /><main id="home"><CinematicHero /><About /><Works /><Capabilities /><div className="contact-closing"><ContactBackdrop /><Contact /><Container as="footer" className="site-footer"><span lang="en">© 2026 WEIPING YAN</span><a href="#home">返回顶部 ↑</a></Container></div></main></> }
