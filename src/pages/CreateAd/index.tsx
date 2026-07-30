import { ChevronRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import type { PriceUnit } from '@/api/types';
import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { StickyFooter } from '@/components/layout/StickyFooter';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { CategorySheet } from '@/components/ui/CategorySheet';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Field } from '@/components/ui/Field';
import { FieldRow, InputRow } from '@/components/ui/FieldRow';
import { Segmented } from '@/components/ui/Segmented';
import { TextArea } from '@/components/ui/TextArea';
import { useStores } from '@/stores/context';

const units: { value: PriceUnit; label: string }[] = [
  { value: 'hour', label: 'час' },
  { value: 'day', label: 'день' },
  { value: 'shift', label: 'смена' },
  { value: 'negotiable', label: 'договорная' },
];

/** Фрейм 12b: форма нового объявления. */
const CreateAdPage = observer(function CreateAdPage() {
  const { adDraft, ads, session } = useStores();
  const navigate = useNavigate();
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    void adDraft.loadCategories();
  }, [adDraft]);

  async function handleSubmit() {
    const ad = await adDraft.submit();
    if (ad) {
      if (session.user) void ads.load(session.user.id);
      void navigate('/ads', { replace: true });
    }
  }

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="Новое объявление" />

      <div className="flex flex-1 flex-col gap-gutter px-gutter pt-2 pb-4">
        <Field label="Что вы делаете">
          <InputRow
            value={adDraft.title}
            placeholder="Например: грузчик, переезды"
            trailing={null}
            onChange={(value) => {
              adDraft.setTitle(value);
            }}
          />
        </Field>

        <Field label="Описание">
          <TextArea
            value={adDraft.description}
            placeholder="Расскажите об опыте: что умеете, свой инструмент, сколько лет работаете"
            onChange={(value) => {
              adDraft.setDescription(value);
            }}
          />
        </Field>

        <Field label="Категория">
          <FieldRow
            value={adDraft.categoryTitle}
            placeholder="Выберите категорию"
            onClick={() => {
              setSheetOpen(true);
            }}
            trailing={
              <ChevronRight
                size={18}
                strokeWidth={2}
                className="text-second"
                aria-hidden="true"
              />
            }
          />
        </Field>

        <Field label="Цена">
          <div className="flex flex-col gap-2">
            <Segmented
              options={units}
              value={adDraft.priceUnit}
              onChange={(value) => {
                adDraft.setPriceUnit(value);
              }}
            />
            {adDraft.priceUnit === 'negotiable' ? null : (
              <InputRow
                value={adDraft.price}
                placeholder="Укажите сумму"
                inputMode="numeric"
                onChange={(value) => {
                  adDraft.setPrice(value);
                }}
                trailing={
                  <span className="text-card-title font-bold text-accent">₽</span>
                }
              />
            )}
          </div>
        </Field>

        <Field label="Город">
          <InputRow
            value={adDraft.city}
            placeholder="Укажите город"
            trailing={null}
            onChange={(value) => {
              adDraft.setCity(value);
            }}
          />
        </Field>
      </div>

      <StickyFooter>
        {adDraft.error ? (
          <ErrorNote
            message={adDraft.error}
            onRetry={() => {
              void handleSubmit();
            }}
          />
        ) : null}
        <Button
          disabled={!adDraft.isValid}
          isLoading={adDraft.isSubmitting}
          onClick={() => {
            void handleSubmit();
          }}
        >
          Опубликовать объявление
        </Button>
      </StickyFooter>

      {isSheetOpen ? (
        <CategorySheet
          categories={adDraft.categories}
          selectedId={adDraft.categoryId}
          onSelect={(id) => {
            adDraft.setCategory(id);
            setSheetOpen(false);
          }}
          onClose={() => {
            setSheetOpen(false);
          }}
        />
      ) : null}
    </section>
  );
});

export default CreateAdPage;
