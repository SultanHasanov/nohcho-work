import type { ReactNode } from 'react';

/** На телефонах занимает всю ширину; ограничение макета включается на больших экранах. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex h-dvh justify-center overflow-hidden bg-canvas">
      <div className="relative flex h-full min-h-0 w-full flex-col overflow-hidden bg-bg sm:max-w-phone">
        {children}
      </div>
    </div>
  );
}
