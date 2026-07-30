import { MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';

import type { Order } from '@/api/types';
import { OrderThumb } from '@/components/order/OrderThumb';
import { formatDateTime, formatDistance, formatPrice } from '@/lib/format';

interface OrderCardProps {
  order: Order;
  /** Кнопку показываем только тем, кто может взять заказ. */
  canTake: boolean;
  isTaking?: boolean;
  onTake: (id: string) => void;
}

/** Карточка заказа из фрейма 03. */
export function OrderCard({ order, canTake, isTaking = false, onTake }: OrderCardProps) {
  return (
    <article className="flex flex-col gap-3 rounded-card border border-line bg-surface p-card">
      <Link to={`/orders/${order.id}`} className="flex gap-3">
        <div className="flex flex-1 flex-col gap-1.5">
          <h3 className="text-body leading-snug font-semibold text-text">
            {order.title}
          </h3>
          <p className="text-price font-extrabold tracking-tight text-accent">
            {formatPrice(order.price)}
          </p>
          <p className="flex items-center gap-1.5 text-caption font-medium text-second">
            <MapPin size={14} strokeWidth={1.9} className="shrink-0" aria-hidden="true" />
            {order.address}
          </p>
          <p className="text-meta font-medium text-muted">
            {formatDistance(order.distance)} от вас · {formatDateTime(order.startsAt)}
          </p>
        </div>
        <OrderThumb categoryId={order.categoryId} />
      </Link>

      {canTake ? (
        <button
          type="button"
          disabled={isTaking}
          onClick={() => {
            onTake(order.id);
          }}
          className="h-control rounded-btn bg-accent text-lead font-semibold text-text active:bg-accent-pressed disabled:opacity-60"
        >
          {isTaking ? 'Отправляем…' : 'Взять заказ'}
        </button>
      ) : null}
    </article>
  );
}
