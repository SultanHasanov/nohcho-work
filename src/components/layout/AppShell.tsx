import type { ReactNode } from 'react';

/** На телефонах занимает всю ширину; ограничение макета включается на больших экранах. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-canvas">
      <div className="relative flex min-h-dvh w-full flex-col bg-bg sm:max-w-phone">
        {children}
      </div>
    </div>
  );
}
