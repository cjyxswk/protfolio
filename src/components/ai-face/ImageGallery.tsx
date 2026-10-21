import { useRef } from 'react'
import { X, Maximize2 } from 'lucide-react'
import { asset, promos } from './data'

export function ImageGallery() {
  const dialog = useRef<HTMLDialogElement>(null)
  const image = useRef<HTMLImageElement>(null)
  const open = (index: number) => {
    if (!dialog.current || !image.current) return
    image.current.src = asset(promos[index].name)
    image.current.alt = promos[index].alt
    dialog.current.showModal()
  }
  return <>
    <div className="af-promo-gallery" aria-label="AI Face 真实市场宣传素材">{promos.map((item, i) => <figure key={item.name}><button onClick={() => open(i)} aria-label={`放大查看${item.title}宣传图`}><img src={asset(item.name)} width={946} height={2048} alt={item.alt} loading="lazy" /><span><Maximize2 size={16} aria-hidden="true" />查看原图</span></button><figcaption><span>0{i + 1}</span>{item.title}</figcaption></figure>)}</div>
    <dialog ref={dialog} className="af-lightbox" aria-label="宣传素材原图预览" onCancel={event => event.stopPropagation()} onClick={event => { if (event.target === event.currentTarget) dialog.current?.close() }}>
      <button className="af-lightbox-close" aria-label="关闭图片预览" onClick={() => dialog.current?.close()}><X size={24} /></button><img ref={image} alt="" />
    </dialog>
  </>
}
