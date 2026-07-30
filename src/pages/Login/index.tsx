import { observer } from 'mobx-react-lite';
import { Link, Navigate, useNavigate } from 'react-router-dom';

import { Button } from '@/components/ui/Button';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Logo, LogoWordmark } from '@/components/ui/Logo';
import { LoginBackdrop } from '@/pages/Login/components/LoginBackdrop';
import { TelegramIcon } from '@/pages/Login/components/TelegramIcon';
import { useStores } from '@/stores/context';

const LoginPage = observer(function LoginPage() {
  const { session } = useStores();
  const navigate = useNavigate();

  if (session.isAuthorized) {
    return <Navigate to={session.hasRole ? '/' : '/role'} replace />;
  }

  async function handleTelegram() {
    await session.loginTelegram();
    if (session.isAuthorized) {
      void navigate(session.hasRole ? '/' : '/role', { replace: true });
    }
  }

  return (
    <section className="relative flex flex-1 flex-col overflow-hidden">
      <LoginBackdrop />

      <div className="relative z-2 flex flex-1 flex-col items-center justify-center gap-4.5 px-gutter">
        <Logo size={76} />
        <LogoWordmark className="text-logo font-extrabold tracking-tight text-text" />
        <p className="max-w-70 text-center text-lead leading-relaxed font-medium text-second">
          Работа рядом.
          <br />
          Возможности для каждого.
        </p>
      </div>

      <div className="relative z-2 flex flex-col gap-3 px-gutter pb-action-safe">
        {session.error ? (
          <ErrorNote
            message={session.error}
            onRetry={() => {
              void handleTelegram();
            }}
          />
        ) : null}

        <Button
          variant="primaryTall"
          isLoading={session.isLoading}
          onClick={() => {
            void handleTelegram();
          }}
        >
          <TelegramIcon />
          Войти через Telegram
        </Button>

        <Link
          to="/login/phone"
          className="flex h-cta w-full items-center justify-center rounded-btn border border-line text-body font-semibold text-text active:bg-surface"
        >
          Войти по номеру телефона
        </Link>

        <p className="px-3 pt-2 text-center text-meta leading-loose font-medium text-muted">
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

export default LoginPage;
