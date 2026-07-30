import type { ReactNode } from 'react';

import { StoresContext } from '@/stores/context';
import { rootStore } from '@/stores/root';

export function StoresProvider({ children }: { children: ReactNode }) {
  return <StoresContext.Provider value={rootStore}>{children}</StoresContext.Provider>;
}
