import { createFileRoute } from "@tanstack/react-router";
import { Star } from "lucide-react";

import { Panel, Row, Screen, SectionLabel } from "@/components/Screen";
import { CATEGORIES, INCIDENTS, NEARBY_PLACES } from "@/lib/mock-data";

export const Route = createFileRoute("/explorar")({
  head: () => ({
    meta: [
      { title: "Explorar lugares cercanos | Rumbo" },
      {
        name: "description",
        content:
          "Descubre restaurantes, gasolineras, hospitales, farmacias y más cerca de tu posición, con incidentes de tráfico del momento.",
      },
      { property: "og:title", content: "Explorar lugares cercanos | Rumbo" },
      {
        property: "og:description",
        content: "Categorías cercanas e incidentes de tráfico en una sola pantalla.",
      },
    ],
  }),
  component: ExploreScreen,
});

const incidentColor = {
  accident: "text-traffic-jam",
  closure: "text-traffic-jam",
  works: "text-traffic-slow",
  congestion: "text-traffic-slow",
} as const;

function ExploreScreen() {
  return (
    <Screen title="Explorar" subtitle="Categorías cerca de tu posición">
      <div className="grid grid-cols-4 gap-2">
        {CATEGORIES.map((c) => (
          <button
            key={c.id}
            className="flex flex-col items-center gap-1.5 rounded-2xl border border-border bg-surface px-1 py-3 text-center"
          >
            <span className="text-xl" aria-hidden>
              {c.icon}
            </span>
            <span className="text-[10px] leading-tight text-muted-foreground">{c.label}</span>
          </button>
        ))}
      </div>

      <SectionLabel>Cerca de ti</SectionLabel>
      <Panel>
        {NEARBY_PLACES.map((p) => (
          <Row
            key={p.id}
            icon={<span>📍</span>}
            title={p.name}
            detail={`${p.category} · ${p.address}`}
            trailing={
              <div className="flex flex-col items-end gap-0.5">
                <span>{p.distanceKm.toFixed(1)} km</span>
                {p.rating && (
                  <span className="flex items-center gap-0.5">
                    <Star className="size-3 fill-current text-traffic-slow" />
                    {p.rating}
                  </span>
                )}
              </div>
            }
          />
        ))}
      </Panel>

      <SectionLabel>Tráfico e incidentes</SectionLabel>
      <Panel>
        {INCIDENTS.map((i) => (
          <Row
            key={i.id}
            icon={<span className={incidentColor[i.type]}>⚠</span>}
            title={i.label}
            detail={i.detail}
            trailing={`+${i.delayMin} min`}
          />
        ))}
      </Panel>

      <p className="mt-4 text-xs text-muted-foreground">
        Los resultados provendrán de servicios geográficos externos. Los datos mostrados son de
        demostración.
      </p>
    </Screen>
  );
}
