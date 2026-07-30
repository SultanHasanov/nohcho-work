import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { Avatar } from '@/components/ui/Avatar';

interface ChatHeaderProps {
  name: string;
  isOnline: boolean;
}

/** Шапка диалога из фрейма 12: назад, аватар 40px, имя и статус. */
export function ChatHeader({ name, isOnline }: ChatHeaderProps) {
  const navigate = useNavigate();

  return (
    <div className="flex h-cta-tall shrink-0 items-center gap-2.5 border-b border-line pr-gutter pl-1">
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

      <Avatar name={name} sizeClass="size-10" textClass="text-lead" isOnline={isOnline} />

      <div className="flex min-w-0 flex-col gap-0.5">
        <p className="truncate text-body font-bold text-text">{name}</p>
        <p
          className={[
            'text-meta font-medium',
            isOnline ? 'text-accent' : 'text-muted',
          ].join(' ')}
        >
          {isOnline ? 'В сети' : 'Не в сети'}
        </p>
      </div>
    </div>
  );
}
