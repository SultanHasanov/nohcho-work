import { observer } from 'mobx-react-lite';

import type { RatingSummary } from '@/api/types';
import { Stars } from '@/components/ui/Stars';
import { formatRating, formatShare, plural } from '@/lib/format';

interface RatingCardProps {
  summary: RatingSummary;
  share: (rating: number) => number;
}

const rows = [5, 4, 3, 2, 1];

/** Сводка рейтинга с гистограммой — верх фрейма 17. */
export const RatingCard = observer(function RatingCard({
  summary,
  share,
}: RatingCardProps) {
  return (
    <div className="flex items-center gap-4.5 rounded-card border border-line bg-surface p-card">
      <div className="flex shrink-0 flex-col items-center gap-1">
        <span className="text-logo leading-none font-extrabold text-text">
          {formatRating(summary.average)}
        </span>
        <Stars rating={summary.average} />
        <span className="text-note font-medium text-second">
          {summary.total} {plural(summary.total, 'отзыв', 'отзыва', 'отзывов')}
        </span>
      </div>

      <div className="flex flex-1 flex-col gap-1.75">
        {rows.map((rating) => (
          <div key={rating} className="flex items-center gap-2">
            <span className="w-2 text-meta font-medium text-second">{rating}</span>
            <span className="h-1.5 flex-1 overflow-hidden rounded-pill bg-surface-2">
              <span
                className="block h-full rounded-pill bg-accent"
                style={{ width: `${String(Math.round(share(rating) * 100))}%` }}
              />
            </span>
            <span className="w-7 text-right text-meta font-medium text-muted">
              {formatShare(share(rating))}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
});
