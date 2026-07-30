import type { ReactNode } from 'react';

interface SelectCardProps {
  title: string;
  subtitle: string;
  icon: ReactNode;
  isSelected: boolean;
  onSelect: () => void;
}

/** Карточка выбора из фрейма 02: иконочный тайл, тексты и бейдж-галочка. */
export function SelectCard({
  title,
  subtitle,
  icon,
  isSelected,
  onSelect,
}: SelectCardProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onSelect}
      className={[
        'relative flex h-35 w-full flex-col justify-center gap-2.5 rounded-card border-2 bg-surface p-5 text-left',
        isSelected ? 'border-accent' : 'border-line',
      ].join(' ')}
    >
      <span
        className={[
          'flex size-11 items-center justify-center rounded-btn',
          isSelected ? 'bg-accent-soft text-accent' : 'bg-surface-2 text-second',
        ].join(' ')}
      >
        {icon}
      </span>
      <span className="text-card-title font-bold text-text">{title}</span>
      <span className="text-caption font-medium text-second">{subtitle}</span>
      {isSelected ? (
        <span className="absolute top-4 right-4 flex size-6.5 items-center justify-center rounded-pill bg-accent">
          <CheckIcon />
        </span>
      ) : null}
    </button>
  );
}

function CheckIcon() {
  return (
    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" aria-hidden="true">
      <path
        d="M5 13l4.5 4.5L19 7"
        stroke="var(--color-text)"
        strokeWidth="2.6"
        strokeLinecap="round"
        strokeLinejoin="round"
      />
    </svg>
  );
}
