/**
 * An annotated cut through a driveway or lot, drawn to relative scale.
 *
 * This is the argument the whole page rests on: a crack is an opening, water
 * follows it down, and what actually fails is the base nobody can see. It is
 * shown once, here, so the depth gauges on each service have something to
 * refer back to.
 */

const LAYERS = [
  { name: "Wearing course", spec: '1.5"', y: 52, h: 46, fill: "#24262A" },
  { name: "Binder course", spec: '2.5"', y: 98, h: 64, fill: "#1E2023" },
  { name: "Stone base", spec: '6"–8"', y: 162, h: 116, fill: "#3A3D42" },
  { name: "Subgrade", spec: "Compacted soil", y: 278, h: 104, fill: "#2B2723" },
] as const;

const CUT_X = 24;
const CUT_W = 250;
const LABEL_X = 296;

export function PavementSection({ className = "" }: { className?: string }) {
  return (
    <figure className={className}>
      <svg
        viewBox="0 0 470 430"
        className="w-full"
        role="img"
        aria-labelledby="section-title section-desc"
      >
        <title id="section-title">Cut-away section through asphalt pavement</title>
        <desc id="section-desc">
          Four layers shown in order from the top: a 1.5 inch wearing course, a 2.5 inch binder
          course, a 6 to 8 inch stone base, and compacted subgrade soil. A crack runs from the
          surface down through the asphalt, carrying water into the stone base, where the failure
          that produces potholes begins.
        </desc>

        <defs>
          <clipPath id="cutClip">
            <rect x={CUT_X} y={52} width={CUT_W} height={330} />
          </clipPath>
          <linearGradient id="failZone" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stopColor="#C0512B" stopOpacity="0" />
            <stop offset="100%" stopColor="#C0512B" stopOpacity="0.22" />
          </linearGradient>
        </defs>

        {/* Pavement layers */}
        {LAYERS.map((layer) => (
          <rect
            key={layer.name}
            x={CUT_X}
            y={layer.y}
            width={CUT_W}
            height={layer.h}
            fill={layer.fill}
          />
        ))}

        <g clipPath="url(#cutClip)">
          {/* Stone in the base course */}
          <g fill="#6E7075" fillOpacity="0.5">
            {[
              [46, 182, 5], [86, 200, 6.5], [130, 178, 4.5], [172, 196, 5.5], [214, 180, 6],
              [252, 202, 4.5], [60, 226, 6], [104, 244, 5], [148, 222, 6.5], [190, 240, 4.5],
              [232, 226, 5.5], [40, 262, 4.5], [120, 266, 5], [204, 262, 6], [258, 244, 5],
            ].map(([cx, cy, r], i) => (
              <circle key={i} cx={cx} cy={cy} r={r} />
            ))}
          </g>

          {/* Where the base gives out */}
          <rect x={CUT_X} y={236} width={CUT_W} height={146} fill="url(#failZone)" />

          {/* The crack, widening as it descends */}
          <path
            d="M148 52 L154 78 L146 104 L156 132 L149 160 L160 190 L150 222 L163 252 L152 284 L168 316"
            stroke="#0B0C0D"
            strokeWidth="7"
            strokeLinecap="round"
            fill="none"
          />
          <path
            d="M148 52 L154 78 L146 104 L156 132 L149 160 L160 190 L150 222 L163 252 L152 284 L168 316"
            stroke="#C0512B"
            strokeOpacity="0.55"
            strokeWidth="1.5"
            fill="none"
          />
        </g>

        {/* Striping and the surface line */}
        <rect x={CUT_X} y={46} width={CUT_W} height={6} fill="#2E3136" />
        <g fill="#F2C230">
          <rect x={40} y={46} width={34} height={6} />
          <rect x={96} y={46} width={34} height={6} />
          <rect x={186} y={46} width={34} height={6} />
          <rect x={242} y={46} width={32} height={6} />
        </g>

        {/* Water tracking down the crack */}
        <g stroke="#F2C230" strokeWidth="1.5" fill="none" strokeLinecap="round">
          <path d="M151 20 L151 40" />
          <path d="M145 33 L151 41 L157 33" />
        </g>
        <text
          x={162}
          y={30}
          className="font-mono uppercase"
          fill="#F2C230"
          fontSize="10.5"
          letterSpacing="1.8"
        >
          Water
        </text>

        {/* Layer callouts */}
        {LAYERS.map((layer) => {
          const mid = layer.y + layer.h / 2;
          return (
            <g key={`label-${layer.name}`}>
              <line
                x1={CUT_X + CUT_W}
                y1={mid}
                x2={LABEL_X - 10}
                y2={mid}
                stroke="#6E7075"
                strokeOpacity="0.45"
                strokeDasharray="2 3"
              />
              <text
                x={LABEL_X}
                y={mid - 3}
                className="font-mono uppercase"
                fill="#E8E6E1"
                fontSize="10.5"
                letterSpacing="1.6"
              >
                {layer.name}
              </text>
              <text x={LABEL_X} y={mid + 12} className="font-mono" fill="#9A9CA1" fontSize="10.5">
                {layer.spec}
              </text>
            </g>
          );
        })}

        {/* The point of the whole drawing */}
        <line
          x1={168}
          y1={318}
          x2={168}
          y2={400}
          stroke="#C0512B"
          strokeOpacity="0.6"
          strokeDasharray="2 3"
        />
        <text
          x={CUT_X}
          y={410}
          className="font-mono uppercase"
          fill="#E0764A"
          fontSize="11"
          letterSpacing="1.8"
        >
          Failure starts here, not at the surface
        </text>
      </svg>
    </figure>
  );
}
