import { observer } from 'mobx-react-lite';
import { useEffect, useRef } from 'react';
import { Navigate, useNavigate } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { Button } from '@/components/ui/Button';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { CODE_LENGTH } from '@/stores/phoneAuth';
import { useStores } from '@/stores/context';

/** Фрейм 15: ввод кода из СМС. */
const PhoneCodePage = observer(function PhoneCodePage() {
  const { phoneAuth, session } = useStores();
  const navigate = useNavigate();
  const inputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    const timer = setInterval(() => {
      phoneAuth.tick();
    }, 1000);
    return () => {
      clearInterval(timer);
    };
  }, [phoneAuth]);

  if (!phoneAuth.isPhoneValid) {
    return <Navigate to="/login/phone" replace />;
  }

  async function handleConfirm() {
    const user = await phoneAuth.confirm();
    if (user) {
      session.setUser(user);
      phoneAuth.reset();
      void navigate(user.role === null ? '/role' : '/', { replace: true });
    }
  }

  const cells = Array.from({ length: CODE_LENGTH }, (_, index) => index);

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="" />

      <div className="flex flex-1 flex-col gap-5.5 px-gutter pt-3">
        <div className="flex flex-col gap-2">
          <h1 className="text-screen-title font-bold text-text">Код из СМС</h1>
          <p className="text-caption leading-relaxed font-medium text-second">
            Отправили код на {phoneAuth.fullPhone}
          </p>
        </div>

        <div className="relative">
          <input
            ref={inputRef}
            type="text"
            inputMode="numeric"
            autoComplete="one-time-code"
            value={phoneAuth.code}
            onChange={(event) => {
              phoneAuth.setCode(event.target.value);
            }}
            className="absolute inset-0 opacity-0"
            aria-label="Код из СМС"
          />
          <div
            className="flex gap-3"
            onClick={() => {
              inputRef.current?.focus();
            }}
          >
            {cells.map((index) => {
              const digit = phoneAuth.code[index];
              const isActive = index === phoneAuth.code.length;
              return (
                <span
                  key={index}
                  className={[
                    'flex h-16 w-14 items-center justify-center rounded-btn border bg-surface text-logo-sm font-bold',
                    digit ? 'border-accent text-text' : 'border-line text-muted',
                    isActive ? 'border-accent' : '',
                  ].join(' ')}
                >
                  {digit ?? '·'}
                </span>
              );
            })}
          </div>
        </div>

        <button
          type="button"
          disabled={!phoneAuth.canResend}
          onClick={() => {
            void phoneAuth.requestCode();
          }}
          className="min-h-control self-start text-caption font-medium text-muted disabled:opacity-100"
        >
          {phoneAuth.canResend
            ? 'Отправить код снова'
            : `Отправить снова через ${phoneAuth.resendLabel}`}
        </button>

        {phoneAuth.error ? (
          <ErrorNote
            message={phoneAuth.error}
            onRetry={() => {
              void handleConfirm();
            }}
          />
        ) : null}

        <Button
          disabled={!phoneAuth.isCodeValid}
          isLoading={phoneAuth.isLoading}
          onClick={() => {
            void handleConfirm();
          }}
        >
          Подтвердить
        </Button>
      </div>
    </section>
  );
});

export default PhoneCodePage;
