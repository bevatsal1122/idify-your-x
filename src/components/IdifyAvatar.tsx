'use client';

export function IdifyAvatar({ size = 40 }: { size?: number }) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 100 100"
      className="shrink-0 rounded-full"
      style={{ minWidth: size, minHeight: size }}
    >
      <defs>
        {/* Main background gradient */}
        <radialGradient id="bg" cx="30%" cy="25%" r="80%">
          <stop offset="0%" stopColor="#1e1e2e" />
          <stop offset="100%" stopColor="#0a0a12" />
        </radialGradient>

        {/* Brain/bulb glow */}
        <radialGradient id="glow" cx="50%" cy="45%" r="35%">
          <stop offset="0%" stopColor="#a78bfa" stopOpacity="0.5" />
          <stop offset="60%" stopColor="#7c3aed" stopOpacity="0.15" />
          <stop offset="100%" stopColor="#7c3aed" stopOpacity="0" />
        </radialGradient>

        {/* Bulb gradient */}
        <linearGradient id="bulb" x1="0" y1="0" x2="0.3" y2="1">
          <stop offset="0%" stopColor="#fbbf24" />
          <stop offset="40%" stopColor="#f59e0b" />
          <stop offset="100%" stopColor="#d97706" />
        </linearGradient>

        {/* Bulb inner glow */}
        <radialGradient id="bulbGlow" cx="45%" cy="40%" r="50%">
          <stop offset="0%" stopColor="#fde68a" stopOpacity="0.9" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        {/* Outer light emission */}
        <radialGradient id="lightEmit" cx="50%" cy="38%" r="45%">
          <stop offset="0%" stopColor="#fbbf24" stopOpacity="0.25" />
          <stop offset="50%" stopColor="#f59e0b" stopOpacity="0.08" />
          <stop offset="100%" stopColor="#f59e0b" stopOpacity="0" />
        </radialGradient>

        {/* Glass shine */}
        <linearGradient id="shine" x1="0.3" y1="0" x2="0.7" y2="0.5">
          <stop offset="0%" stopColor="white" stopOpacity="0.35" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </linearGradient>

        {/* Filament gradient */}
        <linearGradient id="filament" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#fde68a" />
          <stop offset="100%" stopColor="#f59e0b" />
        </linearGradient>

        {/* Base metallic */}
        <linearGradient id="base" x1="0" y1="0" x2="0" y2="1">
          <stop offset="0%" stopColor="#9ca3af" />
          <stop offset="30%" stopColor="#6b7280" />
          <stop offset="70%" stopColor="#4b5563" />
          <stop offset="100%" stopColor="#374151" />
        </linearGradient>

        {/* Sparkle gradient */}
        <radialGradient id="spark">
          <stop offset="0%" stopColor="white" stopOpacity="1" />
          <stop offset="100%" stopColor="white" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Background circle */}
      <circle cx="50" cy="50" r="50" fill="url(#bg)" />

      {/* Subtle ambient glow */}
      <circle cx="50" cy="45" r="38" fill="url(#glow)" />

      {/* Light emission from bulb */}
      <circle cx="50" cy="38" r="30" fill="url(#lightEmit)" />

      {/* Light rays */}
      <g opacity="0.15" stroke="#fbbf24" strokeWidth="1.2" strokeLinecap="round">
        <line x1="50" y1="15" x2="50" y2="10" />
        <line x1="30" y1="22" x2="27" y2="18" />
        <line x1="70" y1="22" x2="73" y2="18" />
        <line x1="22" y1="38" x2="17" y2="38" />
        <line x1="78" y1="38" x2="83" y2="38" />
        <line x1="27" y1="52" x2="23" y2="55" />
        <line x1="73" y1="52" x2="77" y2="55" />
      </g>

      {/* Bulb glass — main shape */}
      <path
        d="M50 20 C38 20 28 30 28 40 C28 47 32 53 38 56 L38 62 C38 63 39 64 40 64 L60 64 C61 64 62 63 62 62 L62 56 C68 53 72 47 72 40 C72 30 62 20 50 20Z"
        fill="url(#bulb)"
      />

      {/* Bulb inner glow overlay */}
      <path
        d="M50 20 C38 20 28 30 28 40 C28 47 32 53 38 56 L38 62 C38 63 39 64 40 64 L60 64 C61 64 62 63 62 62 L62 56 C68 53 72 47 72 40 C72 30 62 20 50 20Z"
        fill="url(#bulbGlow)"
      />

      {/* Glass shine highlight */}
      <path
        d="M44 24 C37 27 33 33 33 40 C33 44 34 47 36 50"
        fill="none"
        stroke="url(#shine)"
        strokeWidth="3.5"
        strokeLinecap="round"
      />

      {/* Filament */}
      <path
        d="M44 50 L44 40 C44 36 47 34 50 34 C53 34 56 36 56 40 L56 50"
        fill="none"
        stroke="url(#filament)"
        strokeWidth="2"
        strokeLinecap="round"
      />
      <path
        d="M47 42 L50 38 L53 42"
        fill="none"
        stroke="#fde68a"
        strokeWidth="1.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        opacity="0.8"
      />

      {/* Metallic base / screw */}
      <rect x="39" y="64" width="22" height="4" rx="1" fill="url(#base)" />
      <rect x="40" y="68" width="20" height="3" rx="1" fill="#4b5563" />
      <rect x="41" y="71" width="18" height="3" rx="1" fill="#374151" />
      <rect x="43" y="74" width="14" height="3" rx="1.5" fill="#1f2937" />
      {/* Base shine lines */}
      <line x1="40" y1="65" x2="61" y2="65" stroke="white" strokeWidth="0.5" opacity="0.2" />
      <line x1="41" y1="69" x2="60" y2="69" stroke="white" strokeWidth="0.5" opacity="0.15" />

      {/* Sparkles */}
      <circle cx="24" cy="28" r="2" fill="url(#spark)" opacity="0.7" />
      <circle cx="76" cy="25" r="1.5" fill="url(#spark)" opacity="0.5" />
      <circle cx="80" cy="48" r="1" fill="url(#spark)" opacity="0.4" />

      {/* 4-point star sparkles */}
      <g transform="translate(20, 45)" opacity="0.5">
        <path d="M0 -3 L0.8 -0.8 L3 0 L0.8 0.8 L0 3 L-0.8 0.8 L-3 0 L-0.8 -0.8Z" fill="white" />
      </g>
      <g transform="translate(78, 32)" opacity="0.4">
        <path d="M0 -2.5 L0.6 -0.6 L2.5 0 L0.6 0.6 L0 2.5 L-0.6 0.6 L-2.5 0 L-0.6 -0.6Z" fill="white" />
      </g>
    </svg>
  );
}
