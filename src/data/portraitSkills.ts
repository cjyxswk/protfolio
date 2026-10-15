// Coordinates are percentages of the 2:3 portrait. Each origin follows a
// different part of the supplied silhouette, never a shared center or the face.
export const portraitSkills = [
  { name: 'Figma', icon: '/assets/skill-figma.png', origin: { x: 43, y: 24 }, target: { x: 24, y: 18 } },
  { name: 'Photoshop', icon: '/assets/skill-photoshop.svg', origin: { x: 62, y: 25 }, target: { x: 77, y: 21 } },
  { name: 'Sketch', icon: '/assets/skill-sketch.png', origin: { x: 31, y: 48 }, target: { x: 18, y: 40 } },
  { name: 'After Effects', icon: '/assets/skill-after-effects.svg', origin: { x: 77, y: 48 }, target: { x: 89, y: 43 } },
  { name: 'CapCut', icon: '/assets/skill-capcut.ico', origin: { x: 26, y: 63 }, target: { x: 9, y: 60 } },
  { name: 'Codex', icon: '/assets/skill-codex.png', origin: { x: 40, y: 81 }, target: { x: 14, y: 88 } },
  { name: 'ChatGPT', icon: '/assets/skill-chatgpt.png', origin: { x: 68, y: 78 }, target: { x: 91, y: 81 } },
] as const
