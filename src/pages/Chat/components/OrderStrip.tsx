import { Link } from 'react-router-dom';

import { CategoryIcon } from '@/components/order/OrderThumb';
import { formatPrice } from '@/lib/format';

interface OrderStripProps {
  orderId: string;
  title: string;
  price: number;
  categoryId: string;
}

/** Полоса с заказом над перепиской — фрейм 12. */
export function OrderStrip({ orderId, title, price, categoryId }: OrderStripProps) {
  return (
    <div className="mx-gutter mt-2.5 flex shrink-0 items-center gap-2.5 rounded-btn border border-line bg-surface px-3 py-2.5">
      <span className="flex size-8.5 shrink-0 items-center justify-center rounded-tile bg-surface-2">
        <CategoryIcon categoryId={categoryId} size={18} />
      </span>

      <div className="flex min-w-0 flex-1 flex-col gap-0.5">
        <p className="truncate text-caption font-semibold text-text">{title}</p>
        <p className="text-caption font-extrabold text-accent">{formatPrice(price)}</p>
      </div>

      <Link
        to={`/orders/${orderId}`}
        className="flex h-8.5 shrink-0 items-center rounded-pill border border-line px-3 text-note font-semibold text-text active:bg-surface-2"
      >
        К заказу
      </Link>
    </div>
  );
}
