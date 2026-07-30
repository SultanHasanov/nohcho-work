interface SegmentedProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** Сегментированный переключатель из фрейма 03: пилюля с внутренними ячейками 38px. */
export function Segmented<T extends string>({
  options,
  value,
  onChange,
}: SegmentedProps<T>) {
  return (
    <div
      role="tablist"
      className="flex gap-2 rounded-pill border border-line bg-surface p-1"
    >
      {options.map((option) => {
        const isActive = option.value === value;
        return (
          <button
            key={option.value}
            type="button"
            role="tab"
            aria-selected={isActive}
            onClick={() => {
              onChange(option.value);
            }}
            className={[
              'h-segment flex-1 rounded-pill text-control font-semibold transition-colors',
              isActive ? 'bg-accent text-text' : 'bg-transparent text-second',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
