import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

interface NotificationsHeaderProps {
  hasUnread: boolean;
  onMarkAll: () => void;
}

/** Шапка фрейма 16: назад, заголовок слева, «Прочитать все» справа. */
export function NotificationsHeader({ hasUnread, onMarkAll }: NotificationsHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-cta shrink-0 items-center pr-gutter pl-1">
      <button
        type="button"
        aria-label="Назад"
        onClick={() => {
          void navigate(-1);
        }}
        className="flex size-11 shrink-0 items-center justify-center"
      >
        <ChevronLeft size={24} strokeWidth={2} className="text-text" aria-hidden="true" />
      </button>
      <h1 className="flex-1 text-screen-title font-bold text-text">Уведомления</h1>
      <button
        type="button"
        disabled={!hasUnread}
        onClick={onMarkAll}
        className="min-h-control text-caption font-semibold text-accent disabled:opacity-40"
      >
        Прочитать все
      </button>
    </div>
  );
}
