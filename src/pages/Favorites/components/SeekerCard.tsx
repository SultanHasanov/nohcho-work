import type { FavoriteSeeker } from '@/api/types';
import { Avatar } from '@/components/ui/Avatar';
import { Stars } from '@/components/ui/Stars';
import { formatPriceUnit, formatRating } from '@/lib/format';

/** Карточка исполнителя во вкладке «Исполнители» экрана 19. */
export function SeekerCard({ seeker }: { seeker: FavoriteSeeker }) {
  return (
    <article className="flex flex-col gap-3 rounded-card border border-line bg-surface p-card">
      <div className="flex items-center gap-3">
        <Avatar name={seeker.name} sizeClass="size-12" textClass="text-body" />
        <div className="flex min-w-0 flex-1 flex-col gap-1">
          <p className="truncate text-body font-semibold text-text">{seeker.name}</p>
          <p className="flex items-center gap-1.75">
            <Stars rating={seeker.rating} className="text-note" />
            <span className="text-note font-semibold text-text">
              {formatRating(seeker.rating)}
            </span>
            <span className="truncate text-meta font-medium text-muted">
              · {seeker.categoryTitle}
            </span>
          </p>
          <p className="text-body font-extrabold text-accent">
            от {formatPriceUnit(seeker.priceFrom, seeker.priceUnit)}
          </p>
        </div>
      </div>

      {/* Диалог заводится по заказу — писать исполнителю напрямую пока некуда. */}
      <button
        type="button"
        disabled
        className="h-control rounded-btn border border-line text-lead font-semibold text-text disabled:opacity-60"
      >
        Написать
      </button>
    </article>
  );
}
