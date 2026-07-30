import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { FavoriteSeeker, Order, OrderResponse } from '@/api/types';
import { toMessage } from '@/lib/errors';

export type FavoritesTab = 'orders' | 'seekers';

/** Избранное (экран 19) и свои отклики (экран 20). */
export class FavoritesStore {
  orders: Order[] = [];
  seekers: FavoriteSeeker[] = [];
  responses: OrderResponse[] = [];
  tab: FavoritesTab = 'orders';
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isFavoritesEmpty(): boolean {
    if (this.isLoading || this.error !== null) return false;
    return this.tab === 'orders' ? this.orders.length === 0 : this.seekers.length === 0;
  }

  get isResponsesEmpty(): boolean {
    return !this.isLoading && this.error === null && this.responses.length === 0;
  }

  setTab(tab: FavoritesTab): void {
    this.tab = tab;
  }

  async loadFavorites(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const [orders, seekers] = await Promise.all([
        api.getFavoriteOrders(),
        api.getFavoriteSeekers(),
      ]);
      runInAction(() => {
        this.orders = orders;
        this.seekers = seekers;
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

  async loadResponses(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const responses = await api.getMyResponses();
      runInAction(() => {
        this.responses = responses;
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
