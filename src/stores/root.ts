import { AdsStore } from '@/stores/ads';
import { ChatStore } from '@/stores/chat';
import { MyOrdersStore } from '@/stores/myOrders';
import { OrderDraftStore } from '@/stores/orderDraft';
import { OrdersStore } from '@/stores/orders';
import { SessionStore } from '@/stores/session';

export class RootStore {
  session = new SessionStore();
  orders = new OrdersStore();
  orderDraft = new OrderDraftStore();
  myOrders = new MyOrdersStore();
  ads = new AdsStore();
  chat = new ChatStore();
}

export const rootStore = new RootStore();
