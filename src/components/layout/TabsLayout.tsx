import { Outlet } from 'react-router-dom';

import { AppShell } from '@/components/layout/AppShell';
import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TabBar } from '@/components/layout/TabBar';

/** Экраны с нижней панелью: главная, заказы, чаты, профиль. */
export function TabsLayout() {
  return (
    <AppShell>
      <StatusBarSpacer />
      <main className="flex min-h-0 flex-1 flex-col overflow-y-auto overscroll-contain">
        <Outlet />
      </main>
      <TabBar />
    </AppShell>
  );
}
