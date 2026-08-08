import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import {
  ArrowUpRight,
  Crosshair,
  Layers,
  Navigation,
  Plus,
  Search,
  TriangleAlert,
} from "lucide-react";

import { MapCanvas } from "@/components/MapCanvas";
import { ACTIVE_TRIP, RECENT_SEARCHES, VEHICLES } from "@/lib/mock-data";

export const Route = createFileRoute("/")({
  head: () => ({
    meta: [
      { title: "Mapa y navegación GPS en tiempo real | Rumbo" },
      {
        name: "description",
        content:
          "Mapa central con tu posición, ruta activa, ETA y búsqueda de destinos. Navegación GPS clara y sin distracciones.",
      },
      { property: "og:title", content: "Mapa y navegación GPS en tiempo real | Rumbo" },
      {
        property: "og:description",
        content: "Mapa, ruta activa, ETA y búsqueda de destinos en una interfaz de conducción sobria.",
      },
    ],
  }),
  component: MapScreen,
});

function MapScreen() {
  const [vehicle, setVehicle] = useState(VEHICLES[0]!.id);

  return (
    <div className="relative min-h-screen overflow-hidden">
      <MapCanvas />

      {/* Buscador */}
      <div className="relative z-10 mx-auto w-full max-w-lg px-4 pt-[max(1rem,env(safe-area-inset-top))]">
        <label className="flex items-center gap-3 rounded-full border border-border bg-surface px-4 py-3 shadow-float">
          <Search className="size-4 text-muted-foreground" />
          <input
            type="search"
            placeholder="Buscar dirección, negocio o lugar"
            className="w-full bg-transparent text-sm outline-none placeholder:text-muted-foreground"
          />
        </label>

        <div className="mt-3 flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
          {VEHICLES.map((v) => (
            <button
              key={v.id}
              type="button"
              onClick={() => setVehicle(v.id)}
              aria-pressed={vehicle === v.id}
              className={`flex shrink-0 items-center gap-1.5 rounded-full border px-3 py-1.5 text-xs font-medium transition-colors ${
                vehicle === v.id
                  ? "border-primary bg-primary text-primary-foreground"
                  : "border-border bg-surface text-muted-foreground"
              }`}
            >
              <span aria-hidden>{v.icon}</span>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      {/* Controles flotantes */}
      <div className="absolute right-4 top-48 z-10 flex flex-col gap-2">
        {[Crosshair, Layers, Navigation].map((Icon, i) => (
          <button
            key={i}
            type="button"
            className="flex size-11 items-center justify-center rounded-full border border-border bg-surface text-foreground shadow-float"
          >
            <Icon className="size-4.5" strokeWidth={1.9} />
          </button>
        ))}
      </div>

      {/* Panel inferior */}
      <div className="absolute inset-x-0 bottom-0 z-20 pb-20">
        <div className="mx-auto w-full max-w-lg px-4">
          <div className="panel-surface p-4 shadow-float">
            <div className="mx-auto mb-3 h-1 w-10 rounded-full bg-border" />

            <div className="flex items-start justify-between gap-4">
              <div className="min-w-0">
                <p className="text-xs uppercase tracking-[0.14em] text-muted-foreground">
                  Ruta activa
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
                className="h-full rounded-full bg-primary"
                style={{ width: `${ACTIVE_TRIP.progress * 100}%` }}
              />
            </div>

            <dl className="mt-4 grid grid-cols-3 gap-2 text-center">
              {[
                ["Tiempo", `${ACTIVE_TRIP.remainingMin} min`],
                ["Distancia", `${ACTIVE_TRIP.remainingKm} km`],
                ["Velocidad", `${ACTIVE_TRIP.speedKmh} km/h`],
              ].map(([k, v]) => (
                <div key={k} className="rounded-xl bg-secondary px-2 py-2.5">
                  <dt className="text-[11px] text-muted-foreground">{k}</dt>
                  <dd className="text-sm font-semibold tabular">{v}</dd>
                </div>
              ))}
            </dl>

            <div className="mt-4 flex items-center gap-3 rounded-xl border border-border px-3 py-2.5">
              <ArrowUpRight className="size-5 text-primary" />
              <div className="min-w-0 flex-1">
                <p className="truncate text-sm font-medium">{ACTIVE_TRIP.nextManeuver}</p>
                <p className="truncate text-xs text-muted-foreground">{ACTIVE_TRIP.nextStreet}</p>
              </div>
              <span className="text-sm font-semibold tabular">{ACTIVE_TRIP.nextDistanceM} m</span>
            </div>

            <div className="mt-3 flex items-center gap-2 text-xs text-muted-foreground">
              <TriangleAlert className="size-3.5 text-traffic-slow" />
              Datos de demostración: aún sin proveedor de mapas conectado.
            </div>

            <div className="mt-4 grid grid-cols-2 gap-2">
              <button className="flex items-center justify-center gap-2 rounded-xl bg-primary px-4 py-3 text-sm font-semibold text-primary-foreground">
                <Navigation className="size-4" /> Iniciar
              </button>
              <button className="flex items-center justify-center gap-2 rounded-xl border border-border px-4 py-3 text-sm font-semibold">
                <Plus className="size-4" /> Añadir parada
              </button>
            </div>

            <ul className="mt-4 space-y-1">
              {RECENT_SEARCHES.map((r) => (
                <li key={r.id} className="flex items-center justify-between gap-3 py-1.5">
                  <span className="truncate text-sm">{r.label}</span>
                  <span className="shrink-0 text-xs text-muted-foreground">{r.detail}</span>
                </li>
              ))}
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}
