import { Outlet } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';

/** Экраны без нижней панели: вход, выбор роли, создание заказа, диалог. */
export function PlainLayout() {
  return (
    <AppShell>
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        <Outlet />
      </main>
    </AppShell>
  );
}
