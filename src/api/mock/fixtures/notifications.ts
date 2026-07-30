import type { AppNotification } from '@/api/types';

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

const HOUR = 60;
const DAY = 24 * HOUR;

export const notifications: AppNotification[] = [
  {
    id: 'n-1',
    kind: 'order_nearby',
    title: 'Новый заказ в 600 м от вас',
    text: 'Вынести строительный мусор — 8 000 ₽',
    createdAt: minutesAgo(5),
    isRead: false,
  },
  {
    id: 'n-2',
    kind: 'order_response',
    title: 'Зелимхан откликнулся на ваш заказ',
    text: 'Помочь с переездом — 5 500 ₽',
    createdAt: minutesAgo(40),
    isRead: false,
  },
  {
    id: 'n-3',
    kind: 'order_assigned',
    title: 'Исполнитель найден',
    text: 'Магомед взял заказ «Покосить траву»',
    createdAt: minutesAgo(DAY + 3 * HOUR),
    isRead: true,
  },
  {
    id: 'n-4',
    kind: 'order_done',
    title: 'Заказ завершён',
    text: 'Собрать мебель — 4 500 ₽',
    createdAt: minutesAgo(DAY + 9 * HOUR),
    isRead: true,
  },
  {
    id: 'n-5',
    kind: 'review',
    title: 'Новый отзыв о вас',
    text: 'Хамзат поставил 5 звёзд',
    createdAt: minutesAgo(3 * DAY),
    isRead: true,
  },
];
