import type { ReactNode } from 'react';

/** Нижняя полоса с основным действием: фрейм 06. */
export function StickyFooter({ children }: { children: ReactNode }) {
  return (
    <div className="sticky bottom-0 flex shrink-0 flex-col gap-2.5 border-t border-line bg-bg px-gutter pt-card pb-action-safe">
      {children}
    </div>
  );
}
