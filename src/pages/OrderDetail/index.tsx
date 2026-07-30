import { MapPin } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useNavigate, useParams } from 'react-router-dom';

import { StickyFooter } from '@/components/layout/StickyFooter';
import { Button } from '@/components/ui/Button';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { StatusPill } from '@/components/ui/StatusPill';
import { formatDateTime, formatDistance, formatPrice } from '@/lib/format';
import { ClientRow } from '@/pages/OrderDetail/components/ClientRow';
import { OrderGallery } from '@/pages/OrderDetail/components/OrderGallery';
import { useStores } from '@/stores/context';

const OrderDetailPage = observer(function OrderDetailPage() {
  const { orderDetail, session, chat } = useStores();
  const { orderId } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    if (orderId) void orderDetail.load(orderId);
    return () => {
      orderDetail.reset();
    };
  }, [orderDetail, orderId]);

  const order = orderDetail.order;

  if (orderDetail.isLoading || !order) {
    return (
      <div className="flex flex-1 flex-col gap-3 p-gutter">
        <Skeleton className="h-56 w-full rounded-card" />
        <Skeleton className="h-6 w-9/12 rounded-pill" />
        <Skeleton className="h-7 w-4/12 rounded-lg" />
        <Skeleton className="h-20 w-full rounded-card" isStatic />
        {orderDetail.error !== null ? (
          <ErrorNote
            message={orderDetail.error}
            onRetry={() => {
              if (orderId) void orderDetail.load(orderId);
            }}
          />
        ) : null}
      </div>
    );
  }

  const isMine = order.clientId === session.user?.id;
  const canTake = session.role === 'seeker' && order.status === 'searching' && !isMine;
  const chatId = chat.chats.find((item) => item.orderId === order.id)?.id ?? null;

  const currentId = order.id;

  async function handleTake() {
    const isTaken = await orderDetail.take();
    if (isTaken) void navigate(`/orders/${currentId}/sent`, { replace: true });
  }

  return (
    <>
      <OrderGallery photos={order.photos} categoryId={order.categoryId} />

      <div className="flex flex-1 flex-col gap-3 px-gutter pt-gutter pb-4">
        <h1 className="text-screen-title leading-tight font-bold text-text">
          {order.title}
        </h1>

        <div className="flex flex-wrap items-center gap-2.5">
          <span className="text-price font-extrabold text-accent">
            {formatPrice(order.price)}
          </span>
          <StatusPill status={order.status} />
          {orderDetail.categoryTitle ? (
            <span className="rounded-pill bg-surface-2 px-3 py-1.5 text-note font-semibold text-second">
              {orderDetail.categoryTitle}
            </span>
          ) : null}
        </div>

        <div className="flex flex-col gap-2 rounded-card border border-line bg-surface p-card">
          <p className="flex items-center gap-2 text-control font-semibold text-text">
            <MapPin
              size={16}
              strokeWidth={1.8}
              className="shrink-0 text-accent"
              aria-hidden="true"
            />
            {session.user?.city ?? 'Грозный'}, {order.address}
          </p>
          <p className="text-meta font-medium text-muted">
            {formatDistance(order.distance)} от вас · {formatDateTime(order.startsAt)}
          </p>
        </div>

        <div className="flex flex-col gap-1.5">
          <p className="text-meta font-bold tracking-wide text-second uppercase">
            Описание
          </p>
          <p className="text-caption leading-relaxed font-medium text-second">
            {order.description}
          </p>
        </div>

        <span className="h-px bg-line" />

        {orderDetail.client ? (
          <ClientRow client={orderDetail.client} chatId={chatId} />
        ) : null}

        {orderDetail.error !== null ? (
          <ErrorNote
            message={orderDetail.error}
            onRetry={() => {
              void handleTake();
            }}
          />
        ) : null}
      </div>

      <StickyFooter>
        {isMine ? (
          <div className="flex gap-2.5">
            <Button variant="secondary" disabled className="flex-1">
              Редактировать
            </Button>
            <button
              type="button"
              disabled
              className="h-cta flex-1 rounded-btn border border-line bg-surface-2 text-body font-semibold text-danger disabled:opacity-60"
            >
              Отменить заказ
            </button>
          </div>
        ) : (
          <Button
            disabled={!canTake}
            isLoading={orderDetail.isTaking}
            onClick={() => {
              void handleTake();
            }}
          >
            {order.status === 'searching' ? 'Взять заказ' : 'Заказ уже занят'}
          </Button>
        )}
      </StickyFooter>
    </>
  );
});

export default OrderDetailPage;
