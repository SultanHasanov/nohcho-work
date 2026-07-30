import { Skeleton } from '@/components/ui/Skeleton';

/** Скелетон карточки заказа — пропорции из фрейма 03b. */
export function OrderCardSkeleton() {
  return (
    <div className="flex flex-col gap-3 rounded-card border border-line bg-surface p-card">
      <div className="flex gap-3">
        <div className="flex flex-1 flex-col gap-2.25">
          <Skeleton className="h-3.5 w-11/12 rounded-pill" />
          <Skeleton className="h-5 w-5/12 rounded-lg" />
          <Skeleton className="h-2.75 w-8/12 rounded-pill" isStatic />
          <Skeleton className="h-2.25 w-6/12 rounded-pill" isStatic />
        </div>
        <Skeleton className="size-thumb shrink-0 rounded-btn" />
      </div>
      <Skeleton className="h-control rounded-btn" isStatic />
    </div>
  );
}
