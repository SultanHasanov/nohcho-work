import { Star } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { Avatar } from '@/components/ui/Avatar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { Stars } from '@/components/ui/Stars';
import { formatDate } from '@/lib/format';
import { RatingCard } from '@/pages/Reviews/components/RatingCard';
import { useStores } from '@/stores/context';

/** Фрейм 17: рейтинг и отзывы. */
const ReviewsPage = observer(function ReviewsPage() {
  const { reviews } = useStores();

  useEffect(() => {
    void reviews.load();
  }, [reviews]);

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="Рейтинг и отзывы" />

      <div className="flex flex-1 flex-col gap-card px-gutter pt-2 pb-4">
        {reviews.isLoading ? (
          <>
            <Skeleton className="h-32 w-full rounded-card" />
            <Skeleton className="h-28 w-full rounded-card" isStatic />
          </>
        ) : reviews.error !== null ? (
          <ErrorNote
            message={reviews.error}
            onRetry={() => {
              void reviews.load();
            }}
          />
        ) : (
          <>
            {reviews.summary ? (
              <RatingCard
                summary={reviews.summary}
                share={(rating) => reviews.share(rating)}
              />
            ) : null}

            {reviews.isEmpty ? (
              <EmptyState
                icon={<Star size={34} strokeWidth={1.8} aria-hidden="true" />}
                title="Отзывов пока нет"
                description="Они появятся после первых выполненных заказов"
              />
            ) : (
              reviews.items.map((review) => (
                <article
                  key={review.id}
                  className="flex flex-col gap-2.5 rounded-card border border-line bg-surface p-card"
                >
                  <div className="flex items-center gap-3">
                    <Avatar
                      name={review.authorName}
                      sizeClass="size-10"
                      textClass="text-lead"
                    />
                    <div className="flex min-w-0 flex-1 flex-col gap-0.75">
                      <p className="truncate text-lead font-bold text-text">
                        {review.authorName}
                      </p>
                      <p className="text-meta font-medium text-muted">
                        {formatDate(review.createdAt)}
                      </p>
                    </div>
                    <Stars rating={review.rating} />
                  </div>
                  <p className="text-caption leading-relaxed font-medium text-second">
                    {review.text}
                  </p>
                  <p className="text-meta font-medium text-muted">{review.orderTitle}</p>
                </article>
              ))
            )}
          </>
        )}
      </div>
    </section>
  );
});

export default ReviewsPage;
