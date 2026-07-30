import type { Coords } from '@/api/types';

/** Центр Грозного — точка отсчёта, пока нет геолокации пользователя. */
export const GROZNY_CENTER: Coords = { lat: 43.3169, lon: 45.6981 };

const EARTH_RADIUS = 6_371_000;

function toRadians(degrees: number): number {
  return (degrees * Math.PI) / 180;
}

/** Расстояние между двумя точками в метрах. */
export function distanceBetween(from: Coords, to: Coords): number {
  const dLat = toRadians(to.lat - from.lat);
  const dLon = toRadians(to.lon - from.lon);
  const lat1 = toRadians(from.lat);
  const lat2 = toRadians(to.lat);

  const a =
    Math.sin(dLat / 2) ** 2 + Math.cos(lat1) * Math.cos(lat2) * Math.sin(dLon / 2) ** 2;
  return Math.round(2 * EARTH_RADIUS * Math.asin(Math.sqrt(a)));
}
