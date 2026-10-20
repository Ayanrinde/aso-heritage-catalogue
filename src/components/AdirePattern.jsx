import { useId } from 'react';

/**
 * Generated tile patterns inspired by Adire resist-dye cloth.
 * Every tile is 64 x 64 units so animated drifts can loop seamlessly (see `animate-drift`).
 */
const tiles = {
  // Stitched circles (oniko)
  oniko: (fg) => (
    <>
      <g fill="none" stroke={fg} strokeWidth="2">
        <circle cx="16" cy="16" r="13" />
        <circle cx="16" cy="16" r="7" />
        <circle cx="48" cy="48" r="13" />
        <circle cx="48" cy="48" r="7" />
      </g>
      <g fill={fg}>
        <circle cx="16" cy="16" r="2.5" />
        <circle cx="48" cy="48" r="2.5" />
        <circle cx="48" cy="16" r="2" />
        <circle cx="16" cy="48" r="2" />
      </g>
    </>
  ),
  // Bands with stitched lines (alabere)
  alabere: (fg) => (
    <>
      <rect x="8" y="0" width="8" height="64" fill={fg} />
      <line x1="32" y1="0" x2="32" y2="64" stroke={fg} strokeWidth="2.5" strokeDasharray="4 5" />
      <line x1="48" y1="0" x2="48" y2="64" stroke={fg} strokeWidth="2" />
      <line x1="56" y1="0" x2="56" y2="64" stroke={fg} strokeWidth="2" />
    </>
  ),
  // Nested diamonds (eleso)
  eleso: (fg) => (
    <>
      <polygon points="32,6 58,32 32,58 6,32" fill="none" stroke={fg} strokeWidth="2.5" strokeLinejoin="round" />
      <polygon points="32,20 44,32 32,44 20,32" fill={fg} />
      <g fill={fg}>
        <circle cx="0" cy="0" r="3" />
        <circle cx="64" cy="0" r="3" />
        <circle cx="0" cy="64" r="3" />
        <circle cx="64" cy="64" r="3" />
      </g>
    </>
  ),
};

export default function AdirePattern({
  pattern = 'oniko',
  bg = 'transparent',
  fg = '#D7DCEB',
  opacity = 1,
  scale = 1,
  className = '',
}) {
  // useId returns strings like ":r1:"; strip the colons so the id is safe inside url(#...).
  const id = `adire-${useId().replace(/:/g, '')}`;
  const draw = tiles[pattern] || tiles.oniko;

  return (
    <svg
      aria-hidden="true"
      focusable="false"
      width="100%"
      height="100%"
      className={className}
      xmlns="http://www.w3.org/2000/svg"
    >
      <defs>
        <pattern id={id} width="64" height="64" patternUnits="userSpaceOnUse" patternTransform={`scale(${scale})`}>
          {draw(fg)}
        </pattern>
      </defs>
      {bg !== 'transparent' && <rect width="100%" height="100%" fill={bg} />}
      <rect width="100%" height="100%" fill={`url(#${id})`} opacity={opacity} />
    </svg>
  );
}
