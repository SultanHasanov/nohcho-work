import { Search } from 'lucide-react';

interface SearchFieldProps {
  value: string;
  placeholder: string;
  onChange: (value: string) => void;
}

/** Поле поиска 48px из фрейма 03. */
export function SearchField({ value, placeholder, onChange }: SearchFieldProps) {
  return (
    <label className="flex h-field flex-1 items-center gap-2.5 rounded-btn border border-line bg-surface px-card">
      <Search
        size={19}
        strokeWidth={1.8}
        className="shrink-0 text-muted"
        aria-hidden="true"
      />
      <input
        type="search"
        value={value}
        placeholder={placeholder}
        onChange={(event) => {
          onChange(event.target.value);
        }}
        className="min-w-0 flex-1 bg-transparent text-lead font-medium text-text outline-none placeholder:text-muted"
      />
    </label>
  );
}
