import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { TopBar } from '@/components/layout/TopBar';
import { Tabs } from '@/components/ui/Tabs';
import { MyOrdersList } from '@/pages/MyOrders/components/MyOrdersList';
import { useStores } from '@/stores/context';

const tabs = [
  { value: 'active', label: 'Активные' },
  { value: 'done', label: 'Выполненные' },
] as const;

const MyOrdersPage = observer(function MyOrdersPage() {
  const { myOrders, session } = useStores();
  const userId = session.user?.id;

  useEffect(() => {
    if (userId) void myOrders.load(userId);
  }, [myOrders, userId]);

  return (
    <>
      <TopBar title="Мои заказы" />

      <div className="px-gutter pt-1">
        <Tabs
          options={tabs}
          value={myOrders.tab}
          onChange={(value) => {
            myOrders.setTab(value);
          }}
        />
      </div>

      <div className="flex flex-1 flex-col px-gutter pt-card pb-4">
        <MyOrdersList />
      </div>
    </>
  );
});

export default MyOrdersPage;
