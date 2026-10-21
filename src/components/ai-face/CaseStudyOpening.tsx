import { ArrowDown } from 'lucide-react'
import { PhoneFrame } from './PhoneFrame'
import { FunctionArchitecture } from './FunctionArchitecture'

function ChapterTitle({ title, english }: { number: string; title: string; english: string }) {
  return <header className="af-poster-heading"><div><h2>{title}</h2><p>{english}</p></div></header>
}


function AccentWave({ side }: { side: 'left' | 'right' }) {
  const id = `af-wave-${side}`
  return <svg className={`af-accent-wave af-accent-wave-${side}`} viewBox="0 0 100 24" fill="none" aria-hidden="true"><defs><linearGradient id={id} x1="0" y1="12" x2="100" y2="12" gradientUnits="userSpaceOnUse"><stop stopColor="#FFE528" /><stop offset=".48" stopColor="#D3F483" /><stop offset="1" stopColor="#92F6DD" /></linearGradient></defs><path d="M4 15 C17 11 29 8 39 11 C46 13 46 19 52 17 C58 15 59 7 65 9 C72 12 73 17 82 15 L96 12" stroke={`url(#${id})`} strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
}

export function CaseStudyOpening({ onExplore }: { onExplore: () => void }) {
  return <>
    <section id="af-hero" className="af-poster-cover">
      <div className="af-wrap">
        <div className="af-cover-title"><p>让每张照片，拥有新的表达。</p><h1>AI Face</h1><div className="af-cover-subtitle"><AccentWave side="left" /><span>TURN A PHOTO INTO A NEW ART STYLE</span><AccentWave side="right" /></div></div>
        <div className="af-cover-devices" aria-label="AI Face 首页与创作界面展示">
          <span className="af-cover-sticker af-sticker-left"># 发现你的风格</span>
          <div className="af-cover-phone af-cover-phone-back"><PhoneFrame screen="home" eager device /></div>
          <div className="af-cover-phone af-cover-phone-front"><PhoneFrame screen="create" eager device /></div>
          <span className="af-cover-sticker af-sticker-right"># 创作你的表达</span>
          <span className="af-cover-watermark" aria-hidden="true">CREATE YOURSELF.</span>
        </div>
      </div>
      <figure className="af-cover-mascot"><span className="af-mascot-hello" aria-hidden="true">Hi!</span><img src="/assets/ai-face/mascot-wave-v1.png" alt="AI Face 粉色短发女孩挥手打招呼" width={1280} height={1280} /></figure>
      <div className="af-cover-gradient" aria-hidden="true" />
    </section>

    <section id="af-overview" className="af-poster-overview">
      <svg className="af-overview-arrow" viewBox="0 0 320 280" fill="none" aria-hidden="true"><path d="M178 32 C149 4 66 0 43 27 C16 59 57 88 63 124 C70 157 70 195 51 192 C25 188 26 166 60 166 C127 165 221 192 289 212 M270 197 L290 212 L265 215" stroke="currentColor" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" /></svg>
      <div className="af-wrap">
        <header className="af-overview-title"><span aria-hidden="true">Project overview</span><h2>项目介绍</h2></header>
        <p className="af-overview-statement"><strong>AI Face</strong> 是一款围绕照片风格化展开的移动端产品，<br className="af-desktop-break" />让用户从一张照片出发，探索属于自己的艺术表达。</p>
        <div className="af-overview-narrative"><p>从浏览风格模板、上传与裁剪照片，到调整比例与相似度，再到生成、保存与分享，将分散的操作串联成一条<strong>直观、轻量、可控</strong>的创作路径。</p><p>本次设计聚焦产品体验规划、信息架构、视觉界面与生成状态设计，让用户能够<strong>看见效果、理解操作、感知进度</strong>，并自然地完成作品使用与传播。</p></div>
        <dl className="af-overview-meta">{[['项目类型', '0–1 产品设计'], ['使用平台', 'Mobile App'], ['产品方向', 'AI Image-to-Image'], ['设计范围', '设计/动效']].map(([label, value]) => <div key={label}><dt>{label}</dt><dd>{value}</dd></div>)}</dl>
        <button className="af-poster-next" onClick={onExplore} aria-label="查看功能架构"><span /><span /><span /><ArrowDown size={30} aria-hidden="true" /></button>
        <div id="af-features">
        <ChapterTitle number="01" title="特色 · 功能" english="Special features" />
        <ul className="af-feature-pills">{['风格模板探索', '照片上传与裁剪', '多比例画面选择', '相似度自由调整', '生成进度反馈', '原图与效果对比', '作品保存与分享', '广告移除入口'].map(item => <li key={item}>{item}</li>)}</ul>
        </div>
      </div>
    </section>

    <FunctionArchitecture />

    <section id="af-analysis" className="af-poster-section af-poster-paper"><div className="af-wrap">
      <ChapterTitle number="03" title="用户 · 分析" english="User analysis" />
      <p className="af-poster-intro af-persona-intro">AI Face 聚焦年轻用户的 AI 图像创作需求，以风格转换与局部编辑为核心，覆盖社交分享、个性头像、艺术创作等场景。用户更关注创作效率、风格多样性及生成效果的可控性，希望通过简单操作完成个性化视觉表达。</p>
      <div className="af-user-analysis-layout">
        <div className="af-user-bars">
          <div className="af-user-age" role="group" aria-label="核心用户年龄：18–35 岁，年轻视觉创作用户">
            <span className="af-user-chart-label">核心用户年龄</span>
            <h3>18–35 岁</h3>
            <div className="af-user-age-bar" aria-hidden="true"><span /></div>
            <p>年轻视觉创作用户</p>
          </div>
          <div className="af-user-needs" role="group" aria-label="核心创作需求：Styles 风格转换与 Brush 局部编辑，两部分等宽，不代表统计占比">
            <span className="af-user-chart-label">核心创作需求</span>
            <div className="af-user-needs-titles"><h3>Styles</h3><h3>Brush</h3></div>
            <div className="af-user-needs-bar" aria-hidden="true"><span /><span /></div>
            <div className="af-user-needs-captions"><p>风格转换 · 快速创作</p><p>局部编辑 · 个性表达</p></div>
          </div>
        </div>
        <div className="af-user-personas">
          {[
            { title: '年轻社交爱好者', portrait: 'persona-woman-v1.png', description: '热衷社交媒体，喜欢动漫、插画及潮流艺术风格，希望通过 AI 将日常照片转化为具有个人特色的视觉作品。', pain: '传统修图耗时，风格选择困难，生成效果难以预期，希望快速完成创作并分享。' },
            { title: '创意内容创作者', portrait: 'persona-man-v1.png', description: '关注图片创作与个性化表达，经常制作头像、社交素材和创意图片，希望自由调整画面细节。', pain: '整图生成难以精细控制局部效果，反复修改成本高，希望保留主体，通过涂抹与描述精准调整细节。' },
          ].map((persona, index) => <article className="af-user-persona" key={persona.title}>
            <div className="af-user-avatar"><img src={`/assets/ai-face/${persona.portrait}`} alt={index === 0 ? '欧美卡通年轻女性头像' : '欧美卡通年轻男性头像'} width={1254} height={1254} loading="lazy" /></div>
            <span className="af-user-persona-number">用户画像 0{index + 1}</span>
            <h3>{persona.title}</h3>
            <p>{persona.description}</p>
            <div className="af-user-persona-pain"><h4>痛点</h4><p>{persona.pain}</p></div>
          </article>)}
        </div>
      </div>
    </div></section>

    <section id="af-competitive" className="af-poster-section af-poster-competitive"><div className="af-wrap">
      <ChapterTitle number="04" title="竞品 · 思考" english="Competitive thinking" />
      <p className="af-poster-intro">以 OJO、AI Mirror 与 ARTA 为参照，从热门风格供给、创作入口与编辑能力三个维度，思考 AI Face 如何连接「快速出图」与「个性化表达」。</p>
      <div className="af-comparison af-competitor-comparison" role="table" aria-label="OJO、AI Mirror 与 ARTA 产品对比及 AI Face 设计启发"><div className="af-comparison-head" role="row"><span role="columnheader">参考产品</span><span role="columnheader">产品定位</span><span role="columnheader">核心能力</span><span role="columnheader">对 AI Face 的设计启发</span></div>{[
        { name: 'OJO', en: 'AI Photo Video Generator', url: 'https://apps.apple.com/us/app/ojo-ai-photo-video-generator/id6759795504', positioning: '社交趋势与人像创作', capabilities: '热门风格、人像造型、AI 特效', response: '以热门效果图引导风格探索。' },
        { name: 'AI Mirror', en: 'AI Photo Editor', url: 'https://apps.apple.com/us/app/ai-mirror-ai-photo-editor/id6444888896', positioning: '照片风格化与局部编辑', capabilities: '动漫滤镜、Magic Brush、背景替换', response: '整图转换与局部编辑分设入口。' },
        { name: 'ARTA', en: 'AI Photo Generator', url: 'https://apps.apple.com/us/app/ai-photo-generator-arta/id1642969698', positioning: 'AI 生成与综合图片编辑', capabilities: '文字生图、照片生成、元素替换', response: '集中呈现关键设置，简化创作流程。' },
      ].map(({ name, url, positioning, capabilities, response }) => <div role="row" key={name}><span role="cell" className="af-comparison-name"><a href={url} target="_blank" rel="noreferrer" aria-label={`查看 ${name} 的 App Store 介绍`}><img className="af-competitor-logo" src={`/assets/ai-face/${name.toLowerCase().replaceAll(' ', '-')}-logo.jpg`} alt={`${name} Logo`} width={80} height={80} loading="lazy" /></a></span><span role="cell">{positioning}</span><span role="cell">{capabilities}</span><span role="cell">{response}</span></div>)}</div>
    </div></section>
  </>
}
