import { Plus } from 'lucide-react';
import { Link } from 'react-router-dom';

/** Круглая кнопка, наезжающая на панель навигации. Фрейм 03 прототипа. */
export function CreateFab() {
  return (
    <Link
      to="/orders/new"
      className="absolute -top-4.5 left-1/2 flex -translate-x-1/2 flex-col items-center gap-1"
    >
      <span className="flex size-cta-tall items-center justify-center rounded-pill bg-accent text-text shadow-fab active:bg-accent-pressed">
        <Plus size={26} strokeWidth={2.2} aria-hidden="true" />
      </span>
      <span className="text-meta font-semibold text-muted">Создать</span>
    </Link>
  );
}
