import {
  createContext,
  useCallback,
  useContext,
  useEffect,
  useMemo,
  useState,
  type ReactNode,
} from "react";

import type { VehicleType } from "./mock-data";

export type Units = "metric" | "imperial";
export type RoutePreference = "fastest" | "shortest" | "eco";
export type VoiceVolume = "off" | "low" | "medium" | "high";
export type MapStyle = "auto" | "day" | "night" | "satellite";

export type Settings = {
  vehicle: VehicleType;
  units: Units;
  routePreference: RoutePreference;
  avoidTolls: boolean;
  avoidHighways: boolean;
  avoidFerries: boolean;
  voiceVolume: VoiceVolume;
  voiceStreetNames: boolean;
  speedAlerts: boolean;
  trafficAlerts: boolean;
  arrivalAlerts: boolean;
  keepScreenOn: boolean;
  showSpeedometer: boolean;
  autoRecenter: boolean;
  mapStyle: MapStyle;
  animations: boolean;
  saveHistory: boolean;
  shareLocation: boolean;
};

export const DEFAULT_SETTINGS: Settings = {
  vehicle: "car",
  units: "metric",
  routePreference: "fastest",
  avoidTolls: true,
  avoidHighways: false,
  avoidFerries: false,
  voiceVolume: "medium",
  voiceStreetNames: true,
  speedAlerts: true,
  trafficAlerts: true,
  arrivalAlerts: true,
  keepScreenOn: true,
  showSpeedometer: true,
  autoRecenter: true,
  mapStyle: "auto",
  animations: true,
  saveHistory: true,
  shareLocation: false,
};

const STORAGE_KEY = "rumbo.settings.v1";

type Ctx = {
  settings: Settings;
  update: <K extends keyof Settings>(key: K, value: Settings[K]) => void;
  reset: () => void;
};

const SettingsContext = createContext<Ctx | null>(null);

export function SettingsProvider({ children }: { children: ReactNode }) {
  const [settings, setSettings] = useState<Settings>(DEFAULT_SETTINGS);

  useEffect(() => {
    try {
      const raw = localStorage.getItem(STORAGE_KEY);
      if (raw) setSettings({ ...DEFAULT_SETTINGS, ...(JSON.parse(raw) as Partial<Settings>) });
    } catch {
      /* almacenamiento no disponible */
    }
  }, []);

  const update = useCallback<Ctx["update"]>((key, value) => {
    setSettings((prev) => {
      const next = { ...prev, [key]: value };
      try {
        localStorage.setItem(STORAGE_KEY, JSON.stringify(next));
      } catch {
        /* ignorar */
      }
      return next;
    });
  }, []);

  const reset = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
    try {
      localStorage.removeItem(STORAGE_KEY);
    } catch {
      /* ignorar */
    }
  }, []);

  const value = useMemo(() => ({ settings, update, reset }), [settings, update, reset]);

  return <SettingsContext.Provider value={value}>{children}</SettingsContext.Provider>;
}

export function useSettings() {
  const ctx = useContext(SettingsContext);
  if (!ctx) throw new Error("useSettings debe usarse dentro de SettingsProvider");
  return ctx;
}
