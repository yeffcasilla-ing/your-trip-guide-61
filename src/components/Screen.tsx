import type { ReactNode } from "react";

export function Screen({
  title,
  subtitle,
  action,
  children,
}: {
  title: string;
  subtitle?: string;
  action?: ReactNode;
  children: ReactNode;
}) {
  return (
    <div className="mx-auto min-h-screen w-full max-w-lg px-4 pb-28 pt-10">
      <header className="mb-6 flex items-end justify-between gap-4">
        <div>
          <h1 className="text-3xl font-semibold">{title}</h1>
          {subtitle && <p className="mt-1 text-sm text-muted-foreground">{subtitle}</p>}
        </div>
        {action}
      </header>
      {children}
    </div>
  );
}

export function SectionLabel({ children }: { children: ReactNode }) {
  return (
    <h2 className="mb-3 mt-8 text-xs font-semibold uppercase tracking-[0.14em] text-muted-foreground first:mt-0">
      {children}
    </h2>
  );
}

export function Row({
  icon,
  title,
  detail,
  trailing,
}: {
  icon: ReactNode;
  title: string;
  detail?: string;
  trailing?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-base">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {detail && <p className="truncate text-xs text-muted-foreground">{detail}</p>}
      </div>
      {trailing && <div className="shrink-0 text-xs text-muted-foreground tabular">{trailing}</div>}
    </div>
  );
}

export function Panel({ children }: { children: ReactNode }) {
  return <div className="panel-surface divide-y divide-border overflow-hidden">{children}</div>;
}
