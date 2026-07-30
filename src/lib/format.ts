import type { OrderStatus, PriceUnit } from '@/api/types';

const NBSP = ' ';

/** 8000 → «8 000 ₽» с неразрывными пробелами. */
export function formatPrice(value: number): string {
  return `${Math.round(value).toLocaleString('ru-RU').replace(/\s/g, NBSP)}${NBSP}₽`;
}

const priceUnitSuffix: Record<PriceUnit, string> = {
  hour: `${NBSP}₽/час`,
  day: `${NBSP}₽/день`,
  shift: `${NBSP}₽/смена`,
  negotiable: '',
};

/** Цена объявления с единицей: «500 ₽/час», «Договорная». */
export function formatPriceUnit(value: number, unit: PriceUnit): string {
  if (unit === 'negotiable') return 'Договорная';
  const amount = Math.round(value).toLocaleString('ru-RU').replace(/\s/g, NBSP);
  return `${amount}${priceUnitSuffix[unit]}`;
}

/** 600 → «600 м», 1200 → «1,2 км». */
export function formatDistance(meters: number): string {
  if (meters < 1000) {
    return `${String(Math.round(meters))}${NBSP}м`;
  }
  const km = meters / 1000;
  const rounded = km < 10 ? km.toFixed(1) : String(Math.round(km));
  return `${rounded.replace('.', ',')}${NBSP}км`;
}

function startOfDay(date: Date): number {
  const copy = new Date(date);
  copy.setHours(0, 0, 0, 0);
  return copy.getTime();
}

const timeFormat = new Intl.DateTimeFormat('ru-RU', {
  hour: '2-digit',
  minute: '2-digit',
});

const dayFormat = new Intl.DateTimeFormat('ru-RU', { day: 'numeric', month: 'long' });

/** «Сегодня, 12:00», «Завтра, 14:30», «12 августа, 09:00». */
export function formatDateTime(iso: string): string {
  const date = new Date(iso);
  const dayShift = Math.round((startOfDay(date) - startOfDay(new Date())) / 86_400_000);
  const time = timeFormat.format(date);

  if (dayShift === 0) return `Сегодня, ${time}`;
  if (dayShift === 1) return `Завтра, ${time}`;
  if (dayShift === -1) return `Вчера, ${time}`;
  return `${dayFormat.format(date)}, ${time}`;
}

/** Только время: для пузырей в чате. */
export function formatTime(iso: string): string {
  return timeFormat.format(new Date(iso));
}

const orderStatusLabel: Record<OrderStatus, string> = {
  searching: 'В поиске',
  assigned: 'Исполнитель найден',
  in_progress: 'В работе',
  done: 'Завершён',
  cancelled: 'Отменён',
};

export function formatOrderStatus(status: OrderStatus): string {
  return orderStatusLabel[status];
}

/** 4.8 → «4.8» ровно как в макете профиля. */
export function formatRating(rating: number): string {
  return rating.toFixed(1);
}

/** 0.98 → «98%». */
export function formatShare(share: number): string {
  return `${String(Math.round(share * 100))}%`;
}

/** 24 → «2 года», 7 → «7 месяцев» — подпись срока на платформе. */
export function formatTenure(months: number): string {
  if (months < 12) {
    return `${String(months)} ${plural(months, 'месяц', 'месяца', 'месяцев')}`;
  }
  const years = Math.floor(months / 12);
  return `${String(years)} ${plural(years, 'год', 'года', 'лет')}`;
}

/** «24 заказа», «1 заказ» — подписи количества в списках. */
export function plural(count: number, one: string, few: string, many: string): string {
  const mod100 = count % 100;
  const mod10 = count % 10;
  if (mod100 >= 11 && mod100 <= 14) return many;
  if (mod10 === 1) return one;
  if (mod10 >= 2 && mod10 <= 4) return few;
  return many;
}
