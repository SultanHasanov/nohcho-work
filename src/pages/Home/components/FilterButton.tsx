import { SlidersHorizontal } from 'lucide-react';

/** Кнопка «Фильтр» из фрейма 03. Экрана фильтров в макете нет — пока неактивна. */
export function FilterButton() {
  return (
    <button
      type="button"
      disabled
      className="flex h-field shrink-0 items-center gap-2 rounded-pill bg-accent px-4 disabled:opacity-60"
    >
      <SlidersHorizontal
        size={17}
        strokeWidth={2}
        className="text-text"
        aria-hidden="true"
      />
      <span className="text-control font-semibold text-text">Фильтр</span>
    </button>
  );
}
