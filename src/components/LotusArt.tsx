import React from 'react';

// Decorative watercolor-style lotus artwork for the invitation card (pure SVG)

const GOLD = '#C29A4B';

// Single petal pointing up from (0,0)
const petal = (l: number, w: number) =>
  `M0,0 C${-w},${-l * 0.35} ${-w * 0.7},${-l * 0.8} 0,${-l} C${w * 0.7},${-l * 0.8} ${w},${-l * 0.35} 0,0Z`;

type ArtProps = { className?: string; style?: React.CSSProperties };

export const LotusFlower: React.FC<ArtProps & { line?: boolean }> = ({ className, style, line }) => (
  <svg className={className} style={style} viewBox="0 0 200 150" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <linearGradient id="lotus-back" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#F6E4DA" />
        <stop offset="100%" stopColor="#EFB8BE" />
      </linearGradient>
      <linearGradient id="lotus-front" x1="0" y1="1" x2="0" y2="0">
        <stop offset="0%" stopColor="#FBEFE6" />
        <stop offset="70%" stopColor="#F2C2C4" />
        <stop offset="100%" stopColor="#E9A3AC" />
      </linearGradient>
    </defs>
    <g transform="translate(100 128)" stroke={GOLD} strokeWidth={line ? 1 : 0.7} strokeLinejoin="round">
      {[-72, -48, -24, 24, 48, 72].map((a) => (
        <path key={`b${a}`} d={petal(92, 26)} transform={`rotate(${a})`} fill={line ? 'none' : 'url(#lotus-back)'} opacity={line ? 0.9 : 0.85} />
      ))}
      <path d={petal(104, 30)} fill={line ? 'none' : 'url(#lotus-back)'} />
      {[-38, -14, 14, 38].map((a) => (
        <path key={`f${a}`} d={petal(76, 24)} transform={`rotate(${a})`} fill={line ? 'none' : 'url(#lotus-front)'} />
      ))}
      <path d={petal(64, 22)} fill={line ? 'none' : 'url(#lotus-front)'} />
      {!line && (
        <g fill={GOLD} stroke="none">
          {[-18, -9, 0, 9, 18].map((x) => (
            <circle key={x} cx={x} cy={-46 + Math.abs(x) * 0.4} r="1.6" />
          ))}
        </g>
      )}
    </g>
  </svg>
);

export const LotusBud: React.FC<ArtProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 80 180" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <path d="M40,80 C38,120 46,150 42,180" stroke="#9AA58E" strokeWidth="2.5" fill="none" />
    <g transform="translate(40 84)" stroke={GOLD} strokeWidth="0.7">
      <path d={petal(70, 22)} transform="rotate(-14)" fill="#F4CFCF" />
      <path d={petal(70, 22)} transform="rotate(14)" fill="#F4CFCF" />
      <path d={petal(76, 20)} fill="#EDB3B8" />
    </g>
  </svg>
);

export const LotusLeaf: React.FC<ArtProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 200 200" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <defs>
      <radialGradient id="lotus-leaf" cx="50%" cy="50%" r="60%">
        <stop offset="0%" stopColor="#C9CDBB" />
        <stop offset="100%" stopColor="#8E9883" />
      </radialGradient>
    </defs>
    <path d="M100,100 L184,88 A86,86 0 1 0 182,118 Z" fill="url(#lotus-leaf)" stroke={GOLD} strokeWidth="1" opacity="0.85" />
    <g stroke={GOLD} strokeWidth="0.7" opacity="0.7">
      {Array.from({ length: 11 }, (_, i) => {
        const a = ((i * 30 + 20) * Math.PI) / 180;
        return <line key={i} x1="100" y1="100" x2={100 + Math.cos(a) * 80} y2={100 + Math.sin(a) * 80} />;
      })}
    </g>
  </svg>
);

export const GoldSprig: React.FC<ArtProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 120 240" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g stroke={GOLD} strokeWidth="1" fill="none" opacity="0.8">
      <path d="M20,240 C30,180 50,120 90,20" />
      {[
        [32, 190, -40],
        [40, 150, 30],
        [52, 110, -35],
        [66, 74, 35],
        [80, 42, -30],
      ].map(([x, y, a]) => (
        <path key={`${x}-${y}`} d={petal(38, 12)} transform={`translate(${x} ${y}) rotate(${a})`} fill="rgba(240,226,206,0.35)" />
      ))}
    </g>
    <g fill={GOLD} opacity="0.7">
      {[[96, 60], [104, 92], [88, 132], [100, 150], [70, 170]].map(([x, y]) => (
        <circle key={`${x}-${y}`} cx={x} cy={y} r="1.6" />
      ))}
    </g>
  </svg>
);

// Small gold line lotus used as heading ornament / divider
export const LotusIcon: React.FC<ArtProps> = ({ className, style }) => (
  <svg className={className} style={style} viewBox="0 0 100 50" xmlns="http://www.w3.org/2000/svg" aria-hidden="true">
    <g transform="translate(50 44)" stroke={GOLD} strokeWidth="1.4" fill="none" strokeLinejoin="round">
      {[-62, -32, 32, 62].map((a) => (
        <path key={a} d={petal(30, 9)} transform={`rotate(${a})`} />
      ))}
      <path d={petal(38, 11)} />
      <path d="M-26,0 Q0,6 26,0" />
    </g>
  </svg>
);

export const LotusDivider: React.FC<{ className?: string }> = ({ className }) => (
  <div className={`lotus-divider ${className ?? ''}`}>
    <span />
    <LotusIcon className="lotus-divider-icon" />
    <span />
  </div>
);
