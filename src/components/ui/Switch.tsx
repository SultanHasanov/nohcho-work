interface SwitchProps {
  isOn: boolean;
  label: string;
  onToggle: () => void;
}

/** Переключатель 44×26 из фрейма 18. */
export function Switch({ isOn, label, onToggle }: SwitchProps) {
  return (
    <button
      type="button"
      role="switch"
      aria-checked={isOn}
      aria-label={label}
      onClick={onToggle}
      className={[
        'flex h-6.5 w-11 shrink-0 items-center rounded-pill border px-0.5',
        isOn
          ? 'justify-end border-accent bg-accent'
          : 'justify-start border-line bg-surface-2',
      ].join(' ')}
    >
      <span className="size-5.5 rounded-pill bg-text" />
    </button>
  );
}
