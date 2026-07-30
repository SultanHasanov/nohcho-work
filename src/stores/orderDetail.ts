import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Category, Order, User } from '@/api/types';
import { toMessage } from '@/lib/errors';

/** Экран 04: заказ, его категория и карточка заказчика. */
export class OrderDetailStore {
  order: Order | null = null;
  client: User | null = null;
  categories: Category[] = [];
  isLoading = false;
  isTaking = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get categoryTitle(): string {
    const id = this.order?.categoryId;
    return this.categories.find((item) => item.id === id)?.title ?? '';
  }

  async load(orderId: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const order = await api.getOrder(orderId);
      const [client, categories] = await Promise.all([
        api.getUser(order.clientId),
        api.getCategories(),
      ]);
      runInAction(() => {
        this.order = order;
        this.client = client;
        this.categories = categories;
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

  /** «Взять заказ» — отклик исполнителя. Ведёт на экран 05. */
  async take(): Promise<boolean> {
    const order = this.order;
    if (!order) return false;

    this.isTaking = true;
    this.error = null;
    try {
      const updated = await api.takeOrder(order.id);
      runInAction(() => {
        this.order = updated;
      });
      return true;
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
      return false;
    } finally {
      runInAction(() => {
        this.isTaking = false;
      });
    }
  }

  reset(): void {
    this.order = null;
    this.client = null;
    this.error = null;
  }
}
