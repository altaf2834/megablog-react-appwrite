function Logo({width='100px'}) {
  return (
    <div style={{width}} className="flex items-center gap-2 select-none">
      {/* Pen/quill icon */}
      <svg
        viewBox="0 0 32 32"
        fill="none"
        xmlns="http://www.w3.org/2000/svg"
        style={{width: '28px', height: '28px', flexShrink: 0}}
        aria-hidden="true"
      >
        <rect width="32" height="32" rx="8" fill="#6366f1"/>
        <path
          d="M8 24l4-1.5 9-9-2.5-2.5-9 9L8 24zm13-13l2-2a1.77 1.77 0 00-2.5-2.5l-2 2 2.5 2.5z"
          fill="white"
        />
      </svg>
      <span
        className="font-bold tracking-tight"
        style={{
          fontSize: '1.125rem',
          background: 'linear-gradient(135deg, #6366f1, #a78bfa)',
          WebkitBackgroundClip: 'text',
          WebkitTextFillColor: 'transparent',
          backgroundClip: 'text',
          fontFamily: "'Inter', sans-serif",
        }}
      >
        MegaBlog
      </span>
    </div>
  )
}

export default Logo