import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Chat, Message, Order } from '@/api/types';
import { toMessage } from '@/lib/errors';

export class ChatStore {
  chats: Chat[] = [];
  messages: Message[] = [];
  activeChatId: string | null = null;
  /** Заказ, к которому привязан открытый диалог: полоса над перепиской. */
  activeOrder: Order | null = null;
  isLoading = false;
  isSending = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get activeChat(): Chat | null {
    return this.chats.find((chat) => chat.id === this.activeChatId) ?? null;
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.chats.length === 0;
  }

  async loadChats(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const chats = await api.getChats();
      runInAction(() => {
        this.chats = chats;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async openChat(chatId: string): Promise<void> {
    this.activeChatId = chatId;
    this.isLoading = true;
    this.error = null;
    try {
      if (this.chats.length === 0) {
        const chats = await api.getChats();
        runInAction(() => {
          this.chats = chats;
        });
      }
      const messages = await api.getMessages(chatId);
      const orderId = this.chats.find((chat) => chat.id === chatId)?.orderId;
      const order = orderId === undefined ? null : await api.getOrder(orderId);
      runInAction(() => {
        this.messages = messages;
        this.activeOrder = order;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isLoading = false;
      });
    }
  }

  async send(text: string): Promise<void> {
    const chatId = this.activeChatId;
    if (!chatId) return;

    this.isSending = true;
    try {
      const message = await api.sendMessage(chatId, text);
      runInAction(() => {
        this.messages = [...this.messages, message];
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    } finally {
      runInAction(() => {
        this.isSending = false;
      });
    }
  }
}
