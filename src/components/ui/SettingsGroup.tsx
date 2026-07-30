import { ChevronRight } from 'lucide-react';
import type { ReactNode } from 'react';

/** Карточка-группа строк 48px с разделителями — фрейм 18. */
export function SettingsGroup({ children }: { children: ReactNode }) {
  return (
    <div className="flex flex-col rounded-card border border-line bg-surface">
      {children}
    </div>
  );
}

const rowClass =
  'flex h-12 items-center gap-3 border-b border-line px-card last:border-b-0';

interface SettingsRowProps {
  label: string;
  /** Значение справа: «Русский», «Грозный», «@islam_95». */
  value?: string;
  /** Переключатель вместо шеврона. */
  control?: ReactNode;
  onClick?: () => void;
}

export function SettingsRow({ label, value, control, onClick }: SettingsRowProps) {
  const content = (
    <>
      <span className="flex-1 text-lead font-semibold text-text">{label}</span>
      {value ? (
        <span className="text-control font-medium text-second">{value}</span>
      ) : null}
      {control ?? (
        <ChevronRight
          size={18}
          strokeWidth={2}
          className="shrink-0 text-muted"
          aria-hidden="true"
        />
      )}
    </>
  );

  if (control) {
    return <div className={rowClass}>{content}</div>;
  }

  return (
    <button
      type="button"
      onClick={onClick}
      disabled={onClick === undefined}
      className={`${rowClass} text-left disabled:opacity-60`}
    >
      {content}
    </button>
  );
}

/** Отдельная строка опасного действия: «Выйти». */
export function DangerRow({ label, onClick }: { label: string; onClick: () => void }) {
  return (
    <div className="flex flex-col rounded-card border border-line bg-surface">
      <button
        type="button"
        onClick={onClick}
        className="flex h-12 items-center px-card text-left text-lead font-semibold text-danger"
      >
        {label}
      </button>
    </div>
  );
}
