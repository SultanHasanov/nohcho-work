import { ChevronDown, MapPin } from 'lucide-react';

/** Строка города из фрейма 03. Выбора города в макете пока нет — строка неактивна. */
export function CityPicker({ city }: { city: string }) {
  return (
    <button
      type="button"
      disabled
      className="flex min-h-control items-center gap-1.5 self-start"
    >
      <MapPin size={18} strokeWidth={1.7} className="text-accent" aria-hidden="true" />
      <span className="text-lead font-semibold text-text">{city}</span>
      <ChevronDown size={16} strokeWidth={2} className="text-second" aria-hidden="true" />
    </button>
  );
}
