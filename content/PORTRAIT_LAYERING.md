# About 人物遮挡层

当前渲染由三层组成：黑色背景 z=0；技能图标 z=1；人物原照片 z=2。

前景仍使用 public/assets/about-portrait-v2.png 的原始像素。新增的 public/assets/about-portrait-occlusion.png 只作为 CSS alpha 遮罩使用，不将生成图的脸部或服装 RGB 显示到页面。
两张图均为 1024×1536，使用相同 contain/center 对齐，人物不缩放、不平移。

透明轮廓通过内置 imagegen 编辑工具提取，原始照片保留。未使用 API 或 CLI。生成结果保存后复制到项目 public/assets/about-portrait-occlusion.png。
若更换肖像，须同步替换 portraitMask，或清空该字段并暂时停用分层效果。

最终提示词：

> Use case: background-extraction. Edit target: the provided portrait. Create an accurate transparent-background cutout of the exact same woman holding the laptop. Remove ONLY the solid black background. Preserve the face, hair, all hair wisps, body silhouette, pose, clothing, laptop, hands, lighting, colors, dimensions, relative position and full original composition. Do not retouch or redesign or regenerate the person. Keep black suit fully opaque: it is foreground, not background. Keep original full 2:3 canvas and subject alignment, no crop or reframing, no added margins, text, logos or effects. Output actual alpha transparency around the entire figure, including between hair strands. The result is a foreground occlusion layer in a website, must align with the original photo exactly.
