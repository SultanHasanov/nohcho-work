import { SlidersHorizontal } from 'lucide-react';

/** Компактная кнопка фильтров. Экрана фильтров пока нет, поэтому она неактивна. */
export function FilterButton() {
  return (
    <button
      type="button"
      disabled
      aria-label="Фильтры"
      className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent disabled:opacity-60"
    >
      <SlidersHorizontal
        size={21}
        strokeWidth={2}
        className="text-text"
        aria-hidden="true"
      />
    </button>
  );
}
