import { Check } from 'lucide-react';
import type { ReactNode } from 'react';

interface ResultScreenProps {
  title: string;
  description: string;
  /** Сводка под текстом: карточка заказа во фрейме 07. */
  summary?: ReactNode;
  actions: ReactNode;
}

/** Экран подтверждения из фреймов 05 и 07. */
export function ResultScreen({
  title,
  description,
  summary,
  actions,
}: ResultScreenProps) {
  return (
    <>
      <div className="flex flex-1 flex-col items-center justify-center gap-4 px-6 text-center">
        <span className="flex size-24 items-center justify-center rounded-pill bg-accent-soft">
          <Check size={44} strokeWidth={2.4} className="text-accent" aria-hidden="true" />
        </span>
        <h1 className="text-screen-title font-bold text-text">{title}</h1>
        <p className="max-w-67.5 text-caption leading-relaxed font-medium text-second">
          {description}
        </p>
        {summary ? <div className="mt-2 w-full text-left">{summary}</div> : null}
      </div>

      <div className="flex shrink-0 flex-col gap-2.5 px-gutter pb-action-safe">
        {actions}
      </div>
    </>
  );
}
