import { delay } from '@/api/mock/delay';
import {
  chats as chatFixture,
  messages as messageFixture,
} from '@/api/mock/fixtures/chats';
import { currentUser } from '@/api/mock/fixtures/users';
import type { Chat, Message } from '@/api/types';

let chats: Chat[] = [...chatFixture];
let messages: Message[] = [...messageFixture];

export async function getChats(): Promise<Chat[]> {
  await delay();
  return [...chats].sort(
    (a, b) => new Date(b.updatedAt).getTime() - new Date(a.updatedAt).getTime(),
  );
}

export async function getMessages(chatId: string): Promise<Message[]> {
  await delay();
  return messages.filter((message) => message.chatId === chatId);
}

export async function sendMessage(chatId: string, text: string): Promise<Message> {
  await delay();
  const body = text.trim();
  if (!body) {
    throw new Error('Сообщение пустое.');
  }
  const message: Message = {
    id: `m-${String(messages.length + 1)}`,
    chatId,
    authorId: currentUser.id,
    text: body,
    createdAt: new Date().toISOString(),
  };
  messages = [...messages, message];
  chats = chats.map((chat) =>
    chat.id === chatId
      ? { ...chat, lastMessage: body, updatedAt: message.createdAt }
      : chat,
  );
  return message;
}
