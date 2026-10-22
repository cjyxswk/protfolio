const categories = ['运营设计', '3D建模', 'H5活动海报', '小程序', '动效设计', '更多']

export function MoreWorksFolder() {
  return <div className="more-works-art" aria-hidden="true">
    <div className="more-folder-glow" />
    <div className="more-folder">
      <div className="more-folder-back" />
      <div className="more-folder-paper paper-one" />
      <div className="more-folder-paper paper-two" />
      <div className="more-folder-front"><span>✦</span><small>CREATIVE ARCHIVE</small></div>
    </div>
    <div className="more-folder-bubbles">{categories.map((label, index) => <span key={label} className={`folder-bubble bubble-${index}`}>{label}</span>)}</div>
  </div>
}
