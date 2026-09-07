/**
 * A pavement cross-section in miniature: striping on top, wearing course,
 * binder, then stone base. The same idea the depth ladder is built on, shrunk
 * to a mark.
 */
export function BrandMark({ className = "" }: { className?: string }) {
  return (
    <svg
      viewBox="0 0 28 28"
      aria-hidden="true"
      focusable="false"
      className={className}
      fill="none"
    >
      <rect x="0.5" y="0.5" width="27" height="27" stroke="currentColor" strokeOpacity="0.32" />
      <rect x="4" y="5" width="20" height="3" className="fill-stripe" />
      <rect x="4" y="10" width="20" height="4" fill="currentColor" fillOpacity="0.85" />
      <rect x="4" y="16" width="20" height="3" fill="currentColor" fillOpacity="0.5" />
      <g fill="currentColor" fillOpacity="0.42">
        <circle cx="6" cy="22" r="1.1" />
        <circle cx="11" cy="22.6" r="1.4" />
        <circle cx="16" cy="21.8" r="1.1" />
        <circle cx="21" cy="22.5" r="1.3" />
      </g>
    </svg>
  );
}
