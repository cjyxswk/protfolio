const root = '/assets/cases/ai-image-to-video/real/'

export function VideoDesignShot({ file, title, eager = false }: { file: string; title: string; eager?: boolean }) {
  return <figure className="video-design-shot">
    <a href={`${root}${file}.png`} target="_blank" rel="noopener noreferrer" aria-label={`查看原始设计稿：${title}（新标签页）`}>
      <img src={`${root}${file}.png`} alt={title} loading={eager ? 'eager' : 'lazy'} decoding="async" />
    </a>
  </figure>
}

export function VideoWorkflowScreens() {
  return <div className="video-design-gallery" aria-label="核心流程真实设计稿">
    <VideoDesignShot file="reference-to-video" title="Reference to Video · 参考素材与模型配置" />
    <VideoDesignShot file="generating" title="生成中 · 排队进度与预计等待时间" />
    <VideoDesignShot file="results-management" title="生成结果 · 多结果预览、下载与重新编辑" />
  </div>
}

export function VideoEvolutionScreens() {
  return <div className="video-design-gallery" aria-label="完整页面真实设计稿">
    <p className="video-design-gallery-note">完整长页面设计稿 · 点击展开，查看完整页面；点击图片可查看原图。</p>
    {[
      ['homepage', '图生视频首页 · 完整创作入口与内容展示'],
      ['expanded-homepage', '功能扩展首页 · 新增 12 个功能模块'],
      ['image-generator', 'AI Image Generator · 图片生成工作台'],
      ['motion-control', 'AI Motion Control · 人物与动作模板'],
    ].map(([file, title]) => <details className="video-design-long" key={file}>
      <summary>{title}<span aria-hidden="true">＋</span></summary>
      <VideoDesignShot file={file} title={title} />
    </details>)}
  </div>
}
