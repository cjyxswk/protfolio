export function BusinessGoalIcon({ kind }: { kind: string }) {
  return <svg viewBox="0 0 64 64" width="64" height="64" fill="currentColor" aria-hidden="true">
    {kind === 'platform' ? <>
      <path d="M10 19a4 4 0 0 1 5-3.9l27 7a4 4 0 0 1 3 3.9v21a4 4 0 0 1-5 3.9l-27-7a4 4 0 0 1-3-3.9Z" opacity=".3" />
      <path d="M27 15a4 4 0 0 1 3-3.9l22-5A4 4 0 0 1 57 10v31a4 4 0 0 1-5 3.9l-22-5a4 4 0 0 1-3-3.9Z" opacity=".55" />
      <path d="M7 9a4 4 0 0 1 5-3.9l28 7A4 4 0 0 1 43 16v22a4 4 0 0 1-3 3.9l-28 7A4 4 0 0 1 7 45Z" />
    </> : kind === 'experience' ? <>
      <rect x="7" y="7" width="22" height="22" rx="6" /><rect x="35" y="7" width="22" height="22" rx="6" opacity=".55" />
      <rect x="7" y="35" width="22" height="22" rx="6" opacity=".55" /><rect x="35" y="35" width="22" height="22" rx="6" />
    </> : <>
      <path fillRule="evenodd" d="M32 4a28 28 0 1 0 0 56 28 28 0 0 0 0-56Zm-2 12h4v4c5 .5 8 3 8 7h-6c0-2-1.5-3-4-3s-4 1-4 2.5 1 2 5 3c6 1.5 9 4 9 8 0 4.5-3.5 7-8 7.5v4h-4v-4c-5.5-.5-9-3.5-9-8h6c0 2.5 2 3.5 5 3.5s4-1 4-2.5-1-2.5-5-3.5c-6-1.5-9-3.5-9-8 0-4 3-6.5 8-7Z" />
    </>}
  </svg>
}
