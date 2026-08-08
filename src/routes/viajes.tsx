import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";

import { Panel, Row, Screen } from "@/components/Screen";
import { SAVED_TRIPS, TRIP_HISTORY } from "@/lib/mock-data";

export const Route = createFileRoute("/viajes")({
  head: () => ({
    meta: [
      { title: "Viajes frecuentes e historial de recorridos | Rumbo" },
      {
        name: "description",
        content:
          "Guarda rutas frecuentes como casa-trabajo y consulta tu historial con fecha, distancia y duración de cada viaje.",
      },
      { property: "og:title", content: "Viajes frecuentes e historial de recorridos | Rumbo" },
      {
        property: "og:description",
        content: "Rutas frecuentes guardadas e historial detallado de tus recorridos.",
      },
    ],
  }),
  component: TripsScreen,
});

const TABS = ["Mis viajes", "Historial", "Recorridos"] as const;

function TripsScreen() {
  const [tab, setTab] = useState<(typeof TABS)[number]>("Mis viajes");

  return (
    <Screen title="Viajes" subtitle="Rutas frecuentes y recorridos realizados">
      <div className="flex rounded-full border border-border bg-surface p-1">
        {TABS.map((t) => (
          <button
            key={t}
            onClick={() => setTab(t)}
            aria-pressed={tab === t}
            className={`flex-1 rounded-full px-3 py-1.5 text-xs font-medium transition-colors ${
              tab === t ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {tab === "Mis viajes" && (
          <Panel>
            {SAVED_TRIPS.map((t) => (
              <Row
                key={t.id}
                icon={<span>🧭</span>}
                title={`${t.from} → ${t.to}`}
                detail={t.stops > 0 ? `${t.stops} parada(s)` : "Ruta directa"}
                trailing={`${t.minutes} min · ${t.km} km`}
              />
            ))}
          </Panel>
        )}

        {tab === "Historial" && (
          <Panel>
            {TRIP_HISTORY.map((h) => (
              <Row
                key={h.id}
                icon={<span>🕘</span>}
                title={`${h.from} → ${h.to}`}
                detail={`${h.date} · ${h.time}`}
                trailing={`${h.minutes} min · ${h.km} km`}
              />
            ))}
          </Panel>
        )}

        {tab === "Recorridos" && (
          <div className="panel-surface p-5">
            <p className="text-sm font-medium">Mis recorridos</p>
            <p className="mt-1 text-sm text-muted-foreground">
              Registro visual de tus trayectos. Está desactivado por defecto y puedes eliminar los
              datos en cualquier momento desde Privacidad.
            </p>
            <button className="mt-4 rounded-xl border border-border px-4 py-2.5 text-sm font-semibold">
              Activar recorridos
            </button>
          </div>
        )}
      </div>
    </Screen>
  );
}
