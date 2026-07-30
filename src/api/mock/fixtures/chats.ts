import type { Chat, Message } from '@/api/types';

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

const HOUR = 60;
const DAY = 24 * HOUR;

export const chats: Chat[] = [
  {
    id: 'c-1',
    orderId: 'o-1',
    orderTitle: 'Вынести строительный мусор',
    peerId: 'u-2',
    peerName: 'Магомед',
    peerIsOnline: true,
    lastMessage: 'Через 20 минут буду на месте',
    unreadCount: 2,
    updatedAt: minutesAgo(4),
  },
  {
    id: 'c-2',
    orderId: 'o-2',
    orderTitle: 'Помочь с переездом',
    peerId: 'u-4',
    peerName: 'Зелимхан',
    peerIsOnline: true,
    lastMessage: 'Могу подъехать завтра к девяти утра, если вам удобно',
    unreadCount: 1,
    updatedAt: minutesAgo(95),
  },
  {
    id: 'c-3',
    orderId: 'o-3',
    orderTitle: 'Покосить траву на участке',
    peerId: 'u-3',
    peerName: 'Хамзат',
    peerIsOnline: false,
    lastMessage: 'Спасибо за работу, всё хорошо сделали',
    unreadCount: 0,
    updatedAt: minutesAgo(DAY + 3 * HOUR),
  },
  {
    id: 'c-4',
    orderId: 'o-4',
    orderTitle: 'Собрать мебель',
    peerId: 'u-2',
    peerName: 'Магомед',
    peerIsOnline: false,
    lastMessage: 'Адрес: ул. Мира, 7, второй подъезд',
    unreadCount: 4,
    updatedAt: minutesAgo(3 * DAY),
  },
];

export const messages: Message[] = [
  {
    id: 'm-1',
    chatId: 'c-1',
    authorId: 'u-2',
    text: 'Здравствуйте! Готов выполнить ваш заказ.',
    createdAt: minutesAgo(14),
  },
  {
    id: 'm-2',
    chatId: 'c-1',
    authorId: 'u-1',
    text: 'Здравствуйте! Когда сможете подъехать?',
    createdAt: minutesAgo(11),
  },
  {
    id: 'm-3',
    chatId: 'c-1',
    authorId: 'u-2',
    text: 'Через 20 минут буду на месте',
    createdAt: minutesAgo(4),
  },
  {
    id: 'm-4',
    chatId: 'c-2',
    authorId: 'u-4',
    text: 'Добрый день, во сколько сможете подъехать?',
    createdAt: minutesAgo(140),
  },
  {
    id: 'm-5',
    chatId: 'c-2',
    authorId: 'u-4',
    text: 'Могу подъехать завтра к девяти утра, если вам удобно',
    createdAt: minutesAgo(95),
  },
  {
    id: 'm-6',
    chatId: 'c-3',
    authorId: 'u-3',
    text: 'Спасибо за работу, всё хорошо сделали',
    createdAt: minutesAgo(DAY + 3 * HOUR),
  },
  {
    id: 'm-7',
    chatId: 'c-4',
    authorId: 'u-2',
    text: 'Адрес: ул. Мира, 7, второй подъезд',
    createdAt: minutesAgo(3 * DAY),
  },
];
