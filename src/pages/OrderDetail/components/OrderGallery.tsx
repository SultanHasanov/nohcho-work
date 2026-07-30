import { ChevronLeft } from 'lucide-react';
import { useNavigate } from 'react-router-dom';

import { CategoryIcon } from '@/components/order/OrderThumb';

interface OrderGalleryProps {
  photos: string[];
  categoryId: string;
}

/**
 * Галерея 224px из фрейма 04. Фотографий в моках нет, поэтому при пустом
 * списке показываем штриховку с иконкой категории, как в макете.
 */
export function OrderGallery({ photos, categoryId }: OrderGalleryProps) {
  const navigate = useNavigate();
  const count = photos.length;

  return (
    <div className="relative flex h-56 shrink-0 items-center justify-center bg-hatch-thumb">
      {count > 0 ? (
        <img src={photos[0]} alt="" className="size-full object-cover" />
      ) : (
        <CategoryIcon categoryId={categoryId} size={44} />
      )}

      <button
        type="button"
        aria-label="Назад"
        onClick={() => {
          void navigate(-1);
        }}
        className="absolute top-15 left-3 flex size-11 items-center justify-center rounded-pill bg-bg/65"
      >
        <ChevronLeft size={24} strokeWidth={2} className="text-text" aria-hidden="true" />
      </button>

      {count > 1 ? (
        <>
          <span className="absolute top-17.5 right-gutter rounded-pill bg-bg/65 px-2.5 py-1.25 text-meta font-semibold text-text">
            1 / {count}
          </span>
          <span className="absolute bottom-3 left-1/2 flex -translate-x-1/2 gap-1.5">
            {photos.map((photo, index) => (
              <span
                key={photo}
                className={[
                  'size-1.75 rounded-pill',
                  index === 0 ? 'bg-text' : 'bg-muted',
                ].join(' ')}
              />
            ))}
          </span>
        </>
      ) : null}
    </div>
  );
}
