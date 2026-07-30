import {
  Boxes,
  Hammer,
  Package,
  Sprout,
  Trash2,
  Wrench,
  Wrench as Other,
} from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

const icons: Record<string, LucideIcon> = {
  cleanup: Trash2,
  moving: Package,
  garden: Sprout,
  furniture: Boxes,
  repair: Wrench,
  demolition: Hammer,
};

/** Иконка категории — ей подменяем фотографию, которой в моках нет. */
export function CategoryIcon({
  categoryId,
  size,
}: {
  categoryId: string;
  size: number;
}) {
  const Icon = icons[categoryId] ?? Other;
  return (
    <Icon size={size} strokeWidth={1.7} className="text-icon-off" aria-hidden="true" />
  );
}

/** Превью 84×84 из фрейма 03: штриховка и иконка категории. */
export function OrderThumb({ categoryId }: { categoryId: string }) {
  return (
    <span className="flex size-thumb shrink-0 items-center justify-center rounded-btn border border-line bg-hatch-thumb">
      <CategoryIcon categoryId={categoryId} size={28} />
    </span>
  );
}
