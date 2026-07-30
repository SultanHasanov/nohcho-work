import type { Chat, Message } from '@/api/types';

function minutesAgo(minutes: number): string {
  return new Date(Date.now() - minutes * 60_000).toISOString();
}

export const chats: Chat[] = [
  {
    id: 'c-1',
    orderId: 'o-1',
    orderTitle: 'Вынести строительный мусор',
    peerId: 'u-2',
    peerName: 'Магомед',
    peerIsOnline: true,
    lastMessage: 'Хорошо, жду вас.',
    unreadCount: 0,
    updatedAt: minutesAgo(4),
  },
  {
    id: 'c-2',
    orderId: 'o-2',
    orderTitle: 'Помочь с переездом',
    peerId: 'u-4',
    peerName: 'Зелимхан',
    peerIsOnline: false,
    lastMessage: 'Подъезд второй, код на калитке 34.',
    unreadCount: 2,
    updatedAt: minutesAgo(95),
  },
];

export const messages: Message[] = [
  {
    id: 'm-1',
    chatId: 'c-1',
    authorId: 'u-1',
    text: 'Через 20 минут буду на месте.',
    createdAt: minutesAgo(9),
  },
  {
    id: 'm-2',
    chatId: 'c-1',
    authorId: 'u-2',
    text: 'Хорошо, жду вас.',
    createdAt: minutesAgo(4),
  },
  {
    id: 'm-3',
    chatId: 'c-2',
    authorId: 'u-4',
    text: 'Добрый день, во сколько сможете подъехать?',
    createdAt: minutesAgo(140),
  },
  {
    id: 'm-4',
    chatId: 'c-2',
    authorId: 'u-4',
    text: 'Подъезд второй, код на калитке 34.',
    createdAt: minutesAgo(95),
  },
];
