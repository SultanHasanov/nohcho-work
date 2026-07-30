import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Category, PriceUnit, ServiceAd } from '@/api/types';
import { toMessage } from '@/lib/errors';

/** Черновик объявления: экран 12b. */
export class AdDraftStore {
  title = '';
  description = '';
  categoryId = '';
  priceUnit: PriceUnit = 'hour';
  price = '';
  city = 'Грозный';

  categories: Category[] = [];
  isSubmitting = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get categoryTitle(): string {
    return this.categories.find((item) => item.id === this.categoryId)?.title ?? '';
  }

  get priceValue(): number {
    return Number.parseInt(this.price.replace(/\D/g, ''), 10) || 0;
  }

  get isValid(): boolean {
    const hasPrice = this.priceUnit === 'negotiable' || this.priceValue > 0;
    return (
      this.title.trim().length > 0 &&
      this.description.trim().length > 0 &&
      this.categoryId !== '' &&
      hasPrice
    );
  }

  setTitle(value: string): void {
    this.title = value;
  }

  setDescription(value: string): void {
    this.description = value;
  }

  setCategory(id: string): void {
    this.categoryId = id;
  }

  setPriceUnit(unit: PriceUnit): void {
    this.priceUnit = unit;
    if (unit === 'negotiable') this.price = '';
  }

  setPrice(value: string): void {
    this.price = value.replace(/\D/g, '');
  }

  setCity(value: string): void {
    this.city = value;
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

  async submit(): Promise<ServiceAd | null> {
    if (!this.isValid) return null;

    this.isSubmitting = true;
    this.error = null;
    try {
      const ad = await api.createAd({
        title: this.title.trim(),
        description: this.description.trim(),
        categoryId: this.categoryId,
        price: this.priceValue,
        priceUnit: this.priceUnit,
        city: this.city.trim(),
      });
      runInAction(() => {
        this.reset();
      });
      return ad;
    } catch (error) {
      runInAction(() => {
        this.error = toMessage(error);
      });
      return null;
    } finally {
      runInAction(() => {
        this.isSubmitting = false;
      });
    }
  }

  reset(): void {
    this.title = '';
    this.description = '';
    this.categoryId = '';
    this.priceUnit = 'hour';
    this.price = '';
    this.city = 'Грозный';
    this.error = null;
  }
}
