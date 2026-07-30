import type { ReactNode } from 'react';

/** Внешний контейнер приложения: базовая ширина 390px по центру канваса. */
export function AppShell({ children }: { children: ReactNode }) {
  return (
    <div className="flex min-h-dvh justify-center bg-canvas">
      <div className="relative flex min-h-dvh w-full max-w-phone flex-col bg-bg">
        {children}
      </div>
    </div>
  );
}
