import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { Link, useParams } from 'react-router-dom';

import { ResultScreen } from '@/components/ui/ResultScreen';
import { formatDateTime, formatPrice } from '@/lib/format';
import { useStores } from '@/stores/context';

const primaryClass =
  'flex h-cta w-full items-center justify-center rounded-btn bg-accent text-body font-semibold text-text active:bg-accent-pressed';
const secondaryClass =
  'flex h-cta w-full items-center justify-center rounded-btn border border-line text-body font-semibold text-text active:bg-surface';

/** Фрейм 07: подтверждение публикации заказа. */
const OrderPublishedPage = observer(function OrderPublishedPage() {
  const { orderDetail } = useStores();
  const { orderId } = useParams();

  useEffect(() => {
    if (orderId) void orderDetail.load(orderId);
  }, [orderDetail, orderId]);

  const order = orderDetail.order;

  return (
    <ResultScreen
      title="Заказ опубликован"
      description="Исполнители рядом уже видят его"
      summary={
        order ? (
          <div className="flex flex-col gap-1.5 rounded-card border border-line bg-surface p-card">
            <p className="text-body font-semibold text-text">{order.title}</p>
            <p className="text-screen-title font-extrabold text-accent">
              {formatPrice(order.price)}
            </p>
            <p className="text-meta font-medium text-muted">
              {formatDateTime(order.startsAt)} · {order.address}
            </p>
          </div>
        ) : null
      }
      actions={
        <>
          <Link to="/my-orders" className={primaryClass}>
            Мои заказы
          </Link>
          <Link to="/" className={secondaryClass}>
            На главную
          </Link>
        </>
      }
    />
  );
});

export default OrderPublishedPage;
