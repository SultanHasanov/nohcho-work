import { ClipboardList } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { MyOrderRow } from '@/components/order/MyOrderRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStores } from '@/stores/context';

const emptyText = {
  active: 'Активных заказов нет. Создайте заказ или возьмите чужой на главной.',
  done: 'Здесь появятся заказы, которые вы уже закрыли.',
} as const;

export const MyOrdersList = observer(function MyOrdersList() {
  const { myOrders, session } = useStores();

  if (myOrders.isLoading) {
    return (
      <div className="flex flex-col gap-2.5">
        <RowSkeleton />
        <RowSkeleton />
        <RowSkeleton />
      </div>
    );
  }

  if (myOrders.error !== null) {
    return (
      <ErrorNote
        message={myOrders.error}
        onRetry={() => {
          if (session.user) void myOrders.load(session.user.id);
        }}
      />
    );
  }

  if (myOrders.isEmpty) {
    return (
      <EmptyState
        icon={<ClipboardList size={34} strokeWidth={1.8} aria-hidden="true" />}
        title={myOrders.tab === 'active' ? 'Активных заказов нет' : 'Выполненных пока нет'}
        description={emptyText[myOrders.tab]}
      />
    );
  }

  return (
    <div className="flex flex-col gap-2.5">
      {myOrders.visible.map((order) => (
        <MyOrderRow key={order.id} order={order} />
      ))}
    </div>
  );
});

function RowSkeleton() {
  return (
    <div className="flex flex-col gap-2.5 rounded-card border border-line bg-surface p-card">
      <Skeleton className="h-3.5 w-8/12 rounded-pill" />
      <Skeleton className="h-5 w-4/12 rounded-lg" />
      <div className="flex items-center justify-between">
        <Skeleton className="h-2.75 w-3/12 rounded-pill" isStatic />
        <Skeleton className="h-6 w-4/12 rounded-pill" isStatic />
      </div>
    </div>
  );
}
