interface TabsProps<T extends string> {
  options: readonly { value: T; label: string }[];
  value: T;
  onChange: (value: T) => void;
}

/** Подчёркнутые табы из фрейма 10: высота 44px, активный акцентом. */
export function Tabs<T extends string>({ options, value, onChange }: TabsProps<T>) {
  return (
    <div role="tablist" className="flex border-b border-line">
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
              'h-control flex-1 border-b-2 text-control font-semibold',
              isActive ? 'border-accent text-accent' : 'border-transparent text-second',
            ].join(' ')}
          >
            {option.label}
          </button>
        );
      })}
    </div>
  );
}
