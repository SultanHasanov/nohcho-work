import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Order } from '@/api/types';
import { toMessage } from '@/lib/errors';

export type MyOrdersTab = 'active' | 'done';

const activeStatuses = ['searching', 'assigned', 'in_progress'] as const;

/** Свои заказы: экран 10. */
export class MyOrdersStore {
  items: Order[] = [];
  tab: MyOrdersTab = 'active';
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get visible(): Order[] {
    if (this.tab === 'active') {
      return this.items.filter((order) =>
        activeStatuses.some((status) => status === order.status),
      );
    }
    return this.items.filter(
      (order) => order.status === 'done' || order.status === 'cancelled',
    );
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.visible.length === 0;
  }

  setTab(tab: MyOrdersTab): void {
    this.tab = tab;
  }

  /**
   * Отдельного метода «мои заказы» в контракте нет, поэтому берём весь список
   * и оставляем те, где пользователь заказчик или исполнитель.
   */
  async load(userId: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const all = await api.getOrders();
      runInAction(() => {
        this.items = all.filter(
          (order) => order.clientId === userId || order.seekerId === userId,
        );
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
}
