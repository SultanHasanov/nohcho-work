import type { User } from '@/api/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatRating, plural } from '@/lib/format';

/** Аватар, имя, рейтинг и число отзывов — верх фрейма 13. */
export function ProfileSummary({ user }: { user: User }) {
  const stars = '★'.repeat(Math.round(user.rating));

  return (
    <div className="flex items-center gap-card">
      <Avatar name={user.name} sizeClass="size-18" textClass="text-logo-sm" />

      <div className="flex flex-col gap-1.5">
        <p className="text-screen-title font-bold text-text">{user.name}</p>
        <p className="flex items-center gap-2">
          <span className="text-body font-bold text-text">
            {formatRating(user.rating)}
          </span>
          <span className="text-control tracking-widest text-amber">{stars}</span>
        </p>
        <p className="text-note font-medium text-second">
          {user.reviewsCount} {plural(user.reviewsCount, 'отзыв', 'отзыва', 'отзывов')}
        </p>
      </div>
    </div>
  );
}
