import {
  ChevronRight,
  ClipboardList,
  Heart,
  MessageSquare,
  Settings,
  Star,
  Volume2,
} from 'lucide-react';
import { Link } from 'react-router-dom';
import type { LucideIcon } from 'lucide-react';

interface MenuItem {
  label: string;
  icon: LucideIcon;
  /** Пусто — экрана в макете нет, строка нарисована и неактивна. */
  to?: string;
}

const items: MenuItem[] = [
  { label: 'Мои заказы', icon: ClipboardList, to: '/my-orders' },
  { label: 'Мои объявления', icon: Volume2, to: '/ads' },
  { label: 'Мои отклики', icon: MessageSquare },
  { label: 'Избранное', icon: Heart },
  { label: 'Рейтинг и отзывы', icon: Star },
  { label: 'Настройки', icon: Settings },
];

/** Список разделов профиля: строки 48px с разделителями — фрейм 13. */
export function ProfileMenu() {
  return (
    <div className="flex flex-col rounded-card border border-line bg-surface">
      {items.map((item) => (
        <MenuRow key={item.label} item={item} />
      ))}
    </div>
  );
}

function MenuRow({ item }: { item: MenuItem }) {
  const Icon = item.icon;
  const content = (
    <>
      <Icon size={20} strokeWidth={1.7} className="text-second" aria-hidden="true" />
      <span className="flex-1 text-lead font-semibold text-text">{item.label}</span>
      <ChevronRight
        size={18}
        strokeWidth={2}
        className="text-muted"
        aria-hidden="true"
      />
    </>
  );

  const rowClass =
    'flex h-12 items-center gap-3 border-b border-line px-card last:border-b-0';

  if (item.to === undefined) {
    return (
      <button type="button" disabled className={`${rowClass} text-left opacity-60`}>
        {content}
      </button>
    );
  }

  return (
    <Link to={item.to} className={`${rowClass} active:bg-surface-2`}>
      {content}
    </Link>
  );
}
