import { Link } from 'react-router-dom';

import type { User } from '@/api/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatRating, formatTenure } from '@/lib/format';

interface ClientRowProps {
  client: User;
  /** Диалог по заказу, если он уже заведён. */
  chatId: string | null;
}

/** Карточка заказчика из фрейма 04. */
export function ClientRow({ client, chatId }: ClientRowProps) {
  const stars = '★'.repeat(Math.round(client.rating));

  return (
    <div className="flex items-center gap-3">
      <Avatar name={client.name} sizeClass="size-10" textClass="text-lead" />

      <div className="flex min-w-0 flex-1 flex-col gap-0.75">
        <p className="truncate text-lead font-bold text-text">{client.name}</p>
        <p className="flex items-center gap-1.75">
          <span className="text-note tracking-widest text-amber">{stars}</span>
          <span className="text-note font-semibold text-text">
            {formatRating(client.rating)}
          </span>
          <span className="text-meta font-medium text-muted">
            · на платформе {formatTenure(client.monthsOnPlatform)}
          </span>
        </p>
      </div>

      {chatId === null ? (
        <button
          type="button"
          disabled
          className="h-control shrink-0 rounded-btn border border-line px-4 text-control font-semibold text-text disabled:opacity-60"
        >
          Написать
        </button>
      ) : (
        <Link
          to={`/chats/${chatId}`}
          className="flex h-control shrink-0 items-center rounded-btn border border-line px-4 text-control font-semibold text-text active:bg-surface-2"
        >
          Написать
        </Link>
      )}
    </div>
  );
}
