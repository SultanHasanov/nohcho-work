import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Category, Order, OrdersQuery } from '@/api/types';
import { toMessage } from '@/lib/errors';

export class OrdersStore {
  items: Order[] = [];
  categories: Category[] = [];
  segment: NonNullable<OrdersQuery['segment']> = 'near';
  search = '';
  isLoading = false;
  /** Идентификатор заказа, который сейчас берут: блокирует его кнопку. */
  takingId: string | null = null;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.items.length === 0;
  }

  get count(): number {
    return this.items.length;
  }

  setSegment(segment: NonNullable<OrdersQuery['segment']>): void {
    this.segment = segment;
  }

  setSearch(search: string): void {
    this.search = search;
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const items = await api.getOrders({ segment: this.segment, search: this.search });
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

  async loadCategories(): Promise<void> {
    try {
      const categories = await api.getCategories();
      runInAction(() => {
        this.categories = categories;
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    }
  }

  async take(id: string): Promise<void> {
    this.takingId = id;
    this.error = null;
    try {
      const updated = await api.takeOrder(id);
      runInAction(() => {
        this.items = this.items.map((item) => (item.id === id ? updated : item));
      });
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
    } finally {
      runInAction(() => {
        this.takingId = null;
      });
    }
  }
}
