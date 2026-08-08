import { createFileRoute } from "@tanstack/react-router";
import { useState } from "react";
import { Plus } from "lucide-react";

import { Panel, Row, Screen } from "@/components/Screen";
import { SAVED_LISTS, SAVED_PLACES } from "@/lib/mock-data";

export const Route = createFileRoute("/guardados")({
  head: () => ({
    meta: [
      { title: "Lugares guardados y favoritos | Rumbo" },
      {
        name: "description",
        content:
          "Organiza casa, trabajo, familia y clientes en listas propias. Guarda, edita y elimina tus lugares favoritos.",
      },
      { property: "og:title", content: "Lugares guardados y favoritos | Rumbo" },
      {
        property: "og:description",
        content: "Listas personales de lugares: casa, trabajo, familia, clientes y favoritos.",
      },
    ],
  }),
  component: SavedScreen,
});

function SavedScreen() {
  const [list, setList] = useState(SAVED_LISTS[0]!);
  const places = SAVED_PLACES.filter((p) => p.list === list);

  return (
    <Screen
      title="Guardados"
      subtitle="Tus lugares, organizados en listas"
      action={
        <button className="flex size-10 items-center justify-center rounded-full bg-primary text-primary-foreground">
          <Plus className="size-5" />
        </button>
      }
    >
      <div className="flex gap-2 overflow-x-auto pb-1 [scrollbar-width:none]">
        {SAVED_LISTS.map((l) => (
          <button
            key={l}
            onClick={() => setList(l)}
            aria-pressed={list === l}
            className={`shrink-0 rounded-full border px-3.5 py-1.5 text-xs font-medium transition-colors ${
              list === l
                ? "border-primary bg-primary text-primary-foreground"
                : "border-border bg-surface text-muted-foreground"
            }`}
          >
            {l}
          </button>
        ))}
      </div>

      <div className="mt-5">
        {places.length > 0 ? (
          <Panel>
            {places.map((p) => (
              <Row key={p.id} icon={<span>{p.icon}</span>} title={p.name} detail={p.address} trailing="Editar" />
            ))}
          </Panel>
        ) : (
          <div className="panel-surface px-4 py-10 text-center text-sm text-muted-foreground">
            Esta lista aún no tiene lugares guardados.
          </div>
        )}
      </div>
    </Screen>
  );
}
