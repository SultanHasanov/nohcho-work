import { makeAutoObservable } from 'mobx';

/**
 * Настройки уведомлений: экран 18. Бэкенда для них нет, поэтому живут в памяти —
 * когда появится контракт, тумблеры переедут на api.
 */
export class SettingsStore {
  ordersNearby = true;
  messages = true;
  orderStatuses = true;

  constructor() {
    makeAutoObservable(this);
  }

  toggleOrdersNearby(): void {
    this.ordersNearby = !this.ordersNearby;
  }

  toggleMessages(): void {
    this.messages = !this.messages;
  }

  toggleOrderStatuses(): void {
    this.orderStatuses = !this.orderStatuses;
  }
}
