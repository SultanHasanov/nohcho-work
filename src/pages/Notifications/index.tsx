import { Bell, Check, MapPin, MessageSquare, Star, User } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import type { LucideIcon } from 'lucide-react';

import type { NotificationKind } from '@/api/types';
import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateTime } from '@/lib/format';
import { NotificationsHeader } from '@/pages/Notifications/components/NotificationsHeader';
import { useStores } from '@/stores/context';

const icons: Record<NotificationKind, LucideIcon> = {
  order_nearby: MapPin,
  order_response: MessageSquare,
  order_assigned: User,
  order_done: Check,
  review: Star,
};

/** Фрейм 16: список уведомлений. */
const NotificationsPage = observer(function NotificationsPage() {
  const { notifications } = useStores();

  useEffect(() => {
    void notifications.load();
  }, [notifications]);

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <NotificationsHeader
        hasUnread={notifications.unreadCount > 0}
        onMarkAll={() => {
          void notifications.markAllRead();
        }}
      />

      <div className="flex flex-1 flex-col gap-2 px-gutter pt-2.5 pb-4">
        {notifications.isLoading ? (
          <>
            <Skeleton className="h-20 w-full rounded-card" />
            <Skeleton className="h-20 w-full rounded-card" />
            <Skeleton className="h-20 w-full rounded-card" isStatic />
          </>
        ) : notifications.error !== null ? (
          <ErrorNote
            message={notifications.error}
            onRetry={() => {
              void notifications.load();
            }}
          />
        ) : notifications.isEmpty ? (
          <EmptyState
            icon={<Bell size={34} strokeWidth={1.8} aria-hidden="true" />}
            title="Уведомлений нет"
            description="Здесь появятся отклики, новые заказы рядом и отзывы о вас"
          />
        ) : (
          notifications.items.map((item) => {
            const Icon = icons[item.kind];
            const isUnread = !item.isRead;
            return (
              <article
                key={item.id}
                className={[
                  'flex items-start gap-3 rounded-card border border-line p-card',
                  isUnread ? 'bg-surface' : 'bg-transparent',
                ].join(' ')}
              >
                <span
                  className={[
                    'mt-4 size-2 shrink-0 rounded-pill',
                    isUnread ? 'bg-accent' : 'bg-transparent',
                  ].join(' ')}
                />
                <span className="flex size-10 shrink-0 items-center justify-center rounded-btn bg-surface-2">
                  <Icon
                    size={20}
                    strokeWidth={1.8}
                    className={isUnread ? 'text-accent' : 'text-second'}
                    aria-hidden="true"
                  />
                </span>
                <div className="flex min-w-0 flex-1 flex-col gap-0.75">
                  <p className="text-control font-semibold text-text">{item.title}</p>
                  <p className="text-note font-medium text-second">{item.text}</p>
                  <p className="text-meta font-medium text-muted">
                    {formatDateTime(item.createdAt)}
                  </p>
                </div>
              </article>
            );
          })
        )}
      </div>
    </section>
  );
});

export default NotificationsPage;
