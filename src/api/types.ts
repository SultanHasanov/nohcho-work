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

export interface OrdersQuery {
  /** all — все заказы, near — рядом, top — популярные. Сегменты фрейма 03. */
  segment?: 'all' | 'near' | 'top';
  search?: string;
  categoryId?: string;
  status?: OrderStatus;
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
  createdAt: string;
}

export interface AdsQuery {
  search?: string;
  categoryId?: string;
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

export interface Session {
  user: User;
  method: AuthMethod;
}
