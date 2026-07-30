import { delay } from '@/api/mock/delay';
import { orders as orderFixture } from '@/api/mock/fixtures/orders';
import {
  favoriteOrderIds,
  favoriteSeekers,
  responses,
} from '@/api/mock/fixtures/responses';
import type { FavoriteSeeker, Order, OrderResponse } from '@/api/types';

export async function getFavoriteOrders(): Promise<Order[]> {
  await delay();
  return orderFixture.filter((order) => favoriteOrderIds.includes(order.id));
}

export async function getFavoriteSeekers(): Promise<FavoriteSeeker[]> {
  await delay();
  return favoriteSeekers;
}

export async function getMyResponses(): Promise<OrderResponse[]> {
  await delay();
  return responses;
}
