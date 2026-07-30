import { createContext, useContext } from 'react';

import { rootStore } from '@/stores/root';
import type { RootStore } from '@/stores/root';

export const StoresContext = createContext<RootStore>(rootStore);

/** Единственный способ добраться до сторов из компонентов. */
export function useStores(): RootStore {
  return useContext(StoresContext);
}
