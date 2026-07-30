interface DateTimeRowProps {
  /** Значение datetime-local, например «2026-07-30T12:00». */
  value: string;
  onChange: (value: string) => void;
}

/**
 * Строка «Дата и время» из фрейма 06. Своего пикера в макете нет, поэтому
 * берём системный datetime-local: его иконка календаря стоит справа, как в макете.
 */
export function DateTimeRow({ value, onChange }: DateTimeRowProps) {
  return (
    <label className="flex h-cta items-center rounded-btn border border-line bg-surface px-card focus-within:border-accent">
      <input
        type="datetime-local"
        value={value}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className={[
          'w-full min-w-0 bg-transparent text-body font-medium outline-none',
          value === '' ? 'text-muted' : 'text-text',
        ].join(' ')}
      />
    </label>
  );
}
