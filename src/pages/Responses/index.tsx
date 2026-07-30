import { MessageSquare } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import type { ResponseStatus } from '@/api/types';
import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateTime, formatPrice } from '@/lib/format';
import { useStores } from '@/stores/context';

const statusStyles: Record<ResponseStatus, string> = {
  pending: 'bg-warning-soft text-warning',
  accepted: 'bg-accent-soft text-accent',
  declined: 'bg-surface-2 text-second',
};

const statusLabels: Record<ResponseStatus, string> = {
  pending: 'Ожидает',
  accepted: 'Принят',
  declined: 'Отклонён',
};

/** Фрейм 20: свои отклики. */
const ResponsesPage = observer(function ResponsesPage() {
  const { favorites } = useStores();

  useEffect(() => {
    void favorites.loadResponses();
  }, [favorites]);

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="Мои отклики" />

      <div className="flex flex-1 flex-col gap-2.5 px-gutter pt-2 pb-4">
        {favorites.isLoading ? (
          <>
            <Skeleton className="h-24 w-full rounded-card" />
            <Skeleton className="h-24 w-full rounded-card" isStatic />
          </>
        ) : favorites.error !== null ? (
          <ErrorNote
            message={favorites.error}
            onRetry={() => {
              void favorites.loadResponses();
            }}
          />
        ) : favorites.isResponsesEmpty ? (
          <EmptyState
            icon={<MessageSquare size={34} strokeWidth={1.8} aria-hidden="true" />}
            title="Откликов пока нет"
            description="Возьмите заказ на главной — отклик появится здесь"
          />
        ) : (
          favorites.responses.map((response) => (
            <article
              key={response.id}
              className="flex flex-col gap-1.5 rounded-card border border-line bg-surface p-card"
            >
              <Link
                to={`/orders/${response.orderId}`}
                className="text-body font-semibold text-text"
              >
                {response.orderTitle}
              </Link>
              <p className="text-screen-title font-extrabold text-accent">
                {formatPrice(response.price)}
              </p>
              <div className="flex items-center justify-between gap-2.5">
                <span className="text-meta font-medium text-muted">
                  Отправлен {formatDateTime(response.createdAt).toLowerCase()}
                </span>
                <span
                  className={`shrink-0 rounded-pill px-3 py-1.5 text-note font-bold ${statusStyles[response.status]}`}
                >
                  {statusLabels[response.status]}
                </span>
              </div>
            </article>
          ))
        )}
      </div>
    </section>
  );
});

export default ResponsesPage;
