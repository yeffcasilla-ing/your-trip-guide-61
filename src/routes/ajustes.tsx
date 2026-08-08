import { createFileRoute, Link } from "@tanstack/react-router";
import { RotateCcw } from "lucide-react";

import { Panel, Screen, SectionLabel } from "@/components/Screen";
import { Segmented, SettingRow, Toggle } from "@/components/Settings";
import { VEHICLES } from "@/lib/mock-data";
import { useSettings } from "@/lib/settings";
import { useTheme, type ThemePreference } from "@/lib/theme";

export const Route = createFileRoute("/ajustes")({
  head: () => ({
    meta: [
      { title: "Ajustes de navegación, voz y privacidad | Rumbo" },
      {
        name: "description",
        content:
          "Configura vehículo, unidades, preferencias de ruta, voz, alertas, estilo de mapa, animaciones y privacidad de tu navegador GPS.",
      },
      { property: "og:title", content: "Ajustes de navegación, voz y privacidad | Rumbo" },
      {
        property: "og:description",
        content: "Vehículo, ruta, voz, alertas, apariencia y privacidad configurables y guardados en tu dispositivo.",
      },
      { property: "og:type", content: "website" },
      { name: "twitter:card", content: "summary_large_image" },
    ],
  }),
  component: SettingsScreen,
});

const THEMES: { id: ThemePreference; label: string }[] = [
  { id: "light", label: "Claro" },
  { id: "dark", label: "Oscuro" },
  { id: "system", label: "Automático" },
];

