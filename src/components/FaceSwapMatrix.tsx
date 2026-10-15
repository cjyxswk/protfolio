import { ArrowUpRight } from 'lucide-react'

const products = [
  { name: 'Deep Swap AI', url: 'https://deepswapai.io/', image: '/assets/cases/face-swap/deep-swap-ai.png' },
  { name: 'AI Face Swap Video', url: 'https://aifaceswapvideo.online/', image: '/assets/cases/face-swap/ai-face-swap-video.png' },
  { name: 'Face Swap AI', url: 'https://faceswapai.online/', image: null },
  { name: 'Beauty AI', url: 'https://beautyai.fun/', image: null },
]

export function FaceSwapMatrix() {
  return <div className="face-swap-matrix" aria-label="Face Swap 四个线上产品">
    {products.map(product => <article className="face-swap-product" key={product.name}>
      <div className="face-swap-product-image">
        {product.image && <img src={product.image} alt={`${product.name}网站设计稿`} loading="lazy" />}
      </div>
      <div className="face-swap-product-footer"><h2>{product.name}</h2><a href={product.url} target="_blank" rel="noopener noreferrer" aria-label={`查看 ${product.name} 线上产品（新标签页）`}>查看线上产品 <ArrowUpRight size={18} aria-hidden="true" /></a></div>
    </article>)}
  </div>
}
