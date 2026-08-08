import { Link } from "@tanstack/react-router";
import { Bookmark, Compass, Map, Route as RouteIcon, User } from "lucide-react";

const items = [
  { to: "/", label: "Mapa", icon: Map },
  { to: "/explorar", label: "Explorar", icon: Compass },
  { to: "/guardados", label: "Guardados", icon: Bookmark },
  { to: "/viajes", label: "Viajes", icon: RouteIcon },
  { to: "/perfil", label: "Perfil", icon: User },
] as const;

export function BottomNav() {
  return (
    <nav
      aria-label="Navegación principal"
      className="fixed inset-x-0 bottom-0 z-40 border-t border-border bg-surface/95 backdrop-blur-xl"
      style={{ boxShadow: "var(--shadow-panel)" }}
    >
      <ul className="mx-auto flex max-w-lg items-stretch justify-between px-2 pb-[max(0.5rem,env(safe-area-inset-bottom))] pt-2">
        {items.map(({ to, label, icon: Icon }) => (
          <li key={to} className="flex-1">
            <Link
              to={to}
              activeOptions={{ exact: to === "/" }}
              className="group flex flex-col items-center gap-1 rounded-xl px-2 py-1.5 text-muted-foreground transition-colors data-[status=active]:text-primary"
            >
              <Icon className="size-5" strokeWidth={1.9} />
              <span className="text-[11px] font-medium leading-none">{label}</span>
            </Link>
          </li>
        ))}
      </ul>
    </nav>
  );
}
