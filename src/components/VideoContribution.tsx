import { useEffect, useRef, useState } from 'react'
import { motion, useReducedMotion, type Variants } from 'framer-motion'
import { ProjectConstellation } from './ProjectConstellation'
import '../video-contribution-orbit.css'

const contributions = [
  ['需求洞察', 'Research', '#B8F807'],
  ['产品定义', 'Product', '#8FD653'],
  ['体验设计', 'Experience', '#D4F97C'],
  ['视觉与系统设计', 'Visual & System', '#9BCE43'],
  ['设计验证', 'Validation', '#6EBB63'],
  ['交付落地', 'Delivery', '#B2E77D'],
]
const orbits = [
  { d: 'M530 360 C760 210 450 70 330 100 C200 150 350 380 530 360', x: 330, y: 100 },
  { d: 'M530 360 C660 190 1040 -10 880 130 C780 280 650 320 530 360', x: 880, y: 130 },
  { d: 'M530 360 C740 190 940 200 1000 350 C1050 530 710 500 530 360', x: 1000, y: 350 },
  { d: 'M530 360 C850 60 1160 420 850 600 C670 700 480 550 530 360', x: 850, y: 600 },
  { d: 'M530 360 C680 540 350 790 150 650 C70 580 370 355 530 360', x: 150, y: 650 },
  { d: 'M530 360 C520 100 140 110 45 285 C-25 425 340 570 530 430 C565 405 555 380 530 360', x: 45, y: 285 },
]
const nodeVariants: Variants = {
  hidden: { opacity: 0, y: 50 },
  visible: { opacity: 1, y: 0, transition: { duration: .9, ease: [.22, 1, .36, 1] } },
}
const containerVariants: Variants = {
  hidden: {},
  visible: { transition: { staggerChildren: .3 } },
}
const curveVariants: Variants = {
  hidden: { pathLength: 0 },
  visible: { pathLength: 1, transition: { duration: 3, ease: [.22, 1, .36, 1] } },
}
const instantVariants: Variants = { hidden: {}, visible: { opacity: 1, y: 0, pathLength: 1, transition: { duration: 0 } } }

export function VideoContribution() {
  const journeyRef = useRef<HTMLDivElement>(null)
  const [entered, setEntered] = useState(false)
  const reduceMotion = useReducedMotion()

  useEffect(() => {
    if (entered || reduceMotion) return
    // If a fast scroll skips the intersection threshold, still complete the
    // one-shot animation offscreen rather than leaving hidden nodes behind.
    const completeSkippedEntry = () => {
      if (journeyRef.current && journeyRef.current.getBoundingClientRect().bottom <= 0) setEntered(true)
    }
    completeSkippedEntry()
    window.addEventListener('scroll', completeSkippedEntry, { passive: true })
    return () => window.removeEventListener('scroll', completeSkippedEntry)
  }, [entered, reduceMotion])

  return <section id="video-contribution" className="video-contribution" aria-labelledby="video-contribution-title">
    <header className="video-chapter-heading">
      <h2 id="video-contribution-title"><span className="video-chapter-chinese">我做了什么</span><span className="video-chapter-script" lang="en" aria-hidden="true">What I Did</span></h2>
    </header>
    <p className="video-contribution-intro">项目整体流程涵盖以下阶段：需求洞察 → 产品定义 → 体验设计 → 视觉与系统设计 → 设计验证 → 交付落地</p>
    <motion.div ref={journeyRef} className="contribution-orbit" initial={reduceMotion ? false : 'hidden'} animate={entered || reduceMotion ? 'visible' : undefined} whileInView="visible" viewport={{ once: true, amount: .2 }} onViewportEnter={() => setEntered(true)}>
      <ProjectConstellation variant="section" />
      <svg className="contribution-orbit-art" viewBox="0 0 1200 720" fill="none" aria-hidden="true">
        <defs>
          <radialGradient id="contribution-planet"><stop stopColor="#254C16"/><stop offset=".62" stopColor="#102F16"/><stop offset=".88" stopColor="#4D8C20"/><stop offset="1" stopColor="#B8F807"/></radialGradient>
          <linearGradient id="contribution-ribbon"><stop stopColor="#518C35" stopOpacity=".1"/><stop offset=".48" stopColor="#D5FF87"/><stop offset=".74" stopColor="#A6F550"/><stop offset="1" stopColor="#61B83F" stopOpacity=".25"/></linearGradient>
          <filter id="contribution-halo" x="-100%" y="-100%" width="300%" height="300%"><feGaussianBlur stdDeviation="12"/></filter>
          <clipPath id="contribution-sphere-clip"><circle cx="530" cy="360" r="119"/></clipPath>
        </defs>
        <g transform="translate(70 0)">
        {orbits.map((orbit, i) => <g key={contributions[i][0]}>
          <motion.path variants={reduceMotion ? instantVariants : curveVariants} d={orbit.d} stroke={contributions[i][2]} strokeWidth="1.4" opacity=".65"/>
          <circle cx={orbit.x} cy={orbit.y} r="23" fill={contributions[i][2]} opacity=".32" filter="url(#contribution-halo)"/>
          <circle cx={orbit.x} cy={orbit.y} r="8" fill={contributions[i][2]}/>
        </g>)}
        <circle cx="530" cy="360" r="132" fill="#A0DD36" opacity=".22" filter="url(#contribution-halo)"/>
        <circle cx="530" cy="360" r="120" fill="url(#contribution-planet)" stroke="#B8F807" strokeOpacity=".65"/>
        <g className="contribution-core-ribbons" clipPath="url(#contribution-sphere-clip)">
          {Array.from({length: 14}, (_, i) => <ellipse key={i} cx="530" cy="360" rx={65 + i * 3.8} ry={112 - i * 4} transform={`rotate(${i * 11 - 65} 530 360)`} stroke="url(#contribution-ribbon)" strokeWidth={i % 3 === 0 ? 2.5 : .8} opacity={i % 3 === 0 ? .9 : .4}/>)}
        </g>
        <ellipse cx="530" cy="360" rx="132" ry="75" transform="rotate(-35 530 360)" stroke="url(#contribution-ribbon)" strokeWidth="3"/>
        </g>
      </svg>
      <motion.ol className="contribution-orbit-labels" aria-label="六项设计工作" variants={reduceMotion ? instantVariants : containerVariants}>{contributions.map(([title, english]) => <motion.li variants={reduceMotion ? instantVariants : nodeVariants} key={title}>
        <span lang="en">{english}</span><h3>{title}</h3>
      </motion.li>)}</motion.ol>
    </motion.div>
  </section>
}
