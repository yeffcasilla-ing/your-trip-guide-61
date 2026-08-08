import type { ReactNode } from "react";

export function Toggle({
  checked,
  onChange,
  label,
}: {
  checked: boolean;
  onChange: (v: boolean) => void;
  label: string;
}) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={checked}
      aria-label={label}
      onClick={() => onChange(!checked)}
      className={`press relative h-6.5 w-11 shrink-0 rounded-full border transition-colors ${
        checked ? "border-primary bg-primary" : "border-border bg-secondary"
      }`}
    >
      <span
        className={`absolute top-0.5 size-5 rounded-full bg-surface shadow-float transition-[left] duration-300 ease-[cubic-bezier(0.22,1,0.36,1)] ${
          checked ? "left-[1.375rem]" : "left-0.5"
        }`}
      />
    </button>
  );
}

export function SettingRow({
  icon,
  title,
  detail,
  children,
}: {
  icon: ReactNode;
  title: string;
  detail?: string;
  children?: ReactNode;
}) {
  return (
    <div className="flex items-center gap-3 px-4 py-3 transition-colors hover:bg-secondary/60">
      <div className="flex size-10 shrink-0 items-center justify-center rounded-full bg-secondary text-base">
        {icon}
      </div>
      <div className="min-w-0 flex-1">
        <p className="truncate text-sm font-medium">{title}</p>
        {detail && <p className="truncate text-xs text-muted-foreground">{detail}</p>}
      </div>
      {children}
    </div>
  );
}

export function Segmented<T extends string>({
  value,
  options,
  onChange,
}: {
  value: T;
  options: { id: T; label: string }[];
  onChange: (v: T) => void;
}) {
  return (
    <div className="flex rounded-full border border-border bg-surface p-1">
      {options.map((o) => (
        <button
          key={o.id}
          type="button"
          onClick={() => onChange(o.id)}
          aria-pressed={value === o.id}
          className={`press flex-1 rounded-full px-3 py-2 text-xs font-medium ${
            value === o.id ? "bg-primary text-primary-foreground shadow-float" : "text-muted-foreground"
          }`}
        >
          {o.label}
        </button>
      ))}
    </div>
  );
}
