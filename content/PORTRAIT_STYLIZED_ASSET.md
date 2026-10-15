# About portrait replacement

- Visible asset: `/Users/xiaoxiao/Desktop/作品集/public/assets/about-portrait-stylized.png`
- Original supplied image copied unchanged from `/Users/xiaoxiao/Downloads/f6e94cbe-e767-4c1c-87cb-ef76447522b4.png`.
- Occlusion asset: `/Users/xiaoxiao/Desktop/作品集/public/assets/about-portrait-stylized-mask.png`
- Method: built-in imagegen, transparent-background edit. Only its alpha channel is used by CSS; generated RGB pixels are never displayed.
- Existing portrait assets retained for recovery. Avatar, layout and skill interactions unchanged.

## Final mask prompt

Use case: background-extraction. Edit target: supplied 1024x1536 portrait. Remove ONLY the black background to actual transparency, preserving the entire woman, all hair strands, jacket, hands, laptop, and all original pixels and proportions. Exact same canvas and framing, 2:3 portrait. Do not move, resize, redraw or restyle the subject; do not change face, expression, pose or clothing. This output is used solely as an alpha occlusion mask aligned over the original image in a website; therefore exact silhouette position/alignment is critical. No shadows or new elements outside subject.
