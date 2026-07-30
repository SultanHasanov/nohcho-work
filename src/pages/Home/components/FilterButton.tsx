import { SlidersHorizontal } from 'lucide-react';

interface FilterButtonProps {
  /** Сколько фильтров применено: цифра на бейдже. */
  activeCount: number;
  onClick: () => void;
}

/** Компактная кнопка фильтров рядом с поиском. */
export function FilterButton({ activeCount, onClick }: FilterButtonProps) {
  return (
    <button
      type="button"
      aria-label="Фильтры"
      onClick={onClick}
      className="relative flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent active:bg-accent-pressed"
    >
      <SlidersHorizontal
        size={21}
        strokeWidth={2}
        className="text-text"
        aria-hidden="true"
      />
      {activeCount > 0 ? (
        <span className="absolute -top-0.5 -right-0.5 flex size-5 items-center justify-center rounded-pill border-2 border-bg bg-surface-2 text-micro font-bold text-text">
          {activeCount}
        </span>
      ) : null}
    </button>
  );
}
