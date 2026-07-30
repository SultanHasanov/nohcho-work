import { delay } from '@/api/mock/delay';
import { ads as fixture } from '@/api/mock/fixtures/ads';
import type { AdsQuery, ServiceAd } from '@/api/types';

const ads: ServiceAd[] = [...fixture];

export async function getAds(query: AdsQuery = {}): Promise<ServiceAd[]> {
  await delay();
  const needle = (query.search ?? '').trim().toLowerCase();
  return ads.filter((ad) => {
    const byCategory = !query.categoryId || ad.categoryId === query.categoryId;
    const bySearch = !needle || ad.title.toLowerCase().includes(needle);
    return byCategory && bySearch;
  });
}
