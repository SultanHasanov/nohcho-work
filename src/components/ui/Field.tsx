import type { ReactNode } from 'react';

interface FieldProps {
  label: string;
  /** Приписка «(необязательно)» рядом с лейблом, как в фрейме 06. */
  hint?: string;
  children: ReactNode;
}

/** Лейбл поля 11/700 капсом и его содержимое. */
export function Field({ label, hint, children }: FieldProps) {
  return (
    <div className="flex flex-col gap-2">
      <span className="text-meta font-bold tracking-wide text-second uppercase">
        {label}
        {hint ? <span className="text-muted"> {hint}</span> : null}
      </span>
      {children}
    </div>
  );
}
