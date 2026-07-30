import { observer } from 'mobx-react-lite';

import type { OrdersPeriod } from '@/api/types';
import { Chip } from '@/components/ui/Chip';
import { Field } from '@/components/ui/Field';
import { InputRow } from '@/components/ui/FieldRow';
import { Segmented } from '@/components/ui/Segmented';
import { plural } from '@/lib/format';
import { useStores } from '@/stores/context';

const distances: { value: string; label: string }[] = [
  { value: '1000', label: '1 км' },
  { value: '3000', label: '3 км' },
  { value: '5000', label: '5 км' },
  { value: 'all', label: 'весь город' },
];

const periods: { value: OrdersPeriod; label: string }[] = [
  { value: 'today', label: 'Сегодня' },
  { value: 'tomorrow', label: 'Завтра' },
  { value: 'week', label: 'На неделе' },
  { value: 'any', label: 'Любое' },
];

/** Лист фильтров из фрейма 08. */
export const FiltersSheet = observer(function FiltersSheet({
  onClose,
}: {
  onClose: () => void;
}) {
  const { filters, orders } = useStores();
  const draft = filters.draft;

  function handleApply() {
    filters.apply();
    void orders.load(filters.query);
    onClose();
  }

  return (
    <div className="fixed inset-0 z-10 flex items-end justify-center">
      <button
        type="button"
        aria-label="Закрыть"
        onClick={onClose}
        className="absolute inset-0 bg-canvas/70"
      />

      <div className="relative flex max-h-sheet w-full flex-col overflow-y-auto rounded-t-card border-t border-line bg-bg pb-action-safe sm:max-w-phone">
        <span className="mx-auto mt-2.5 h-1.5 w-12 shrink-0 rounded-pill bg-line" />

        <div className="flex items-center justify-between px-gutter pt-3">
          <h2 className="text-screen-title font-bold text-text">Фильтры</h2>
          <button
            type="button"
            onClick={() => {
              filters.resetDraft();
            }}
            className="min-h-control text-control font-semibold text-accent"
          >
            Сбросить
          </button>
        </div>

        <div className="flex flex-col gap-4.5 px-gutter pt-4.5">
          <Field label="Категория">
            <div className="flex flex-wrap gap-2">
              {orders.categories.map((category) => (
                <Chip
                  key={category.id}
                  label={category.title}
                  isSelected={draft.categoryIds.includes(category.id)}
                  onClick={() => {
                    filters.toggleCategory(category.id);
                  }}
                />
              ))}
            </div>
          </Field>

          <Field label="Цена, ₽">
            <div className="flex gap-2.5">
              <InputRow
                value={draft.priceMin}
                placeholder="от 3 000"
                inputMode="numeric"
                trailing={null}
                onChange={(value) => {
                  filters.setPriceMin(value);
                }}
              />
              <InputRow
                value={draft.priceMax}
                placeholder="до 15 000"
                inputMode="numeric"
                trailing={null}
                onChange={(value) => {
                  filters.setPriceMax(value);
                }}
              />
            </div>
          </Field>

          <Field label="Расстояние">
            <Segmented
              options={distances}
              value={draft.distanceMax === null ? 'all' : String(draft.distanceMax)}
              onChange={(value) => {
                filters.setDistance(value === 'all' ? null : Number.parseInt(value, 10));
              }}
            />
          </Field>

          <Field label="Когда">
            <div className="flex flex-wrap gap-2">
              {periods.map((period) => (
                <Chip
                  key={period.value}
                  label={period.label}
                  isSelected={draft.period === period.value}
                  onClick={() => {
                    filters.setPeriod(period.value);
                  }}
                />
              ))}
            </div>
          </Field>
        </div>

        <div className="px-gutter pt-3 pb-3">
          <button
            type="button"
            onClick={handleApply}
            className="h-cta w-full rounded-btn bg-accent text-body font-semibold text-text active:bg-accent-pressed"
          >
            Показать {orders.count} {plural(orders.count, 'заказ', 'заказа', 'заказов')}
          </button>
        </div>
      </div>
    </div>
  );
});
