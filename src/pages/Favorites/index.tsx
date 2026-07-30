import { Heart } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { OrderCard } from '@/components/order/OrderCard';
import { OrderCardSkeleton } from '@/components/order/OrderCardSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Tabs } from '@/components/ui/Tabs';
import { SeekerCard } from '@/pages/Favorites/components/SeekerCard';
import { useStores } from '@/stores/context';

const tabs = [
  { value: 'orders', label: 'Заказы' },
  { value: 'seekers', label: 'Исполнители' },
] as const;

/** Фрейм 19: избранное. */
const FavoritesPage = observer(function FavoritesPage() {
  const { favorites, orders, session } = useStores();

  useEffect(() => {
    void favorites.loadFavorites();
  }, [favorites]);

  const canTake = session.role === 'seeker';

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="Избранное" />

      <div className="px-gutter">
        <Tabs
          options={tabs}
          value={favorites.tab}
          onChange={(value) => {
            favorites.setTab(value);
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-3 px-gutter pt-card pb-4">
        {favorites.isLoading ? (
          <>
            <OrderCardSkeleton />
            <OrderCardSkeleton />
          </>
        ) : favorites.error !== null ? (
          <ErrorNote
            message={favorites.error}
            onRetry={() => {
              void favorites.loadFavorites();
            }}
          />
        ) : favorites.isFavoritesEmpty ? (
          <EmptyState
            icon={<Heart size={34} strokeWidth={1.8} aria-hidden="true" />}
            title="Пока пусто"
            description={
              favorites.tab === 'orders'
                ? 'Сохраняйте заказы, чтобы вернуться к ним позже'
                : 'Сохраняйте исполнителей, с которыми хорошо сработались'
            }
          />
        ) : favorites.tab === 'orders' ? (
          favorites.orders.map((order) => (
            <OrderCard
              key={order.id}
              order={order}
              canTake={canTake && order.status === 'searching'}
              isTaking={orders.takingId === order.id}
              onTake={(id) => {
                void orders.take(id);
              }}
            />
          ))
        ) : (
          favorites.seekers.map((seeker) => (
            <SeekerCard key={seeker.userId} seeker={seeker} />
          ))
        )}
      </div>
    </section>
  );
});

export default FavoritesPage;
