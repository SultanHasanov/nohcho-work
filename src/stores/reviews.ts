import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { RatingSummary, Review } from '@/api/types';
import { toMessage } from '@/lib/errors';

/** Рейтинг и отзывы: экран 17. */
export class ReviewsStore {
  items: Review[] = [];
  summary: RatingSummary | null = null;
  isLoading = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get isEmpty(): boolean {
    return !this.isLoading && this.error === null && this.items.length === 0;
  }

  /** Доля оценки в гистограмме, от 0 до 1. */
  share(rating: number): number {
    const summary = this.summary;
    if (!summary || summary.total === 0) return 0;
    return (summary.breakdown[String(rating)] ?? 0) / summary.total;
  }

  async load(): Promise<void> {
    this.isLoading = true;
    this.error = null;
    try {
      const [items, summary] = await Promise.all([
        api.getReviews(),
        api.getRatingSummary(),
      ]);
      runInAction(() => {
        this.items = items;
        this.summary = summary;
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
