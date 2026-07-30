import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { AppNotification } from '@/api/types';
import { toMessage } from '@/lib/errors';

/** Уведомления: экран 16. */
export class NotificationsStore {
  items: AppNotification[] = [];
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get unreadCount(): number {
    return this.items.filter((item) => !item.isRead).length;
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.items.length === 0;
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const items = await api.getNotifications();
      runInAction(() => {
        this.items = items;
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

  async markAllRead(): Promise<void> {
    try {
      const items = await api.markNotificationsRead();
      runInAction(() => {
        this.items = items;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    }
  }
}
