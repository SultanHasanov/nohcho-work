import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { ServiceAd } from '@/api/types';
import { toMessage } from '@/lib/errors';

export type AdsTab = 'active' | 'hidden';

export class AdsStore {
  items: ServiceAd[] = [];
  tab: AdsTab = 'active';
  search = '';
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get visible(): ServiceAd[] {
    const wantHidden = this.tab === 'hidden';
    return this.items.filter((ad) => ad.isHidden === wantHidden);
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.visible.length === 0;
  }

  setTab(tab: AdsTab): void {
    this.tab = tab;
  }

  setSearch(search: string): void {
    this.search = search;
  }

  /** Свои объявления: экран 11. Без seekerId — общая витрина. */
  async load(seekerId?: string): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const items = await api.getAds(
        seekerId === undefined
          ? { search: this.search }
          : { search: this.search, seekerId },
      );
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
