import { delay } from '@/api/mock/delay';
import { notifications as notificationFixture } from '@/api/mock/fixtures/notifications';
import { ratingSummary, reviews as reviewFixture } from '@/api/mock/fixtures/reviews';
import type { AppNotification, RatingSummary, Review } from '@/api/types';

let notifications: AppNotification[] = [...notificationFixture];

export async function getNotifications(): Promise<AppNotification[]> {
  await delay();
  return notifications;
}

export async function markNotificationsRead(): Promise<AppNotification[]> {
  await delay();
  notifications = notifications.map((item) => ({ ...item, isRead: true }));
  return notifications;
}

export async function getReviews(): Promise<Review[]> {
  await delay();
  return reviewFixture;
}

export async function getRatingSummary(): Promise<RatingSummary> {
  await delay();
  return ratingSummary;
}
