import { makeAutoObservable } from 'mobx';

import type { OrdersPeriod, OrdersQuery } from '@/api/types';

export interface FiltersValue {
  categoryIds: string[];
  priceMin: string;
  priceMax: string;
  /** Метры. null — весь город. */
  distanceMax: number | null;
  period: OrdersPeriod;
}

const empty: FiltersValue = {
  categoryIds: [],
  priceMin: '',
  priceMax: '',
  distanceMax: null,
  period: 'any',
};

function toNumber(value: string): number | undefined {
  const digits = value.replace(/\D/g, '');
  return digits === '' ? undefined : Number.parseInt(digits, 10);
}

/** Фильтры экрана 08: черновик в листе и применённое значение для списка. */
export class FiltersStore {
  draft: FiltersValue = { ...empty };
  applied: FiltersValue = { ...empty };

  constructor() {
    makeAutoObservable(this);
  }

  get query(): OrdersQuery {
    const { categoryIds, priceMin, priceMax, distanceMax, period } = this.applied;
    const query: OrdersQuery = { categoryIds, period };

    const min = toNumber(priceMin);
    if (min !== undefined) query.priceMin = min;

    const max = toNumber(priceMax);
    if (max !== undefined) query.priceMax = max;

    if (distanceMax !== null) query.distanceMax = distanceMax;

    return query;
  }

  get activeCount(): number {
    const { categoryIds, priceMin, priceMax, distanceMax, period } = this.applied;
    let count = categoryIds.length;
    if (priceMin !== '') count += 1;
    if (priceMax !== '') count += 1;
    if (distanceMax !== null) count += 1;
    if (period !== 'any') count += 1;
    return count;
  }

  /** Открытие листа: черновик начинается с применённых значений. */
  startEditing(): void {
    this.draft = { ...this.applied, categoryIds: [...this.applied.categoryIds] };
  }

  toggleCategory(id: string): void {
    const isOn = this.draft.categoryIds.includes(id);
    this.draft.categoryIds = isOn
      ? this.draft.categoryIds.filter((item) => item !== id)
      : [...this.draft.categoryIds, id];
  }

  setPriceMin(value: string): void {
    this.draft.priceMin = value.replace(/\D/g, '');
  }

  setPriceMax(value: string): void {
    this.draft.priceMax = value.replace(/\D/g, '');
  }

  setDistance(meters: number | null): void {
    this.draft.distanceMax = meters;
  }

  setPeriod(period: OrdersPeriod): void {
    this.draft.period = period;
  }

  resetDraft(): void {
    this.draft = { ...empty };
  }

  apply(): void {
    this.applied = { ...this.draft, categoryIds: [...this.draft.categoryIds] };
  }
}
