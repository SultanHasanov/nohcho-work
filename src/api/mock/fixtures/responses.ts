import type { FavoriteSeeker, OrderResponse } from '@/api/types';

function hoursAgo(hours: number): string {
  return new Date(Date.now() - hours * 3_600_000).toISOString();
}

export const responses: OrderResponse[] = [
  {
    id: 'resp-1',
    orderId: 'o-1',
    orderTitle: 'Вынести строительный мусор',
    price: 8000,
    status: 'pending',
    createdAt: hoursAgo(5),
  },
  {
    id: 'resp-2',
    orderId: 'o-2',
    orderTitle: 'Помочь с переездом',
    price: 5500,
    status: 'accepted',
    createdAt: hoursAgo(28),
  },
  {
    id: 'resp-3',
    orderId: 'o-3',
    orderTitle: 'Покосить траву на участке',
    price: 3000,
    status: 'declined',
    createdAt: hoursAgo(4 * 24),
  },
  {
    id: 'resp-4',
    orderId: 'o-6',
    orderTitle: 'Демонтаж старой перегородки',
    price: 12000,
    status: 'pending',
    createdAt: hoursAgo(6 * 24),
  },
];

/** Избранные исполнители: вкладка «Исполнители» экрана 19. */
export const favoriteSeekers: FavoriteSeeker[] = [
  {
    userId: 'u-2',
    name: 'Магомед',
    rating: 4.9,
    categoryTitle: 'Погрузка и переезд',
    priceFrom: 2000,
    priceUnit: 'day',
  },
];

/** Избранные заказы: вкладка «Заказы» экрана 19. */
export const favoriteOrderIds: string[] = ['o-2', 'o-6'];
