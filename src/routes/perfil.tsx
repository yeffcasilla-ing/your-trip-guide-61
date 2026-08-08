import { createFileRoute } from "@tanstack/react-router";

import { Panel, Row, Screen, SectionLabel } from "@/components/Screen";
import { VEHICLES } from "@/lib/mock-data";
import { useTheme, type ThemePreference } from "@/lib/theme";

export const Route = createFileRoute("/perfil")({
  head: () => ({
    meta: [
      { title: "Perfil, vehículo y configuración | Rumbo" },
      {
        name: "description",
        content:
          "Ajusta tu vehículo, preferencias de ruta, voz, apariencia clara u oscura y controles de privacidad de ubicación.",
      },
      { property: "og:title", content: "Perfil, vehículo y configuración | Rumbo" },
      {
        property: "og:description",
        content: "Vehículo, preferencias de navegación, apariencia y privacidad en un solo lugar.",
      },
    ],
  }),
  component: ProfileScreen,
});

const THEMES: { id: ThemePreference; label: string }[] = [
  { id: "light", label: "Claro" },
  { id: "dark", label: "Oscuro" },
  { id: "system", label: "Automático" },
];

function ProfileScreen() {
  const { preference, setPreference } = useTheme();

  return (
    <Screen title="Perfil" subtitle="Cuenta, vehículo y preferencias">
      <div className="panel-surface flex items-center gap-4 p-4">
        <div className="flex size-14 items-center justify-center rounded-full bg-primary text-xl font-semibold text-primary-foreground">
          R
        </div>
        <div>
          <p className="font-semibold">Conductor</p>
          <p className="text-xs text-muted-foreground">Sesión local · sin cuenta vinculada</p>
        </div>
      </div>

      <SectionLabel>Apariencia</SectionLabel>
      <div className="flex rounded-full border border-border bg-surface p-1">
        {THEMES.map((t) => (
          <button
            key={t.id}
            onClick={() => setPreference(t.id)}
            aria-pressed={preference === t.id}
            className={`flex-1 rounded-full px-3 py-2 text-xs font-medium transition-colors ${
              preference === t.id ? "bg-primary text-primary-foreground" : "text-muted-foreground"
            }`}
          >
            {t.label}
          </button>
        ))}
      </div>

      <SectionLabel>Vehículo</SectionLabel>
      <div className="grid grid-cols-2 gap-2">
        {VEHICLES.map((v) => (
          <button
            key={v.id}
            className="flex items-center gap-2 rounded-2xl border border-border bg-surface px-3 py-3 text-sm"
          >
            <span aria-hidden>{v.icon}</span>
            {v.label}
          </button>
        ))}
      </div>

      <SectionLabel>Navegación</SectionLabel>
      <Panel>
        <Row icon={<span>🔊</span>} title="Voz e idioma" detail="Español · volumen medio" trailing="›" />
        <Row icon={<span>🛣️</span>} title="Preferencias de ruta" detail="Más rápida · evitar peajes" trailing="›" />
        <Row icon={<span>📏</span>} title="Unidades" detail="Kilómetros por hora" trailing="›" />
        <Row icon={<span>🗺️</span>} title="Mapa" detail="Proveedor, estilo y vista" trailing="›" />
      </Panel>

      <SectionLabel>Privacidad</SectionLabel>
      <Panel>
        <Row icon={<span>🕘</span>} title="Historial de viajes" detail="Guardado en este dispositivo" trailing="›" />
        <Row icon={<span>📡</span>} title="Ubicación" detail="Solo mientras usas la app" trailing="›" />
        <Row icon={<span>🔗</span>} title="Compartir ubicación" detail="Desactivado" trailing="›" />
        <Row icon={<span>🗑️</span>} title="Eliminar mis datos" detail="Borra historial y lugares" trailing="›" />
      </Panel>

      <SectionLabel>Notificaciones</SectionLabel>
      <Panel>
        <Row icon={<span>🔔</span>} title="Alertas de viaje" detail="Llegada, desvío y cambios de ruta" trailing="›" />
      </Panel>
    </Screen>
  );
}
