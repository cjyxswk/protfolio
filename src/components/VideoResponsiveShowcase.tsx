import '../video-responsive-showcase.css'

export function VideoResponsiveShowcase() {
  return <section className="responsive-showcase" aria-label="多端适配与产品界面展示">
    <section className="responsive-logic" aria-labelledby="responsive-logic-title">
      <h3 id="responsive-logic-title">多端适配</h3>
      <h4 className="responsive-statement">同一套创作逻辑，在不同屏幕自由展开。</h4>
      <div className="responsive-wireframes">
        <figure>
          <svg viewBox="0 0 560 320" role="img" aria-label="PC 浏览器创作界面示意">
            <rect x="1" y="1" width="558" height="318" rx="10" className="wire-device" />
            <rect x="5" y="5" width="550" height="310" rx="7" className="wire-screen" />
            <path d="M12 5H548Q555 5 555 12V33H5V12Q5 5 12 5Z" className="wire-chrome" />
            <rect x="65" y="11" width="195" height="13" rx="5" className="wire-block" />
            <circle cx="16" cy="17" r="3" /><circle cx="28" cy="17" r="3" /><circle cx="40" cy="17" r="3" />
            <rect x="19" y="52" width="161" height="248" rx="4" className="wire-outline" />
            <rect x="35" y="70" width="129" height="25" rx="3" className="wire-block" />
            <rect x="35" y="109" width="129" height="91" rx="3" className="wire-block" />
            <rect x="35" y="214" width="129" height="43" rx="3" className="wire-block" />
            <rect x="35" y="270" width="129" height="24" rx="4" className="wire-cta" />
            <rect x="199" y="52" width="341" height="211" rx="4" className="wire-outline" />
            <rect x="216" y="69" width="307" height="177" rx="4" className="wire-preview" />
            <circle cx="369.5" cy="157.5" r="30" className="wire-play-halo" />
            <path d="M-5-12Q-8-14-8-10V10Q-8 14-5 12L14 2Q18 0 14-2Z" transform="translate(369.5 157.5)" className="wire-play-icon" />
            <path d="M49 81h63M49 227h92M49 240h58" className="wire-detail" />
            <path d="m77 166 18-22 13 15 12-9 29 34H49Z" className="wire-landscape" />
            <rect x="199" y="278" width="94" height="21" rx="3" className="wire-block" />
          </svg>
          <figcaption><span>PC 端</span><strong>分区协作，一览全局</strong></figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 426 320" role="img" aria-label="iPad 横向双区布局示意">
            <rect x="1" y="1" width="424" height="318" rx="22" className="wire-device" />
            <rect x="9" y="9" width="408" height="302" rx="15" className="wire-screen" />
            <circle cx="213" cy="20" r="3" className="wire-camera" />
            <rect x="18" y="43" width="140" height="259" rx="4" className="wire-outline" />
            <rect x="30" y="56" width="116" height="27" rx="3" className="wire-block" />
            <rect x="30" y="96" width="116" height="96" rx="3" className="wire-block" />
            <path d="m68 158 17-22 13 15 12-9 24 34H43Z" className="wire-landscape" />
            <rect x="30" y="205" width="116" height="46" rx="3" className="wire-block" />
            <path d="M40 69h64M40 220h75M40 235h51" className="wire-detail" />
            <rect x="30" y="270" width="116" height="24" rx="4" className="wire-cta" />
            <rect x="172" y="43" width="236" height="209" rx="4" className="wire-outline" />
            <rect x="184" y="55" width="212" height="185" rx="4" className="wire-preview" />
            <circle cx="290" cy="147.5" r="30" className="wire-play-halo" />
            <path d="M-5-12Q-8-14-8-10V10Q-8 14-5 12L14 2Q18 0 14-2Z" transform="translate(290 147.5)" className="wire-play-icon" />
            <rect x="172" y="266" width="236" height="36" rx="3" className="wire-block" />
            <path d="M185 279h93M185 290h60" className="wire-detail" />
            <rect x="180" y="305" width="66" height="3" rx="1.5" className="wire-hardware" />
          </svg>
          <figcaption><span>iPad</span><strong>双区联动，灵活创作</strong></figcaption>
        </figure>
        <figure>
          <svg viewBox="0 0 160 320" role="img" aria-label="移动端创作界面示意">
            <rect x="1" y="1" width="158" height="318" rx="26" className="wire-device" />
            <rect x="7" y="7" width="146" height="306" rx="21" className="wire-screen" />
            <rect x="54" y="11" width="52" height="13" rx="6.5" className="wire-notch" />
            <rect x="66" y="16" width="21" height="3" rx="1.5" className="wire-hardware" />
            <circle cx="96" cy="17.5" r="2" className="wire-camera" />
            <rect x="15" y="50" width="130" height="30" rx="3" className="wire-block" />
            <rect x="15" y="94" width="130" height="88" rx="3" className="wire-outline" />
            <rect x="24" y="103" width="112" height="70" rx="3" className="wire-preview" />
            <circle cx="80" cy="138" r="20" className="wire-play-halo" />
            <path d="M-5-12Q-8-14-8-10V10Q-8 14-5 12L14 2Q18 0 14-2Z" transform="translate(80 138) scale(.68)" className="wire-play-icon" />
            <rect x="15" y="196" width="130" height="63" rx="3" className="wire-block" />
            <path d="M27 64h75M27 211h96M27 224h80M27 237h55" className="wire-detail" />
            <rect x="15" y="270" width="130" height="24" rx="4" className="wire-cta" />
            <rect x="54" y="305" width="52" height="3" rx="1.5" className="wire-hardware" />
          </svg>
          <figcaption><span>移动端</span><strong>单列聚焦，轻松创作</strong></figcaption>
        </figure>
      </div>
    </section>
    <section className="responsive-results" aria-labelledby="responsive-results-title">
      <h3 id="responsive-results-title">视觉展示</h3>
      <figure className="responsive-visual-overview">
        <img src="/assets/cases/ai-image-to-video/product-visual-overview.png" width="1920" height="1200" alt="AI Image to Video 产品视觉全览，包含创作工作台、首页、联盟计划、订阅方案与登录界面" loading="lazy" decoding="async" />
      </figure>
    </section>
  </section>
}
