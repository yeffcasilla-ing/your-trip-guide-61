/**
 * Lienzo de mapa provisional (Fase 2) con animaciones.
 * Representación esquemática, NO un mapa real ni datos geográficos.
 */
const ROUTE_D = "M195 560 L188 400 L300 380 L292 210 L210 190";

export function MapCanvas({
  showRoute = true,
  animated = true,
  driving = false,
}: {
  showRoute?: boolean;
  animated?: boolean;
  driving?: boolean;
}) {
  return (
    <div className="absolute inset-0 overflow-hidden bg-map-land" aria-hidden>
      <svg
        className={`size-full transition-transform duration-[1200ms] ease-out ${driving ? "scale-110" : "scale-100"}`}
        viewBox="0 0 390 700"
        preserveAspectRatio="xMidYMid slice"
      >
        <path d="M-20 470 C 90 430, 150 520, 410 470 L410 720 L-20 720Z" fill="var(--color-map-water)" />
        {[...Array(9)].map((_, i) => (
          <line
            key={`v${i}`}
            x1={i * 52}
            y1={0}
            x2={i * 52 - 40}
            y2={700}
            stroke="var(--color-map-road)"
            strokeWidth={i % 3 === 0 ? 12 : 6}
          />
        ))}
        {[...Array(12)].map((_, i) => (
          <line
            key={`h${i}`}
            x1={-20}
            y1={i * 62}
            x2={410}
            y2={i * 62 + 18}
            stroke="var(--color-map-road)"
            strokeWidth={i % 4 === 0 ? 12 : 6}
          />
        ))}
        <path
          d="M-20 240 C 120 210, 200 300, 410 250"
          stroke="var(--color-map-road-major)"
          strokeWidth={18}
          fill="none"
        />

        {showRoute && (
          <>
            <path
              d={ROUTE_D}
              stroke="var(--color-route)"
              strokeWidth={13}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
              opacity={0.25}
            />
            <path
              d={ROUTE_D}
              className={animated ? "route-flow" : undefined}
              stroke="var(--color-route)"
              strokeWidth={11}
              strokeLinecap="round"
              strokeLinejoin="round"
              fill="none"
            />
            <path
              d="M292 210 L210 190"
              stroke="var(--color-traffic-slow)"
              strokeWidth={11}
              strokeLinecap="round"
              fill="none"
            />
            <g>
              <circle r="14" fill="var(--color-route)" opacity={0.2} className={animated ? "gps-pulse" : undefined} />
              <circle cx="210" cy="190" r="8" fill="var(--color-route)" />
              <circle cx="210" cy="190" r="8" fill="none" stroke="var(--color-surface)" strokeWidth={3} />
            </g>

            {animated && (
              <g>
                <circle r="5" fill="var(--color-traffic-free)" opacity={0.9}>
                  <animateMotion dur="7s" repeatCount="indefinite" path={ROUTE_D} />
                </circle>
                <circle r="5" fill="var(--color-traffic-free)" opacity={0.45}>
                  <animateMotion dur="7s" begin="2.3s" repeatCount="indefinite" path={ROUTE_D} />
                </circle>
              </g>
            )}
          </>
        )}

        {/* Posición del usuario */}
        <g>
          <circle
            cx="195"
            cy="560"
            r="14"
            fill="var(--color-primary)"
            opacity={0.35}
            className={animated ? "gps-pulse" : undefined}
          />
          <circle cx="195" cy="560" r="26" fill="var(--color-primary)" opacity={0.12} />
          <circle cx="195" cy="560" r="10" fill="var(--color-primary)" />
          <circle cx="195" cy="560" r="10" fill="none" stroke="var(--color-surface)" strokeWidth={3} />
        </g>
      </svg>
    </div>
  );
}
