import type { ReactNode } from 'react';

const rowClass =
  'flex h-cta items-center justify-between gap-2 rounded-btn border border-line bg-surface px-card';

interface FieldRowProps {
  /** Значение поля. Пусто — показываем плейсхолдер цветом muted. */
  value: string;
  placeholder: string;
  trailing: ReactNode;
  onClick?: () => void;
}

/** Строка-поле 52px из фрейма 06: значение слева, иконка справа, выбор по нажатию. */
export function FieldRow({ value, placeholder, trailing, onClick }: FieldRowProps) {
  const isFilled = value !== '';
  return (
    <button
      type="button"
      onClick={onClick}
      disabled={onClick === undefined}
      className={`${rowClass} text-left`}
    >
      <span
        className={[
          'truncate text-lead font-medium',
          isFilled ? 'text-text' : 'text-muted',
        ].join(' ')}
      >
        {isFilled ? value : placeholder}
      </span>
      <span className="flex shrink-0 items-center">{trailing}</span>
    </button>
  );
}

interface InputRowProps {
  value: string;
  placeholder: string;
  trailing: ReactNode;
  inputMode?: 'text' | 'numeric';
  onChange: (value: string) => void;
}

/** Та же строка 52px, но с вводом с клавиатуры: адрес и бюджет. */
export function InputRow({
  value,
  placeholder,
  trailing,
  inputMode = 'text',
  onChange,
}: InputRowProps) {
  return (
    <label className={`${rowClass} focus-within:border-accent`}>
      <input
        type="text"
        inputMode={inputMode}
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="min-w-0 flex-1 bg-transparent text-body font-medium text-text outline-none placeholder:text-muted"
      />
      <span className="flex shrink-0 items-center">{trailing}</span>
    </label>
  );
}
