import { ClipboardList, Home, MessageCircle, User } from 'lucide-react';
import { NavLink } from 'react-router-dom';

import { CreateFab } from '@/components/layout/CreateFab';

const tabs = [
  { to: '/', label: 'Главная', icon: Home },
  { to: '/my-orders', label: 'Заказы', icon: ClipboardList },
  { to: '/chats', label: 'Чат', icon: MessageCircle },
  { to: '/profile', label: 'Профиль', icon: User },
] as const;

/** Нижняя панель из прототипа: пять слотов, средний отдан кнопке «Создать». */
export function TabBar() {
  return (
    <nav className="sticky bottom-0 h-tabbar shrink-0 border-t border-line bg-nav">
      <div className="absolute inset-x-0 top-0 flex h-tabrow">
        <TabLink {...tabs[0]} />
        <TabLink {...tabs[1]} />
        <span className="flex-1" aria-hidden="true" />
        <TabLink {...tabs[2]} />
        <TabLink {...tabs[3]} />
      </div>
      <CreateFab />
    </nav>
  );
}

function TabLink({
  to,
  label,
  icon: Icon,
}: {
  to: string;
  label: string;
  icon: typeof Home;
}) {
  return (
    <NavLink
      to={to}
      end={to === '/'}
      className={({ isActive }) =>
        [
          'flex min-h-control flex-1 flex-col items-center justify-center gap-1',
          isActive ? 'text-accent' : 'text-muted',
        ].join(' ')
      }
    >
      <Icon size={22} strokeWidth={1.8} aria-hidden="true" />
      <span className="text-meta font-semibold">{label}</span>
    </NavLink>
  );
}
