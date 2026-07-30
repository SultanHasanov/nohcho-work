import { observer } from 'mobx-react-lite';
import { Link, useNavigate } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Field } from '@/components/ui/Field';
import { useStores } from '@/stores/context';

/** Фрейм 14: ввод номера телефона. */
const PhoneLoginPage = observer(function PhoneLoginPage() {
  const { phoneAuth } = useStores();
  const navigate = useNavigate();

  async function handleRequest() {
    const isSent = await phoneAuth.requestCode();
    if (isSent) void navigate('/login/code');
  }

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="" />

      <div className="flex flex-1 flex-col gap-5.5 px-gutter pt-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-screen-title font-bold text-text">Вход по номеру</h1>
          <p className="text-caption leading-relaxed font-medium text-second">
            Отправим код в СМС. Вход через Telegram — быстрее.
          </p>
        </div>

        <Field label="Номер телефона">
          <label
            className={[
              'flex h-cta items-center gap-2.5 rounded-btn border bg-surface px-card',
              phoneAuth.phone === '' ? 'border-line' : 'border-accent',
            ].join(' ')}
          >
            <span className="text-body font-bold text-text">+7</span>
            <span className="h-5.5 w-px bg-line" />
            <input
              type="tel"
              inputMode="numeric"
              autoComplete="tel"
              value={phoneAuth.phoneMasked}
              placeholder="928 000-00-00"
              onChange={(event) => {
                phoneAuth.setPhone(event.target.value);
              }}
              className="min-w-0 flex-1 bg-transparent text-body font-semibold text-text outline-none placeholder:text-muted"
            />
          </label>
        </Field>

        {phoneAuth.error ? (
          <ErrorNote
            message={phoneAuth.error}
            onRetry={() => {
              void handleRequest();
            }}
          />
        ) : null}

        <Button
          disabled={!phoneAuth.isPhoneValid}
          isLoading={phoneAuth.isLoading}
          onClick={() => {
            void handleRequest();
          }}
        >
          Получить код
        </Button>

        <p className="text-meta leading-loose font-medium text-muted">
          Продолжая, вы принимаете{' '}
          <Link to="/legal/terms" className="text-second underline">
            условия использования
          </Link>{' '}
          и{' '}
          <Link to="/legal/privacy" className="text-second underline">
            политику конфиденциальности
          </Link>
        </p>
      </div>
    </section>
  );
});

export default PhoneLoginPage;
