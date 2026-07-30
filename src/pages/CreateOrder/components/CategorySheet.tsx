import { Check } from 'lucide-react';

import type { Category } from '@/api/types';

interface CategorySheetProps {
  categories: Category[];
  selectedId: string;
  onSelect: (id: string) => void;
  onClose: () => void;
}

/** Нижний лист выбора категории. Экрана в макете нет — вид собран по теме. */
export function CategorySheet({
  categories,
  selectedId,
  onSelect,
  onClose,
}: CategorySheetProps) {
  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-canvas/70"
      />
      <div className="relative flex max-h-[85dvh] w-full flex-col gap-1 overflow-y-auto rounded-t-card border-t border-line bg-bg px-gutter pt-card pb-action-safe sm:max-w-phone">
        <span className="mx-auto mb-2 h-1.5 w-16 rounded-pill bg-line" />
        <p className="pb-1 text-meta font-bold tracking-wide text-second uppercase">
          Категория
        </p>
        {categories.map((category) => {
          const isSelected = category.id === selectedId;
          return (
            <button
              key={category.id}
              type="button"
              onClick={() => {
                onSelect(category.id);
              }}
              className="flex min-h-control items-center justify-between border-b border-line text-left last:border-b-0"
            >
              <span
                className={[
                  'text-lead font-medium',
                  isSelected ? 'text-accent' : 'text-text',
                ].join(' ')}
              >
                {category.title}
              </span>
              {isSelected ? (
                <Check
                  size={18}
                  strokeWidth={2.4}
                  className="text-accent"
                  aria-hidden="true"
                />
              ) : null}
            </button>
          );
        })}
      </div>
    </div>
  );
}
