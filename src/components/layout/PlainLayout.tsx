import { Outlet } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';

/** Экраны без нижней панели: вход, выбор роли, создание заказа, диалог. */
export function PlainLayout() {
  return (
    <AppShell>
      <Outlet />
    </AppShell>
  );
}
