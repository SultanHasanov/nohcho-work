import { Megaphone } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link } from 'react-router-dom';

import { AdCard } from '@/components/ad/AdCard';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { Tabs } from '@/components/ui/Tabs';
import { useStores } from '@/stores/context';

const tabs = [
  { value: 'active', label: 'Активные' },
  { value: 'hidden', label: 'Скрытые' },
] as const;

/** Фрейм 11: свои объявления. */
const AdsPage = observer(function AdsPage() {
  const { ads, orders, session } = useStores();
  const userId = session.user?.id;

  useEffect(() => {
    if (userId) void ads.load(userId);
    void orders.loadCategories();
  }, [ads, orders, userId]);

  return (
    <>
      <div className="flex flex-col gap-3 px-gutter pt-1.5">
        <h1 className="text-screen-title font-bold text-text">Мои объявления</h1>
        <Tabs
          options={tabs}
          value={ads.tab}
          onChange={(value) => {
            ads.setTab(value);
          }}
        />
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-gutter pt-card">
        {ads.isLoading ? (
          <>
            <CardSkeleton />
            <CardSkeleton />
          </>
        ) : ads.error !== null ? (
          <ErrorNote
            message={ads.error}
            onRetry={() => {
              if (userId) void ads.load(userId);
            }}
          />
        ) : ads.isEmpty ? (
          <EmptyState
            icon={<Megaphone size={34} strokeWidth={1.8} aria-hidden="true" />}
            title={ads.tab === 'active' ? 'Объявлений пока нет' : 'Скрытых нет'}
            description={
              ads.tab === 'active'
                ? 'Расскажите, что вы умеете, — заказчики найдут вас сами'
                : 'Скрытые объявления не видны заказчикам'
            }
          />
        ) : (
          ads.visible.map((ad) => (
            <AdCard key={ad.id} ad={ad} categories={orders.categories} />
          ))
        )}
      </div>

      <div className="px-gutter pt-3 pb-2.5">
        <Link
          to="/ads/new"
          className="flex h-cta w-full items-center justify-center rounded-pill bg-accent text-body font-semibold text-text active:bg-accent-pressed"
        >
          Новое объявление
        </Link>
      </div>
    </>
  );
});

function CardSkeleton() {
  return (
    <div className="flex flex-col gap-2 rounded-card border border-line bg-surface p-card">
      <Skeleton className="h-3.5 w-7/12 rounded-pill" />
      <Skeleton className="h-5 w-4/12 rounded-lg" />
      <Skeleton className="h-6 w-6/12 rounded-pill" isStatic />
      <Skeleton className="h-2.5 w-5/12 rounded-pill" isStatic />
    </div>
  );
}

export default AdsPage;
