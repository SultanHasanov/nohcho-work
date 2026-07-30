import { formatTime } from '@/lib/format';

interface MessageBubbleProps {
  text: string;
  createdAt: string;
  isOwn: boolean;
}

/** Пузырь переписки из фрейма 12: скошенный угол со стороны автора. */
export function MessageBubble({ text, createdAt, isOwn }: MessageBubbleProps) {
  return (
    <div
      className={[
        'flex max-w-3/4 items-end gap-2.5 px-3 pt-2.75 pb-2.25',
        isOwn
          ? 'self-end rounded-bubble-out bg-avatar'
          : 'self-start rounded-bubble-in bg-surface-2',
      ].join(' ')}
    >
      <p className="text-control leading-snug font-medium text-text">{text}</p>
      <span
        className={[
          'shrink-0 text-tiny font-medium',
          isOwn ? 'text-own-time' : 'text-muted',
        ].join(' ')}
      >
        {formatTime(createdAt)}
      </span>
    </div>
  );
}

/** Разделитель дня над группой сообщений. */
export function DateDivider({ label }: { label: string }) {
  return (
    <span className="self-center rounded-pill bg-surface px-3 py-1 text-meta font-semibold text-muted">
      {label}
    </span>
  );
}
