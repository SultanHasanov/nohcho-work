import { Search } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { OrderCard } from '@/components/order/OrderCard';
import { OrderCardSkeleton } from '@/components/order/OrderCardSkeleton';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { useStores } from '@/stores/context';

/** Три состояния списка заказов: загрузка, пусто, ошибка. */
export const OrderList = observer(function OrderList() {
  const { orders, session } = useStores();
  const canTake = session.role === 'seeker';

  if (orders.isLoading) {
    return (
      <div className="flex flex-col gap-3">
        <OrderCardSkeleton />
        <OrderCardSkeleton />
        <OrderCardSkeleton />
      </div>
    );
  }

  if (orders.error !== null) {
    return (
      <ErrorNote
        message={orders.error}
        onRetry={() => {
          void orders.load();
        }}
      />
    );
  }

  if (orders.isEmpty) {
    return (
      <EmptyState
        icon={<Search size={34} strokeWidth={1.8} aria-hidden="true" />}
        title="Заказов рядом пока нет"
        description="Расширьте радиус поиска или включите уведомления о новых заказах"
        actionLabel="Расширить радиус"
        onAction={() => {
          orders.setSegment('all');
          void orders.load();
        }}
      />
    );
  }

  return (
    <div className="flex flex-col gap-3">
      {orders.items.map((order) => (
        <OrderCard
          key={order.id}
          order={order}
          canTake={canTake && order.status === 'searching'}
          isTaking={orders.takingId === order.id}
          onTake={(id) => {
            void orders.take(id);
          }}
        />
      ))}
    </div>
  );
});