function SettingsScreen() {
  const { settings, update, reset } = useSettings();
  const { preference, setPreference } = useTheme();

  return (
    <Screen
      title="Ajustes"
      subtitle="Se guardan en este dispositivo"
      action={
        <button
          type="button"
          onClick={reset}
          className="press flex items-center gap-1.5 rounded-full border border-border px-3 py-2 text-xs font-medium text-muted-foreground"
        >
          <RotateCcw className="size-3.5" /> Restablecer
        </button>
      }
    >
      <div className="animate-rise">
        <SectionLabel>Vehículo</SectionLabel>
        <div className="grid grid-cols-2 gap-2">
          {VEHICLES.map((v, i) => (
            <button
              key={v.id}
              type="button"
              onClick={() => update("vehicle", v.id)}
              aria-pressed={settings.vehicle === v.id}
              style={{ animationDelay: `${i * 35}ms` }}
              className={`press animate-rise flex items-center gap-2 rounded-2xl border px-3 py-3 text-sm ${
                settings.vehicle === v.id
                  ? "border-primary bg-primary/10 text-foreground"
                  : "border-border bg-surface text-muted-foreground"
              }`}
            >
              <span aria-hidden className="text-base">
                {v.icon}
              </span>
              {v.label}
            </button>
          ))}
        </div>
      </div>

      <SectionLabel>Ruta</SectionLabel>
      <Segmented
        value={settings.routePreference}
        onChange={(v) => update("routePreference", v)}
        options={[
          { id: "fastest", label: "Más rápida" },
          { id: "shortest", label: "Más corta" },
          { id: "eco", label: "Eco" },
        ]}
      />
      <Panel className="mt-3">
        <SettingRow icon={<span>🪙</span>} title="Evitar peajes">
          <Toggle label="Evitar peajes" checked={settings.avoidTolls} onChange={(v) => update("avoidTolls", v)} />
        </SettingRow>
        <SettingRow icon={<span>🛣️</span>} title="Evitar autopistas">
          <Toggle
            label="Evitar autopistas"
            checked={settings.avoidHighways}
            onChange={(v) => update("avoidHighways", v)}
          />
        </SettingRow>
        <SettingRow icon={<span>⛴️</span>} title="Evitar ferris">
          <Toggle label="Evitar ferris" checked={settings.avoidFerries} onChange={(v) => update("avoidFerries", v)} />
        </SettingRow>
      </Panel>

      <SectionLabel>Unidades</SectionLabel>
      <Segmented
        value={settings.units}
        onChange={(v) => update("units", v)}
        options={[
          { id: "metric", label: "km / km/h" },
          { id: "imperial", label: "mi / mph" },
        ]}
      />

      <SectionLabel>Voz y guía</SectionLabel>
      <Segmented
        value={settings.voiceVolume}
        onChange={(v) => update("voiceVolume", v)}
        options={[
          { id: "off", label: "Silencio" },
          { id: "low", label: "Bajo" },
          { id: "medium", label: "Medio" },
          { id: "high", label: "Alto" },
        ]}
      />
      <Panel className="mt-3">
        <SettingRow icon={<span>🗣️</span>} title="Decir nombres de calles" detail="Indicaciones habladas detalladas">
          <Toggle
            label="Decir nombres de calles"
            checked={settings.voiceStreetNames}
            onChange={(v) => update("voiceStreetNames", v)}
          />
        </SettingRow>
      </Panel>

      <SectionLabel>Alertas</SectionLabel>
      <Panel>
        <SettingRow icon={<span>🚨</span>} title="Límite de velocidad">
          <Toggle label="Alertas de velocidad" checked={settings.speedAlerts} onChange={(v) => update("speedAlerts", v)} />
        </SettingRow>
        <SettingRow icon={<span>🚧</span>} title="Tráfico e incidentes">
          <Toggle
            label="Alertas de tráfico"
            checked={settings.trafficAlerts}
            onChange={(v) => update("trafficAlerts", v)}
          />
        </SettingRow>
        <SettingRow icon={<span>🏁</span>} title="Aviso de llegada">
          <Toggle
            label="Aviso de llegada"
            checked={settings.arrivalAlerts}
            onChange={(v) => update("arrivalAlerts", v)}
          />
        </SettingRow>
      </Panel>

      <SectionLabel>Mapa y pantalla</SectionLabel>
      <Segmented
        value={settings.mapStyle}
        onChange={(v) => update("mapStyle", v)}
        options={[
          { id: "auto", label: "Auto" },
          { id: "day", label: "Día" },
          { id: "night", label: "Noche" },
          { id: "satellite", label: "Satélite" },
        ]}
      />
      <Panel className="mt-3">
        <SettingRow icon={<span>🎯</span>} title="Recentrar automáticamente">
          <Toggle label="Recentrar" checked={settings.autoRecenter} onChange={(v) => update("autoRecenter", v)} />
        </SettingRow>
        <SettingRow icon={<span>⏱️</span>} title="Velocímetro en pantalla">
          <Toggle
            label="Velocímetro"
            checked={settings.showSpeedometer}
            onChange={(v) => update("showSpeedometer", v)}
          />
        </SettingRow>
        <SettingRow icon={<span>💡</span>} title="Mantener pantalla encendida">
          <Toggle label="Pantalla encendida" checked={settings.keepScreenOn} onChange={(v) => update("keepScreenOn", v)} />
        </SettingRow>
        <SettingRow icon={<span>✨</span>} title="Animaciones" detail="Movimiento del mapa y transiciones">
          <Toggle label="Animaciones" checked={settings.animations} onChange={(v) => update("animations", v)} />
        </SettingRow>
      </Panel>

      <SectionLabel>Apariencia</SectionLabel>
      <Segmented value={preference} onChange={setPreference} options={THEMES} />

      <SectionLabel>Privacidad</SectionLabel>
      <Panel>
        <SettingRow icon={<span>🕘</span>} title="Guardar historial de viajes" detail="Solo en este dispositivo">
          <Toggle label="Guardar historial" checked={settings.saveHistory} onChange={(v) => update("saveHistory", v)} />
        </SettingRow>
        <SettingRow icon={<span>🔗</span>} title="Compartir ubicación en vivo">
          <Toggle label="Compartir ubicación" checked={settings.shareLocation} onChange={(v) => update("shareLocation", v)} />
        </SettingRow>
      </Panel>

      <p className="mt-6 text-center text-xs text-muted-foreground">
        Rumbo · versión de demostración ·{" "}
        <Link to="/perfil" className="story-link text-primary">
          volver al perfil
        </Link>
      </p>
    </Screen>
  );
}
