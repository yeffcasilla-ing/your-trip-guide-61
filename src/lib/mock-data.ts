/**
 * Datos de demostración para el esqueleto de pantallas (Fase 2).
 * Se reemplazarán por proveedores externos (mapas, lugares, rutas) en fases
 * posteriores. Ninguna de estas cifras representa información real.
 */

export type VehicleType =
  | "car"
  | "motorcycle"
  | "truck"
  | "bus"
  | "heavy"
  | "bicycle"
  | "pedestrian";

export const VEHICLES: { id: VehicleType; label: string; icon: string }[] = [
  { id: "car", label: "Automóvil", icon: "🚗" },
  { id: "motorcycle", label: "Motocicleta", icon: "🏍️" },
  { id: "truck", label: "Camión", icon: "🚚" },
  { id: "bus", label: "Autobús", icon: "🚌" },
  { id: "heavy", label: "Vehículo pesado", icon: "🚐" },
  { id: "bicycle", label: "Bicicleta", icon: "🚲" },
  { id: "pedestrian", label: "Peatón", icon: "🚶" },
];

export type Category = { id: string; label: string; icon: string };

export const CATEGORIES: Category[] = [
  { id: "restaurants", label: "Restaurantes", icon: "🍽️" },
  { id: "fuel", label: "Gasolineras", icon: "⛽" },
  { id: "hospitals", label: "Hospitales", icon: "🏥" },
  { id: "pharmacies", label: "Farmacias", icon: "💊" },
  { id: "banks", label: "Bancos", icon: "🏦" },
  { id: "markets", label: "Supermercados", icon: "🛒" },
  { id: "hotels", label: "Hoteles", icon: "🛏️" },
  { id: "workshops", label: "Talleres", icon: "🔧" },
  { id: "parking", label: "Estacionamientos", icon: "🅿️" },
  { id: "tourism", label: "Turismo", icon: "📸" },
];

export type Place = {
  id: string;
  name: string;
  address: string;
  category: string;
  distanceKm: number;
  rating?: number;
  open?: boolean;
};

export const NEARBY_PLACES: Place[] = [
  { id: "p1", name: "Café Meridiano", address: "Av. Central 214", category: "Restaurante", distanceKm: 0.4, rating: 4.6, open: true },
  { id: "p2", name: "Estación Norte", address: "Calle 9 con Av. 3", category: "Gasolinera", distanceKm: 1.2, rating: 4.1, open: true },
  { id: "p3", name: "Clínica San Miguel", address: "Av. Libertad 88", category: "Hospital", distanceKm: 2.1, rating: 4.4, open: true },
  { id: "p4", name: "Farmacia Aurora", address: "Calle 12 #45", category: "Farmacia", distanceKm: 0.9, rating: 4.2, open: false },
  { id: "p5", name: "Parking Plaza", address: "Bulevar del Río 5", category: "Estacionamiento", distanceKm: 1.7, open: true },
];

export const RECENT_SEARCHES = [
  { id: "r1", label: "Aeropuerto Internacional", detail: "Terminal 2 · 24 km" },
  { id: "r2", label: "Universidad Central", detail: "Campus sur · 8,4 km" },
  { id: "r3", label: "Mercado del Puerto", detail: "Zona histórica · 5,1 km" },
];

export type SavedPlace = {
  id: string;
  name: string;
  address: string;
  list: string;
  icon: string;
};

export const SAVED_PLACES: SavedPlace[] = [
  { id: "s1", name: "Casa", address: "Calle Almendros 34", list: "Accesos rápidos", icon: "🏠" },
  { id: "s2", name: "Trabajo", address: "Torre Delta, piso 7", list: "Accesos rápidos", icon: "💼" },
  { id: "s3", name: "Casa de mis padres", address: "Av. del Parque 120", list: "Familia", icon: "⭐" },
  { id: "s4", name: "Cliente Novara", address: "Polígono Este, nave 4", list: "Clientes", icon: "📍" },
];

export const SAVED_LISTS = ["Accesos rápidos", "Familia", "Clientes", "Favoritos"];

export type SavedTrip = {
  id: string;
  from: string;
  to: string;
  stops: number;
  minutes: number;
  km: number;
};

export const SAVED_TRIPS: SavedTrip[] = [
  { id: "t1", from: "Casa", to: "Trabajo", stops: 0, minutes: 24, km: 12.4 },
  { id: "t2", from: "Casa", to: "Universidad", stops: 1, minutes: 31, km: 15.8 },
  { id: "t3", from: "Trabajo", to: "Casa", stops: 2, minutes: 28, km: 13.1 },
];

export type TripHistoryEntry = {
  id: string;
  date: string;
  time: string;
  from: string;
  to: string;
  km: number;
  minutes: number;
};

export const TRIP_HISTORY: TripHistoryEntry[] = [
  { id: "h1", date: "Hoy", time: "08:12", from: "Casa", to: "Trabajo", km: 12.4, minutes: 26 },
  { id: "h2", date: "Ayer", time: "19:40", from: "Trabajo", to: "Mercado del Puerto", km: 6.2, minutes: 17 },
  { id: "h3", date: "Ayer", time: "08:05", from: "Casa", to: "Trabajo", km: 12.4, minutes: 23 },
  { id: "h4", date: "12 mar", time: "16:30", from: "Casa", to: "Aeropuerto", km: 24.6, minutes: 38 },
];

export type Incident = {
  id: string;
  type: "accident" | "works" | "closure" | "congestion";
  label: string;
  detail: string;
  delayMin: number;
};

export const INCIDENTS: Incident[] = [
  { id: "i1", type: "congestion", label: "Tráfico denso", detail: "Av. Central, tramo norte", delayMin: 7 },
  { id: "i2", type: "works", label: "Obras en calzada", detail: "Bulevar del Río", delayMin: 4 },
  { id: "i3", type: "accident", label: "Incidente reportado", detail: "Salida 12, autopista este", delayMin: 11 },
];

export const ACTIVE_TRIP = {
  destination: "Torre Delta, piso 7",
  etaLabel: "08:41",
  remainingMin: 24,
  remainingKm: 12.4,
  nextManeuver: "Gira a la derecha",
  nextStreet: "Av. Libertad",
  nextDistanceM: 320,
  speedKmh: 48,
  progress: 0.35,
};
