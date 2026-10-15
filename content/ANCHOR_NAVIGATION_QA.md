# 标题锚点定位修复与验证

## 根因

- 旧 ID 在带 64–140px 顶部 padding 的 Section 外层，CSS 导航偏移叠加后，定位基准不是标题，产生过多空白。
- 标题的 Reveal transform 会改变 getBoundingClientRect 坐标，不能把动画节点作为定位依据。
- main.tsx 曾在刷新时强制替换为 #home，与本次“按 Hash 恢复”的要求冲突。
- Header 挂载时 scrollIntoView、原生 Hash 跳转和 CSS scroll-margin 分散管理；旧能力 ID 为 #capabilities。

## 当前方案

- 唯一目标为 #home / #about / #works / #skills / #contact，每个 ID 只出现一次。
- 非首页 ID 位于 section-heading-anchor 稳定包装层，Reveal 仅在内层。正常 Section 留白与视觉布局保留。
- src/hooks/useSectionNavigation.ts 是唯一首页滚动控制器，委托处理导航、首页 CTA、页脚的有效同页锚点。
- 使用 JS 精确坐标 + window.scrollTo。读取无入场 transform 的 data-site-navbar 外层 bottom；PC 安全间距 28px，手机 20px。目标位置限制在浏览器最大可滚动范围。
- CSS scroll-margin / scroll-padding 归零，CSS scroll-behavior 设为 auto；平滑与减少动态效果仅由控制器选择。
- pushState 更新点击 Hash，不再触发原生第二次锚点滚动；popstate/hashchange 合并处理。刷新不再强制改为首页。
- 首次深链在字体 ready 后一次定位，不使用图片加载后反复校正或定时重复滚动。
- Active 由实际标题位置和页底状态判断。平滑滚动期间只高亮目标，结束后恢复实时判断；用户滚轮和触摸仍由浏览器原生处理。
- 兼容旧 #capabilities 深链，规范化为 #skills。

## 浏览器实测

修改文件：src/hooks/useSectionNavigation.ts（新增控制器）、src/App.tsx（稳定标题锚点）、src/components/Header.tsx（接入控制器）、src/data/site.ts（#skills 映射）、src/main.tsx（删除强制刷新回首页）、src/navbar.css 和 src/refinements.css（清理旧偏移）、src/anchor-navigation.css（单一策略与稳定包装层）、README.md。

桌面应用内 Chromium，视口高度 900px。间距为目标稳定包装层 top − fixed 导航外层 bottom；约 0.3px 误差来自浏览器滚动取整。

| 宽度 | 关于 | 作品 | 能力 | 联系 |
| --- | --- | --- | --- | --- |
| 1920 | 28.00 | 27.81 | 28.02 | 页底限制，101.23 |
| 1440 | 28.00 | 28.21 | 27.94 | 页底限制，135.71 |
| 1280 | 28.00 | 27.98 | 27.75 | 页底限制，173.49 |
| 1024 | 28.00 | 28.03 | 27.97 | 页底限制，241.27 |
| 768 | 28.00 | 28.13 | 27.77 | 页底限制，355.79 |
| 430 | 20.00 | 20.15 | 20.06 | 页底限制，203.51 |
| 390 | 20.00 | 20.16 | 19.81 | 页底限制，203.90 |
| 375 | 20.00 | 19.93 | 19.91 | 页底限制，224.31 |

所有宽度四个导航的 Hash、Active 与目标一致，移动菜单跳转后关闭，无横向溢出。联系因页面尾部剩余高度不足而无法再向下滚动，未增加底部空白来强行对齐，标题完整可见。

额外验证：

- 快速连续切换 关于→作品→能力，最终 #skills，间距 27.75px；再等待后 scrollY 仍为 4022，未二次跳动。
- 后退到 #works：27.98px；前进到 #skills：27.75px。
- 刷新 #works：27.98px；刷新 #about：28px，Hash 保留。
- 手动 End 到页底，Hash 与 Active 均更新为 #contact。
- 点击头像姓名返回 #home，scrollY 为 0，Hero 无菜单高亮。

未在真实 iOS Safari 或 Android 设备上执行测试；未部署。
