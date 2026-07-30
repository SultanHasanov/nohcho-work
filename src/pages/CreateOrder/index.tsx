import { ChevronRight } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { StickyFooter } from '@/components/layout/StickyFooter';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Field } from '@/components/ui/Field';
import { FieldRow, InputRow } from '@/components/ui/FieldRow';
import { TextArea } from '@/components/ui/TextArea';
import { CategorySheet } from '@/pages/CreateOrder/components/CategorySheet';
import { DateTimeRow } from '@/pages/CreateOrder/components/DateTimeRow';
import { GeoIcon } from '@/pages/CreateOrder/components/GeoIcon';
import { PhotoPicker } from '@/pages/CreateOrder/components/PhotoPicker';
import { useStores } from '@/stores/context';

const CreateOrderPage = observer(function CreateOrderPage() {
  const { orderDraft, orders } = useStores();
  const navigate = useNavigate();
  const [isSheetOpen, setSheetOpen] = useState(false);

  useEffect(() => {
    void orderDraft.loadCategories();
  }, [orderDraft]);

  async function handleSubmit() {
    const order = await orderDraft.submit();
    if (order) {
      void orders.load();
      void navigate('/my-orders', { replace: true });
    }
  }

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="Создать заказ" />

      <div className="flex flex-1 flex-col gap-gutter px-gutter pt-2 pb-4">
        <Field label="Описание работы">
          <TextArea
            value={orderDraft.description}
            placeholder="Подробно опишите, что нужно сделать"
            onChange={(value) => {
              orderDraft.setDescription(value);
            }}
          />
        </Field>

        <Field label="Категория">
          <FieldRow
            value={orderDraft.categoryTitle}
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

        <Field label="Адрес">
          <InputRow
            value={orderDraft.address}
            placeholder="Укажите адрес"
            onChange={(value) => {
              orderDraft.setAddress(value);
            }}
            trailing={<GeoIcon />}
          />
        </Field>

        <Field label="Дата и время">
          <DateTimeRow
            value={orderDraft.startsAt}
            onChange={(value) => {
              orderDraft.setStartsAt(value);
            }}
          />
        </Field>

        <Field label="Бюджет">
          <InputRow
            value={orderDraft.price}
            placeholder="Укажите сумму"
            inputMode="numeric"
            onChange={(value) => {
              orderDraft.setPrice(value);
            }}
            trailing={
              <span className="text-card-title font-bold text-accent">₽</span>
            }
          />
        </Field>

        <Field label="Фото" hint="(необязательно)">
          <PhotoPicker
            photos={orderDraft.photos}
            onAdd={(urls) => {
              orderDraft.addPhotos(urls);
            }}
            onRemove={(url) => {
              orderDraft.removePhoto(url);
            }}
          />
        </Field>
      </div>

      <StickyFooter>
        {orderDraft.error ? (
          <ErrorNote
            message={orderDraft.error}
            onRetry={() => {
              void handleSubmit();
            }}
          />
        ) : null}
        <Button
          disabled={!orderDraft.isValid}
          isLoading={orderDraft.isSubmitting}
          onClick={() => {
            void handleSubmit();
          }}
        >
          Опубликовать заказ
        </Button>
      </StickyFooter>

      {isSheetOpen ? (
        <CategorySheet
          categories={orderDraft.categories}
          selectedId={orderDraft.categoryId}
          onSelect={(id) => {
            orderDraft.setCategory(id);
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

export default CreateOrderPage;
