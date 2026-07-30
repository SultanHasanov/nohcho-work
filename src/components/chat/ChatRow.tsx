import { Link } from 'react-router-dom';

import type { Chat } from '@/api/types';
import { Avatar } from '@/components/ui/Avatar';
import { formatListTime } from '@/lib/format';

/** Строка диалога 72px из фрейма 09. */
export function ChatRow({ chat }: { chat: Chat }) {
  return (
    <Link
      to={`/chats/${chat.id}`}
      className="flex h-18 items-center gap-3 border-b border-line"
    >
      <Avatar
        name={chat.peerName}
        sizeClass="size-12"
        textClass="text-body"
        isOnline={chat.peerIsOnline}
      />

      <div className="flex min-w-0 flex-1 flex-col gap-0.75">
        <p className="truncate text-lead font-bold text-text">{chat.peerName}</p>
        <p className="truncate text-caption font-medium text-second">
          {chat.lastMessage}
        </p>
        <p className="truncate text-meta font-medium text-muted">{chat.orderTitle}</p>
      </div>

      <div className="flex shrink-0 flex-col items-end gap-1.5">
        <span className="text-meta font-medium text-muted">
          {formatListTime(chat.updatedAt)}
        </span>
        {chat.unreadCount > 0 ? (
          <span className="flex size-5 items-center justify-center rounded-pill bg-accent text-meta font-bold text-text">
            {chat.unreadCount}
          </span>
        ) : null}
      </div>
    </Link>
  );
}
