import { makeAutoObservable, runInAction } from 'mobx';

import { api } from '@/api/client';
import type { Category, Order } from '@/api/types';
import { toMessage } from '@/lib/errors';

/** Черновик нового заказа: экран 06. */
export class OrderDraftStore {
  description = '';
  categoryId = '';
  address = '';
  /** Значение из datetime-local, формат «2026-07-30T12:00». */
  startsAt = '';
  /** Бюджет строкой: пользователь набирает цифры. */
  price = '';
  photos: string[] = [];

  categories: Category[] = [];
  isSubmitting = false;
  error: string | null = null;

  constructor() {
    makeAutoObservable(this);
  }

  get categoryTitle(): string {
    return this.categories.find((item) => item.id === this.categoryId)?.title ?? '';
  }

  /**
   * Отдельного поля «название» в макете нет, а в карточке заказа оно нужно.
   * Берём первую строку описания, максимум 60 символов.
   */
  get title(): string {
    const [firstLine = ''] = this.description.trim().split('\n');
    return firstLine.trim().slice(0, 60);
  }

  get priceValue(): number {
    return Number.parseInt(this.price.replace(/\D/g, ''), 10) || 0;
  }

  get isValid(): boolean {
    return (
      this.description.trim().length > 0 &&
      this.categoryId !== '' &&
      this.address.trim().length > 0 &&
      this.startsAt !== '' &&
      this.priceValue > 0
    );
  }

  setDescription(value: string): void {
    this.description = value;
  }

  setCategory(id: string): void {
    this.categoryId = id;
  }

  setAddress(value: string): void {
    this.address = value;
  }

  setStartsAt(value: string): void {
    this.startsAt = value;
  }

  setPrice(value: string): void {
    this.price = value.replace(/\D/g, '');
  }

  addPhotos(urls: string[]): void {
    this.photos = [...this.photos, ...urls];
  }

  removePhoto(url: string): void {
    this.photos = this.photos.filter((item) => item !== url);
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

  async submit(): Promise<Order | null> {
    if (!this.isValid) return null;

    this.isSubmitting = true;
    this.error = null;
    try {
      const order = await api.createOrder({
        title: this.title,
        description: this.description.trim(),
        categoryId: this.categoryId,
        price: this.priceValue,
        address: this.address.trim(),
        startsAt: new Date(this.startsAt).toISOString(),
        photos: this.photos,
      });
      runInAction(() => {
        this.reset();
      });
      return order;
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
    this.description = '';
    this.categoryId = '';
    this.address = '';
    this.startsAt = '';
    this.price = '';
    this.photos = [];
    this.error = null;
  }
}
