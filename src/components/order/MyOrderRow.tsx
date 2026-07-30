import { MoreHorizontal } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { Order } from '@/api/types';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatDateTime, formatPrice } from '@/lib/format';

/** Карточка своего заказа из фрейма 10. */
export function MyOrderRow({ order }: { order: Order }) {
  return (
    <article className="flex flex-col gap-1.5 rounded-card border border-line bg-surface p-card">
      <div className="flex items-start justify-between gap-2.5">
        <Link to={`/orders/${order.id}`} className="text-body font-semibold text-text">
          {order.title}
        </Link>
        {/* Меню действий над заказом в макете не раскрыто — кнопка пока неактивна. */}
        <button
          type="button"
          disabled
          aria-label="Действия с заказом"
          className="-mt-1.5 -mr-1.5 flex size-7 shrink-0 items-center justify-center"
        >
          <MoreHorizontal
            size={18}
            strokeWidth={2.4}
            className="text-second"
            aria-hidden="true"
          />
        </button>
      </div>

      <p className="text-screen-title font-extrabold text-accent">
        {formatPrice(order.price)}
      </p>

      <div className="flex items-center justify-between gap-2.5">
        <span className="text-note font-medium text-muted">
          {formatDateTime(order.startsAt)}
        </span>
        <StatusPill status={order.status} />
      </div>
    </article>
  );
}
