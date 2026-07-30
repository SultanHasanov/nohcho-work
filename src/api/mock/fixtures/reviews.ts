import type { RatingSummary, Review } from '@/api/types';

function daysAgo(days: number): string {
  return new Date(Date.now() - days * 86_400_000).toISOString();
}

export const reviews: Review[] = [
  {
    id: 'r-1',
    authorId: 'u-3',
    authorName: 'Хамзат',
    rating: 5,
    text: 'Приехал вовремя, вынес всё за два часа, двор оставил чистым. Буду обращаться ещё.',
    orderTitle: 'Вынести строительный мусор',
    createdAt: daysAgo(2),
  },
  {
    id: 'r-2',
    authorId: 'u-4',
    authorName: 'Зелимхан',
    rating: 5,
    text: 'Помог с переездом, ничего не разбили. Работали быстро, цену не поднимали.',
    orderTitle: 'Помочь с переездом',
    createdAt: daysAgo(9),
  },
  {
    id: 'r-3',
    authorId: 'u-3',
    authorName: 'Хамзат',
    rating: 4,
    text: 'Работу сделал хорошо, но приехал на полчаса позже, чем договаривались.',
    orderTitle: 'Покосить траву на участке',
    createdAt: daysAgo(21),
  },
];

export const ratingSummary: RatingSummary = {
  average: 4.8,
  total: 126,
  breakdown: { '5': 108, '4': 12, '3': 4, '2': 1, '1': 1 },
};
