import { useId } from 'react'

/** Code-native dimensional icons share one material and lighting system. */
export function ChallengeSculpture({ kind }: { kind: number }) {
  const id = useId().replace(/:/g, '')
  const shape = (material: string) => kind === 0 ? <g fill={material} stroke="#EAFFBA" strokeOpacity=".25" strokeWidth=".6">
    <path d="M18 73 58 54 98 73 58 94Z" />
    <path d="M18 52 58 33 98 52 58 73Z" />
    <path d="M18 31 58 12 98 31 58 52Z" />
  </g> : kind === 1 ? <g fill="none" stroke={material} strokeWidth="16" strokeLinecap="round">
    <path d="M81 26A34 34 0 1 0 91 64" />
    <path d="m91 17 3 3" strokeWidth="12" />
  </g> : <g fill={material}>
    <rect x="15" y="23" width="82" height="9" rx="4" />
    <rect x="15" y="51" width="82" height="9" rx="4" />
    <rect x="15" y="79" width="82" height="9" rx="4" />
    <rect x="35" y="14" width="16" height="27" rx="4" />
    <rect x="70" y="42" width="16" height="27" rx="4" />
    <rect x="41" y="70" width="16" height="27" rx="4" />
  </g>
  return <span className="challenge-sculpture">
    <svg viewBox="0 0 128 128" fill="none" aria-hidden="true">
      <defs>
        <linearGradient id={`${id}-face`} x1="18" y1="12" x2="84" y2="105" gradientUnits="userSpaceOnUse"><stop stopColor="#F0FFBA" /><stop offset=".38" stopColor="#B8F807" /><stop offset="1" stopColor="#79B746" /></linearGradient>
        <linearGradient id={`${id}-edge`} x1="20" y1="20" x2="105" y2="100" gradientUnits="userSpaceOnUse"><stop stopColor="#D3EE8B" /><stop offset=".6" stopColor="#62932E" /><stop offset="1" stopColor="#38551D" /></linearGradient>
      </defs>
      <g transform="translate(4 4) rotate(-10 60 60) skewX(-5)">
        {[8, 6, 4, 2].map(depth => <g key={depth} transform={`translate(${depth} ${depth})`}>{shape(`url(#${id}-edge)`)}</g>)}
        {shape(`url(#${id}-face)`)}
      </g>
    </svg>
  </span>
}
