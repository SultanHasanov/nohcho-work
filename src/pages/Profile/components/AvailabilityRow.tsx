interface AvailabilityRowProps {
  isAvailable: boolean;
  onToggle: () => void;
}

/** Строка «Статус» с переключателем «На работе» — фрейм 13. */
export function AvailabilityRow({ isAvailable, onToggle }: AvailabilityRowProps) {
  return (
    <div className="flex items-center justify-between rounded-card border border-line bg-surface px-card py-2.25">
      <span className="text-lead font-semibold text-text">Статус</span>
      <button
        type="button"
        aria-pressed={isAvailable}
        onClick={onToggle}
        className={[
          'flex h-control items-center gap-2 rounded-btn px-4.5',
          isAvailable
            ? 'bg-accent active:bg-accent-pressed'
            : 'border border-line bg-surface-2',
        ].join(' ')}
      >
        <span
          className={[
            'size-2.25 rounded-pill',
            isAvailable ? 'bg-text' : 'bg-muted',
          ].join(' ')}
        />
        <span className="text-lead font-semibold text-text">
          {isAvailable ? 'На работе' : 'Не на работе'}
        </span>
      </button>
    </div>
  );
}
