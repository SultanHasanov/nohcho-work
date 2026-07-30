interface ChipProps {
  label: string;
  isSelected: boolean;
  onClick: () => void;
}

/** Чип выбора из фрейма 08: выбранный — на мягком акценте с рамкой акцента. */
export function Chip({ label, isSelected, onClick }: ChipProps) {
  return (
    <button
      type="button"
      aria-pressed={isSelected}
      onClick={onClick}
      className={[
        'rounded-pill border px-3.5 py-2.5 text-caption font-semibold',
        isSelected
          ? 'border-accent bg-accent-soft text-accent'
          : 'border-line bg-surface text-second',
      ].join(' ')}
    >
      {label}
    </button>
  );
}
