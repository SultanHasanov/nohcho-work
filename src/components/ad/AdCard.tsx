import { MoreVertical } from 'lucide-react';

import type { Category, ServiceAd } from '@/api/types';
import { formatPriceUnit, plural } from '@/lib/format';

interface AdCardProps {
  ad: ServiceAd;
  categories: Category[];
}

/** Карточка объявления из фрейма 11. */
export function AdCard({ ad, categories }: AdCardProps) {
  const category = categories.find((item) => item.id === ad.categoryId)?.title;

  return (
    <article className="flex flex-col gap-2 rounded-card border border-line bg-surface p-card">
      <div className="flex items-start justify-between gap-2.5">
        <h3 className="text-body font-semibold text-text">{ad.title}</h3>
        {/* Меню действий над объявлением в макете не раскрыто — кнопка неактивна. */}
        <button
          type="button"
          disabled
          aria-label="Действия с объявлением"
          className="-mt-1.5 -mr-1.5 flex size-7 shrink-0 items-center justify-center"
        >
          <MoreVertical
            size={18}
            strokeWidth={2.4}
            className="text-second"
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="text-screen-title font-extrabold text-accent">
        {formatPriceUnit(ad.price, ad.priceUnit)}
      </p>

      <div className="flex flex-wrap items-center gap-2">
        {category ? (
          <span className="rounded-pill bg-surface-2 px-2.75 py-1.25 text-note font-semibold text-second">
            {category}
          </span>
        ) : null}
        <span className="text-note font-medium text-second">{ad.city}</span>
      </div>

      <p className="text-meta font-medium text-muted">
        {ad.views} {plural(ad.views, 'просмотр', 'просмотра', 'просмотров')} ·{' '}
        {ad.responsesCount} {plural(ad.responsesCount, 'отклик', 'отклика', 'откликов')}
      </p>
    </article>
  );
}
