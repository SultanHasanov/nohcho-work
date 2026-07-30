interface StarsProps {
  /** Сколько звёзд закрашено, 0–5. */
  rating: number;
  className?: string;
}

/** Пять звёзд: закрашенные янтарём, остальные цветом выключенной иконки. */
export function Stars({ rating, className = 'text-caption' }: StarsProps) {
  const filled = Math.round(rating);

  return (
    <span
      className={`tracking-widest ${className}`}
      aria-label={`Оценка ${String(filled)} из 5`}
    >
      <span className="text-amber">{'★'.repeat(filled)}</span>
      <span className="text-icon-off">{'★'.repeat(5 - filled)}</span>
    </span>
  );
}
