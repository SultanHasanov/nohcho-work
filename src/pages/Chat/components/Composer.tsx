import { ArrowRight, Paperclip } from 'lucide-react';
import { useState } from 'react';

interface ComposerProps {
  isSending: boolean;
  onSend: (text: string) => void;
}

/** Поле ввода сообщения из фрейма 12. */
export function Composer({ isSending, onSend }: ComposerProps) {
  const [text, setText] = useState('');
  const canSend = text.trim().length > 0 && !isSending;

  function submit() {
    if (!canSend) return;
    onSend(text);
    setText('');
  }

  return (
    <div className="sticky bottom-0 flex shrink-0 items-center gap-2.5 border-t border-line bg-bg px-gutter pt-3 pb-7 pb-safe">
      <label className="flex h-field flex-1 items-center gap-2.5 rounded-btn border border-line bg-surface px-card focus-within:border-accent">
        {/* Вложений в моках нет — скрепка нарисована и пока неактивна. */}
        <Paperclip
          size={20}
          strokeWidth={1.7}
          className="shrink-0 text-muted"
          aria-hidden="true"
        />
        <input
          type="text"
          value={text}
          placeholder="Введите сообщение…"
          onChange={(event) => {
            setText(event.target.value);
          }}
          onKeyDown={(event) => {
            if (event.key === 'Enter') submit();
          }}
          className="min-w-0 flex-1 bg-transparent text-lead font-medium text-text outline-none placeholder:text-muted"
        />
      </label>

      <button
        type="button"
        aria-label="Отправить"
        disabled={!canSend}
        onClick={submit}
        className="flex size-12 shrink-0 items-center justify-center rounded-pill bg-accent active:bg-accent-pressed disabled:opacity-60"
      >
        <ArrowRight
          size={22}
          strokeWidth={2.2}
          className="text-text"
          aria-hidden="true"
        />
      </button>
    </div>
  );
}
