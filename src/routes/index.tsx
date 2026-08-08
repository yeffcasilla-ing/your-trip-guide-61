import { createFileRoute } from "@tanstack/react-router";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUpRight,
  ChevronDown,
  Crosshair,
  Layers,
  Navigation,
  Pause,
  Plus,
  Search,
  Square,
  TriangleAlert,
} from "lucide-react";

import { MapCanvas } from "@/components/MapCanvas";
import { ACTIVE_TRIP, RECENT_SEARCHES, VEHICLES } from "@/lib/mock-data";
import { useSettings } from "@/lib/settings";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa y navegación GPS en tiempo real | Rumbo" },
      {
        name: "description",
        content:
          "Mapa central con tu posición, ruta activa animada, ETA y búsqueda de destinos. Navegación GPS clara y sin distracciones.",
      },
      { property: "og:title", content: "Mapa y navegación GPS en tiempo real | Rumbo" },
      {
        property: "og:description",
        content: "Mapa, ruta activa, ETA y búsqueda de destinos en una interfaz de conducción sobria.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: MapScreen,
});

function MapScreen() {
  const { settings, update } = useSettings();
  const animated = settings.animations;

  const [driving, setDriving] = useState(false);
  const [expanded, setExpanded] = useState(true);
  const [progress, setProgress] = useState(ACTIVE_TRIP.progress);
  const [speed, setSpeed] = useState(ACTIVE_TRIP.speedKmh);
  const [nextDistance, setNextDistance] = useState(ACTIVE_TRIP.nextDistanceM);
  const tick = useRef<ReturnType<typeof setInterval> | null>(null);

  useEffect(() => {
    if (!driving) {
      if (tick.current) clearInterval(tick.current);
      return;
    }
    tick.current = setInterval(() => {
      setProgress((p) => (p >= 0.995 ? 1 : p + 0.004));
      setSpeed((s) => Math.max(0, Math.min(120, Math.round(s + (Math.random() * 8 - 4)))));
      setNextDistance((d) => (d <= 40 ? 620 : d - 20));
    }, 900);
    return () => {
      if (tick.current) clearInterval(tick.current);
    };
  }, [driving]);

  const remainingMin = useMemo(
    () => Math.max(0, Math.round(ACTIVE_TRIP.remainingMin * (1 - progress) * 1.6)),
    [progress],
  );
  const remainingKm = useMemo(
    () => Math.max(0, (ACTIVE_TRIP.remainingKm * (1 - progress) * 1.6)).toFixed(1),
    [progress],
  );

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MapCanvas animated={animated} driving={driving} />

      {/* Buscador */}
      <div className="animate-drop relative z-10 mx-auto w-full max-w-lg px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <label className="flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 shadow-float transition-shadow focus-within:ring-2 focus-within:ring-ring">
          <Search className="size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar dirección, negocio o lugar"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {VEHICLES.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => update("vehicle", v.id)}
              aria-pressed={settings.vehicle === v.id}
              style={{ animationDelay: `${80 + i * 45}ms` }}
              className={`press animate-drop flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium ${
                settings.vehicle === v.id
                  ? "border-primary bg-primary text-primary-foreground shadow-float"
                  : "border-border bg-surface text-muted-foreground"
              }`}
            >
              <span aria-hidden>{v.icon}</span>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Velocímetro */}
      {settings.showSpeedometer && (
        <div
          className={`absolute left-4 top-48 z-10 flex size-16 flex-col items-center justify-center rounded-full border border-border bg-surface shadow-float transition-all duration-500 ${
            driving ? "scale-100 opacity-100" : "scale-90 opacity-70"
          }`}
        >
          <span className="text-lg font-semibold tabular leading-none">{speed}</span>
          <span className="text-[10px] text-muted-foreground">{settings.units === "metric" ? "km/h" : "mph"}</span>
        </div>
      )}

      {/* Controles flotantes */}
      <div className="absolute right-4 top-48 z-10 flex flex-col gap-2">
        {[Crosshair, Layers, Navigation].map((Icon, i) => (
          <button
            key={i}
            type="button"
            style={{ animationDelay: `${150 + i * 70}ms` }}
            className="press animate-rise flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-float hover:bg-secondary"
          >
            <Icon
              className={`size-4.5 ${i === 2 && animated ? "animate-compass" : ""}`}
              strokeWidth={1.9}
            />
          </button>
        ))}
      </div>

      {/* Panel inferior */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-20">
        <div className="mx-auto w-full max-w-lg px-4">
          <div className="animate-sheet panel-surface p-4 shadow-float">
            <button
              type="button"
              onClick={() => setExpanded((e) => !e)}
              aria-expanded={expanded}
              className="mx-auto mb-3 flex w-full items-center justify-center gap-1"
            >
              <span className="h-1 w-10 rounded-full bg-border" />
              <ChevronDown
                className={`size-4 text-muted-foreground transition-transform duration-300 ${expanded ? "" : "rotate-180"}`}
              />
            </button>

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  {driving ? (
                    <span className="inline-flex items-center gap-1.5">
                      <span className="size-1.5 rounded-full bg-traffic-free animate-soft-ping" /> Navegando
                    </span>
                  ) : (
                    "Ruta activa"
                  )}
                </p>
                <p className="mt-1 truncate text-lg font-semibold">{ACTIVE_TRIP.destination}</p>
              </div>
              <div className="text-right">
                <p className="text-2xl font-semibold tabular">{ACTIVE_TRIP.etaLabel}</p>
                <p className="text-xs text-muted-foreground">ETA</p>
              </div>
            </div>

            <div className="mt-3 h-1.5 overflow-hidden rounded-full bg-secondary">
              <div
                className={`h-full rounded-full bg-primary transition-[width] duration-700 ease-out ${driving && animated ? "shimmer" : ""}`}
                style={{ width: `${Math.min(100, progress * 100)}%` }}
              />
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["Tiempo", `${remainingMin} min`],
                ["Distancia", `${remainingKm} km`],
                ["Velocidad", `${speed} km/h`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-secondary px-2 py-2.5 transition-colors">
                  <dt className="text-[11px] text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-semibold tabular">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border px-3 py-2.5">
              <ArrowUpRight className={`size-5 text-primary ${driving && animated ? "animate-soft-ping" : ""}`} />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{ACTIVE_TRIP.nextManeuver}</p>
                <p className="truncate text-xs text-muted-foreground">{ACTIVE_TRIP.nextStreet}</p>
              </div>
              <span className="text-sm font-semibold tabular">{nextDistance} m</span>
            </div>

            <div
              className={`grid transition-all duration-400 ease-[cubic-bezier(0.22,1,0.36,1)] ${
                expanded ? "grid-rows-[1fr] opacity-100" : "grid-rows-[0fr] opacity-0"
              }`}
            >
              <div className="overflow-hidden">
                <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
                  <TriangleAlert className="size-3.5 text-traffic-slow" />
                  Datos de demostración: aún sin proveedor de mapas conectado.
                </div>

                <ul className="mt-3 space-y-1">
                  {RECENT_SEARCHES.map((r) => (
                    <li
                      key={r.id}
                      className="flex items-center justify-between gap-3 rounded-lg px-1 py-1.5 transition-colors hover:bg-secondary"
                    >
                      <span className="truncate text-sm">{r.label}</span>
                      <span className="shrink-0 text-xs text-muted-foreground">{r.detail}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button
                type="button"
                onClick={() => setDriving((d) => !d)}
                className={`press flex items-center justify-center gap-2 rounded-xl px-4 py-3 text-sm font-semibold ${
                  driving
                    ? "border border-border bg-secondary text-foreground"
                    : "bg-primary text-primary-foreground"
                }`}
              >
                {driving ? <Pause className="size-4" /> : <Navigation className="size-4" />}
                {driving ? "Pausar" : "Iniciar"}
              </button>
              {driving ? (
                <button
                  type="button"
                  onClick={() => {
                    setDriving(false);
                    setProgress(ACTIVE_TRIP.progress);
                    setSpeed(ACTIVE_TRIP.speedKmh);
                    setNextDistance(ACTIVE_TRIP.nextDistanceM);
                  }}
                  className="press flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold text-destructive"
                >
                  <Square className="size-4" /> Finalizar
                </button>
              ) : (
                <button
                  type="button"
                  className="press flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold"
                >
                  <Plus className="size-4" /> Añadir parada
                </button>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
