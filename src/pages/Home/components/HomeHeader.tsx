import { Bell } from 'lucide-react';
import { Link } from 'react-router-dom';

import { Logo, LogoWordmark } from '@/components/ui/Logo';

/** Шапка фрейма 03: знак с подписью и колокольчик с точкой непрочитанного. */
export function HomeHeader({ hasUnread }: { hasUnread: boolean }) {
  return (
    <div className="flex items-center justify-between">
      <div className="flex items-center gap-2.25">
        <Logo size={24} />
        <LogoWordmark className="text-logo-header font-extrabold text-text" />
      </div>

      <Link
        to="/notifications"
        aria-label="Уведомления"
        className="relative flex size-11 items-center justify-center"
      >
        <Bell size={24} strokeWidth={1.7} className="text-text" aria-hidden="true" />
        {hasUnread ? (
          <span className="absolute top-2.25 right-2.25 size-2.25 rounded-pill border-2 border-bg bg-accent" />
        ) : null}
      </Link>
    </div>
  );
}
