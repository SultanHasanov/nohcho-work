import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { SearchField } from '@/components/ui/SearchField';
import { Segmented } from '@/components/ui/Segmented';
import { plural } from '@/lib/format';
import { useDebouncedValue } from '@/lib/hooks/useDebouncedValue';
import { CityPicker } from '@/pages/Home/components/CityPicker';
import { FilterButton } from '@/pages/Home/components/FilterButton';
import { HomeHeader } from '@/pages/Home/components/HomeHeader';
import { OrderList } from '@/pages/Home/components/OrderList';
import { useStores } from '@/stores/context';

const segments = [
  { value: 'all', label: 'Все' },
  { value: 'near', label: 'Рядом' },
  { value: 'top', label: 'Популярные' },
] as const;

const titles = {
  all: 'Все заказы',
  near: 'Заказы рядом',
  top: 'Популярные заказы',
} as const;

const HomePage = observer(function HomePage() {
  const { orders, session, chat } = useStores();
  const { segment, search } = orders;
  const debouncedSearch = useDebouncedValue(search);

  useEffect(() => {
    void orders.load();
  }, [orders, segment, debouncedSearch]);

  useEffect(() => {
    void chat.loadChats();
  }, [chat]);

  const hasUnread = chat.chats.some((item) => item.unreadCount > 0);

  return (
    <>
      <div className="flex flex-col gap-card px-gutter pt-2">
        <HomeHeader hasUnread={hasUnread} />
        <CityPicker city={session.user?.city ?? 'Грозный'} />

        <div className="flex items-center gap-2.5">
          <SearchField
            value={orders.search}
            placeholder="Поиск заказов"
            onChange={(value) => {
              orders.setSearch(value);
            }}
          />
          <FilterButton />
        </div>

        <Segmented
          options={segments}
          value={orders.segment}
          onChange={(value) => {
            orders.setSegment(value);
          }}
        />

        <div className="flex items-baseline justify-between">
          <h1 className="text-screen-title font-bold text-text">{titles[segment]}</h1>
          {orders.isLoading ? null : (
            <p className="text-note font-semibold text-muted">
              {orders.count} {plural(orders.count, 'заказ', 'заказа', 'заказов')}
            </p>
          )}
        </div>
      </div>

      <div className="flex flex-1 flex-col px-gutter pt-card pb-4">
        <OrderList />
      </div>
    </>
  );
});

export default HomePage;
