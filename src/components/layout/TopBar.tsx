import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

/** Шапка внутреннего экрана: кнопка «назад» 44px и заголовок по центру. */
export function TopBar({ title }: { title: string }) {
  const navigate = useNavigate();

  return (
    <div className="flex h-cta shrink-0 items-center pr-2 pl-1">
      <button
        type="button"
        aria-label="Назад"
        onClick={() => {
          void navigate(-1);
        }}
        className="flex size-11 items-center justify-center"
      >
        <ChevronLeft size={24} strokeWidth={2} className="text-text" aria-hidden="true" />
      </button>
      <h1 className="mr-11 flex-1 text-center text-screen-title font-bold text-text">
        {title}
      </h1>
    </div>
  );
}
