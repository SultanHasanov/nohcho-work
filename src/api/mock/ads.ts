import { delay } from '@/api/mock/delay';
import { ads as fixture } from '@/api/mock/fixtures/ads';
import { currentUser } from '@/api/mock/fixtures/users';
import type { AdsQuery, ServiceAd, ServiceAdDraft } from '@/api/types';

let ads: ServiceAd[] = [...fixture];

export async function getAds(query: AdsQuery = {}): Promise<ServiceAd[]> {
  await delay();
  const needle = (query.search ?? '').trim().toLowerCase();
  return ads.filter((ad) => {
    const byCategory = !query.categoryId || ad.categoryId === query.categoryId;
    const bySeeker = !query.seekerId || ad.seekerId === query.seekerId;
    const bySearch = !needle || ad.title.toLowerCase().includes(needle);
    return byCategory && bySeeker && bySearch;
  });
}

export async function createAd(draft: ServiceAdDraft): Promise<ServiceAd> {
  await delay();
  const ad: ServiceAd = {
    ...draft,
    id: `a-${String(ads.length + 1)}`,
    seekerId: currentUser.id,
    isHidden: false,
    views: 0,
    responsesCount: 0,
    createdAt: new Date().toISOString(),
  };
  ads = [ad, ...ads];
  return ad;
}
