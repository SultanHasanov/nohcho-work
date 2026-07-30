import { Camera, X } from 'lucide-react';
import { useRef } from 'react';

interface PhotoPickerProps {
  photos: string[];
  onAdd: (urls: string[]) => void;
  onRemove: (url: string) => void;
}

/** Тайлы 72px из фрейма 06: плитка «Добавить» и превью с крестиком. */
export function PhotoPicker({ photos, onAdd, onRemove }: PhotoPickerProps) {
  const inputRef = useRef<HTMLInputElement>(null);

  return (
    <div className="flex flex-wrap gap-2.5">
      <button
        type="button"
        onClick={() => {
          inputRef.current?.click();
        }}
        className="flex size-18 flex-col items-center justify-center gap-1 rounded-btn border border-dashed border-line bg-surface"
      >
        <Camera size={22} strokeWidth={1.7} className="text-second" aria-hidden="true" />
        <span className="text-micro font-semibold text-muted">Добавить</span>
      </button>

      {photos.map((url) => (
        <span key={url} className="relative size-18">
          <img
            src={url}
            alt=""
            className="size-18 rounded-btn border border-line object-cover"
          />
          <button
            type="button"
            aria-label="Убрать фото"
            onClick={() => {
              onRemove(url);
            }}
            className="absolute -top-1.5 -right-1.5 flex size-5 items-center justify-center rounded-pill border border-line bg-surface-2"
          >
            <X size={10} strokeWidth={3} className="text-danger" aria-hidden="true" />
          </button>
        </span>
      ))}

      <input
        ref={inputRef}
        type="file"
        accept="image/*"
        multiple
        className="hidden"
        onChange={(event) => {
          const files = Array.from(event.target.files ?? []);
          onAdd(files.map((file) => URL.createObjectURL(file)));
          event.target.value = '';
        }}
      />
    </div>
  );
}
