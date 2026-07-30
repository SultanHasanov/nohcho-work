import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { ServiceAd } from '@/api/types';
import { toMessage } from '@/lib/errors';

export class AdsStore {
  items: ServiceAd[] = [];
  search = '';
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.items.length === 0;
  }

  setSearch(search: string): void {
    this.search = search;
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const items = await api.getAds({ search: this.search });
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
}
