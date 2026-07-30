import type { ReactNode } from 'react';

interface EmptyStateProps {
  icon: ReactNode;
  title: string;
  description: string;
  actionLabel?: string;
  onAction?: () => void;
}

/** Пустой список из фрейма 03b: круг 72px, тексты по центру, кнопка по содержимому. */
export function EmptyState({
  icon,
  title,
  description,
  actionLabel,
  onAction,
}: EmptyStateProps) {
  return (
    <div className="flex flex-1 flex-col items-center justify-center gap-card rounded-card border border-line bg-surface p-6 text-center">
      <span className="flex size-18 items-center justify-center rounded-pill bg-surface-2 text-icon-off">
        {icon}
      </span>
      <p className="text-body font-bold text-text">{title}</p>
      <p className="max-w-60 text-caption font-medium text-second">{description}</p>
      {actionLabel && onAction ? (
        <button
          type="button"
          onClick={onAction}
          className="h-control rounded-btn bg-accent px-5.5 text-lead font-semibold text-text active:bg-accent-pressed"
        >
          {actionLabel}
        </button>
      ) : null}
    </div>
  );
}
