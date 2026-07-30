import type { ServiceAd } from '@/api/types';

export const ads: ServiceAd[] = [
  {
    id: 'a-1',
    seekerId: 'u-2',
    title: 'Погрузка, разгрузка, переезды',
    description:
      'Работаю по Грозному и пригороду, свои ремни и такелажные перчатки. Выхожу в течение часа.',
    categoryId: 'moving',
    price: 500,
    priceUnit: 'hour',
    city: 'Грозный',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'a-2',
    seekerId: 'u-1',
    title: 'Уборка участка и вывоз мусора',
    description: 'Расчистка двора, покос травы, погрузка мешков. Есть триммер и тачка.',
    categoryId: 'garden',
    price: 3500,
    priceUnit: 'day',
    city: 'Грозный',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'a-3',
    seekerId: 'u-2',
    title: 'Демонтажные работы',
    description: 'Перегородки, стяжка, старая плитка. Работаю в паре, инструмент свой.',
    categoryId: 'demolition',
    price: 4000,
    priceUnit: 'shift',
    city: 'Аргун',
    createdAt: new Date().toISOString(),
  },
  {
    id: 'a-4',
    seekerId: 'u-2',
    title: 'Сборка и разборка мебели',
    description: 'Шкафы, кухни, детские. Цену считаю по объёму после фотографий.',
    categoryId: 'furniture',
    price: 0,
    priceUnit: 'negotiable',
    city: 'Грозный',
    createdAt: new Date().toISOString(),
  },
];
