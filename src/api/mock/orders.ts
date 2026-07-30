import { delay } from '@/api/mock/delay';
import { orders as fixture } from '@/api/mock/fixtures/orders';
import { currentUser } from '@/api/mock/fixtures/users';
import type { Category, Order, OrderDraft, OrdersQuery } from '@/api/types';
import { categories as categoryFixture } from '@/api/mock/fixtures/categories';

let orders: Order[] = [...fixture];

function matchesSearch(order: Order, search: string): boolean {
  const needle = search.trim().toLowerCase();
  if (!needle) return true;
  return (
    order.title.toLowerCase().includes(needle) ||
    order.address.toLowerCase().includes(needle)
  );
}

export async function getOrders(query: OrdersQuery = {}): Promise<Order[]> {
  await delay();
  let result = orders.filter((order) => matchesSearch(order, query.search ?? ''));

  if (query.categoryId) {
    result = result.filter((order) => order.categoryId === query.categoryId);
  }
  if (query.status) {
    result = result.filter((order) => order.status === query.status);
  }
  if (query.segment === 'near') {
    result = [...result].sort((a, b) => a.distance - b.distance);
  }
  if (query.segment === 'top') {
    result = [...result].sort((a, b) => b.price - a.price);
  }
  return result;
}

export async function getOrder(id: string): Promise<Order> {
  await delay();
  const order = orders.find((item) => item.id === id);
  if (!order) {
    throw new Error('Заказ не найден.');
  }
  return order;
}

export async function createOrder(draft: OrderDraft): Promise<Order> {
  await delay();
  const order: Order = {
    ...draft,
    id: `o-${String(orders.length + 1)}`,
    coords: { lat: 43.3169, lon: 45.6981 },
    distance: 0,
    status: 'searching',
    clientId: currentUser.id,
    seekerId: null,
    createdAt: new Date().toISOString(),
  };
  orders = [order, ...orders];
  return order;
}

export async function takeOrder(id: string): Promise<Order> {
  await delay();
  const order = orders.find((item) => item.id === id);
  if (!order) {
    throw new Error('Заказ не найден.');
  }
  if (order.status !== 'searching') {
    throw new Error('Заказ уже взяли.');
  }
  const updated: Order = { ...order, status: 'assigned', seekerId: currentUser.id };
  orders = orders.map((item) => (item.id === id ? updated : item));
  return updated;
}

export async function getCategories(): Promise<Category[]> {
  await delay();
  return categoryFixture;
}
