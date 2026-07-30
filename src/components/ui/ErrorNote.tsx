interface ErrorNoteProps {
  message: string;
  onRetry: () => void;
}

/** Сообщение об ошибке с кнопкой повтора. */
export function ErrorNote({ message, onRetry }: ErrorNoteProps) {
  return (
    <div
      role="alert"
      className="flex flex-col gap-2 rounded-btn border border-line bg-surface p-card"
    >
      <p className="text-caption font-medium text-danger">{message}</p>
      <button
        type="button"
        onClick={onRetry}
        className="min-h-control text-left text-caption font-semibold text-accent"
      >
        Повторить
      </button>
    </div>
  );
}
