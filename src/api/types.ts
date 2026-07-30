/** Роли. seeker — исполнитель, ищет работу. client — заказчик, публикует заказы. */
export type Role = 'seeker' | 'client';

export type OrderStatus = 'searching' | 'assigned' | 'in_progress' | 'done' | 'cancelled';

/** Единица цены в объявлении исполнителя. */
export type PriceUnit = 'hour' | 'day' | 'shift' | 'negotiable';

export type AuthMethod = 'telegram' | 'phone';

export interface Coords {
  lat: number;
  lon: number;
}

export interface Category {
  id: string;
  title: string;
}

export interface User {
  id: string;
  name: string;
  /** Роль не выбрана сразу после первого входа. */
  role: Role | null;
  city: string;
  phone: string | null;
  telegram: string | null;
  rating: number;
  reviewsCount: number;
  doneCount: number;
  positiveShare: number;
  /** Месяцев на платформе — из этого считается подпись «2 года». */
  monthsOnPlatform: number;
  balance: number;
  isAvailable: boolean;
}

export interface Order {
  id: string;
  title: string;
  description: string;
  categoryId: string;
  price: number;
  address: string;
  coords: Coords;
  /** Расстояние до пользователя в метрах. Считает бэкенд, мок — тоже. */
  distance: number;
  startsAt: string;
  status: OrderStatus;
  photos: string[];
  clientId: string;
  seekerId: string | null;
  createdAt: string;
}

export interface OrderDraft {
  title: string;
  description: string;
  categoryId: string;
  price: number;
  address: string;
  startsAt: string;
  photos: string[];
}

/** Периоды из фрейма 08. */
export type OrdersPeriod = 'today' | 'tomorrow' | 'week' | 'any';

export interface OrdersQuery {
  /** all — все заказы, near — рядом, top — популярные. Сегменты фрейма 03. */
  segment?: 'all' | 'near' | 'top';
  search?: string;
  categoryId?: string;
  status?: OrderStatus;
  /** Фильтры экрана 08. */
  categoryIds?: string[];
  priceMin?: number;
  priceMax?: number;
  /** Максимальное расстояние в метрах. Пусто — весь город. */
  distanceMax?: number;
  period?: OrdersPeriod;
}

export interface ServiceAd {
  id: string;
  seekerId: string;
  title: string;
  description: string;
  categoryId: string;
  price: number;
  priceUnit: PriceUnit;
  city: string;
  /** Скрытое объявление лежит во второй вкладке экрана 11. */
  isHidden: boolean;
  views: number;
  responsesCount: number;
  createdAt: string;
}

export interface ServiceAdDraft {
  title: string;
  description: string;
  categoryId: string;
  price: number;
  priceUnit: PriceUnit;
  city: string;
}

export interface AdsQuery {
  search?: string;
  categoryId?: string;
  seekerId?: string;
}

export interface Message {
  id: string;
  chatId: string;
  authorId: string;
  text: string;
  createdAt: string;
}

export interface Chat {
  id: string;
  orderId: string;
  orderTitle: string;
  peerId: string;
  peerName: string;
  peerIsOnline: boolean;
  lastMessage: string;
  unreadCount: number;
  updatedAt: string;
}

/** Статусы отклика из фрейма 20. */
export type ResponseStatus = 'pending' | 'accepted' | 'declined';

export interface OrderResponse {
  id: string;
  orderId: string;
  orderTitle: string;
  price: number;
  status: ResponseStatus;
  createdAt: string;
}

/** Карточка исполнителя во вкладке «Исполнители» экрана 19. */
export interface FavoriteSeeker {
  userId: string;
  name: string;
  rating: number;
  categoryTitle: string;
  priceFrom: number;
  priceUnit: PriceUnit;
}

/** Типы уведомлений из фрейма 16. */
export type NotificationKind =
  'order_nearby' | 'order_response' | 'order_assigned' | 'order_done' | 'review';

export interface AppNotification {
  id: string;
  kind: NotificationKind;
  title: string;
  text: string;
  createdAt: string;
  isRead: boolean;
}

export interface Review {
  id: string;
  authorId: string;
  authorName: string;
  rating: number;
  text: string;
  orderTitle: string;
  createdAt: string;
}

export interface RatingSummary {
  average: number;
  total: number;
  /** Сколько отзывов на каждую оценку: ключи «5»…«1». */
  breakdown: Record<string, number>;
}

export interface Session {
  user: User;
  method: AuthMethod;
}
