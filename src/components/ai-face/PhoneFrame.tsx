import { asset, screens, type ScreenName } from './data'
import { useState } from 'react'
import { ThumbsUp, ThumbsDown } from 'lucide-react'

export function PhoneFrame({ screen, className = '', eager = false, device = true, resultArtwork }: { screen: ScreenName; className?: string; eager?: boolean; device?: boolean; resultArtwork?: string }) {
  const [feedback, setFeedback] = useState<'like' | 'dislike' | null>(null)
  const image = <img src={asset(screen)} width={750} height={1624} alt={screens[screen]} loading={eager ? 'eager' : 'lazy'} decoding="async" />
  return <figure className={`af-phone ${device ? 'af-phone-device' : ''} ${className}`} data-device={device ? 'iPhone 16 Pro Max · Titanium' : undefined}>
    {device ? <>
      <div className="af-device-screen">{image}<span className="af-device-island" aria-hidden="true"><i /></span></div>
      <span className="af-hardware-key af-hardware-action" aria-hidden="true" />
      <span className="af-hardware-key af-hardware-volume-up" aria-hidden="true" />
      <span className="af-hardware-key af-hardware-volume-down" aria-hidden="true" />
      <span className="af-hardware-key af-hardware-power" aria-hidden="true" />
    </> : resultArtwork ? <div className="af-phone-result-screen">{image}<div className="af-phone-result-art"><img src={resultArtwork} alt="黑白动漫人像生成结果" loading="lazy" /><div className="af-phone-result-votes">{([{ value: 'like', label: '点赞', Icon: ThumbsUp }, { value: 'dislike', label: '点踩', Icon: ThumbsDown }] as const).map(({ value, label, Icon }) => <button key={value} type="button" aria-label={label} aria-pressed={feedback === value} onClick={() => setFeedback(feedback === value ? null : value)}><Icon aria-hidden="true" /></button>)}</div></div></div> : image}
  </figure>
}

/** A viewport into an original asset, never a reconstructed or stretched UI. */
export function AssetCrop({ name, viewBox, label, className = '', eager = false }: { name: string; viewBox: string; label: string; className?: string; eager?: boolean }) {
  const [,, width, height] = viewBox.split(' ').map(Number)
  const promo = name.startsWith('promo')
  return <svg className={`af-asset-crop ${className}`} viewBox={viewBox} role="img" aria-label={label} style={{ aspectRatio: `${width}/${height}` }}>
    <image href={asset(name)} width={promo ? 946 : 750} height={promo ? 2048 : 1624} {...(eager ? { fetchPriority: 'high' } : {})} />
  </svg>
}
