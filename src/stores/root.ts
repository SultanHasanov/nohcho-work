import { AdDraftStore } from '@/stores/adDraft';
import { AdsStore } from '@/stores/ads';
import { ChatStore } from '@/stores/chat';
import { FavoritesStore } from '@/stores/favorites';
import { FiltersStore } from '@/stores/filters';
import { MyOrdersStore } from '@/stores/myOrders';
import { OrderDetailStore } from '@/stores/orderDetail';
import { OrderDraftStore } from '@/stores/orderDraft';
import { NotificationsStore } from '@/stores/notifications';
import { OrdersStore } from '@/stores/orders';
import { PhoneAuthStore } from '@/stores/phoneAuth';
import { ReviewsStore } from '@/stores/reviews';
import { SessionStore } from '@/stores/session';
import { SettingsStore } from '@/stores/settings';

export class RootStore {
  session = new SessionStore();
  phoneAuth = new PhoneAuthStore();
  orders = new OrdersStore();
  filters = new FiltersStore();
  orderDetail = new OrderDetailStore();
  orderDraft = new OrderDraftStore();
  myOrders = new MyOrdersStore();
  ads = new AdsStore();
  adDraft = new AdDraftStore();
  chat = new ChatStore();
  notifications = new NotificationsStore();
  reviews = new ReviewsStore();
  settings = new SettingsStore();
  favorites = new FavoritesStore();
}

export const rootStore = new RootStore();
