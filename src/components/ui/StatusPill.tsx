import type { OrderStatus } from '@/api/types';
import { formatOrderStatus } from '@/lib/format';

/** Цвета пилюль статуса взяты из фрейма 10. */
const styles: Record<OrderStatus, string> = {
  searching: 'bg-warning-soft text-warning',
  assigned: 'bg-accent-soft text-accent',
  in_progress: 'bg-accent-soft text-accent',
  done: 'bg-surface-2 text-second',
  cancelled: 'bg-surface-2 text-danger',
};

export function StatusPill({ status }: { status: OrderStatus }) {
  return (
    <span
      className={`shrink-0 rounded-pill px-3 py-1.5 text-note font-bold ${styles[status]}`}
    >
      {formatOrderStatus(status)}
    </span>
  );
}
