import * as mock from '@/api/mock';
import type {
  AdsQuery,
  Category,
  Chat,
  Message,
  Order,
  OrderDraft,
  OrdersQuery,
  Role,
  ServiceAd,
  Session,
  User,
} from '@/api/types';

/**
 * Контракт данных приложения. Позже его закроет PocketBase, поэтому
 * сигнатуры менять нельзя — меняется только реализация под капотом.
 * Ни один компонент и ни один стор не обращается к фикстурам напрямую.
 */
export interface ApiClient {
  loginWithTelegram(): Promise<Session>;
  requestPhoneCode(phone: string): Promise<void>;
  confirmPhoneCode(phone: string, code: string): Promise<Session>;
  getMe(): Promise<User | null>;
  setRole(role: Role): Promise<User>;
  setAvailability(isAvailable: boolean): Promise<User>;
  logout(): Promise<void>;

  getOrders(query?: OrdersQuery): Promise<Order[]>;
  getOrder(id: string): Promise<Order>;
  createOrder(draft: OrderDraft): Promise<Order>;
  takeOrder(id: string): Promise<Order>;
  getCategories(): Promise<Category[]>;

  getAds(query?: AdsQuery): Promise<ServiceAd[]>;

  getChats(): Promise<Chat[]>;
  getMessages(chatId: string): Promise<Message[]>;
  sendMessage(chatId: string, text: string): Promise<Message>;
}

const mockClient: ApiClient = mock;

function pickClient(): ApiClient {
  switch (import.meta.env.VITE_API_MODE) {
    case 'mock':
    default:
      return mockClient;
  }
}

export const api: ApiClient = pickClient();
