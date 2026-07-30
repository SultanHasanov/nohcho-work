import { Outlet } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TabBar } from '@/components/layout/TabBar';

/** Экраны с нижней панелью: главная, заказы, чаты, профиль. */
export function TabsLayout() {
  return (
    <AppShell>
      <StatusBarSpacer />
      <main className="flex flex-1 flex-col">
        <Outlet />
      </main>
      <TabBar />
    </AppShell>
  );
}
