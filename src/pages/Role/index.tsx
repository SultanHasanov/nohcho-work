import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { Button } from '@/components/ui/Button';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { SelectCard } from '@/components/ui/SelectCard';
import { ClientIcon, SeekerIcon } from '@/pages/Role/components/RoleIcons';
import { useStores } from '@/stores/context';

const RolePage = observer(function RolePage() {
  const { session } = useStores();
  const navigate = useNavigate();

  async function handleContinue() {
    const isSaved = await session.confirmRole();
    if (isSaved) {
      void navigate('/', { replace: true });
    }
  }

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />

      <header className="flex flex-col gap-2 px-gutter pt-5">
        <h1 className="text-screen-title font-bold text-text">Кто вы?</h1>
        <p className="text-caption font-medium text-second">
          Выберите, как вы будете пользоваться приложением
        </p>
      </header>

      <div className="flex flex-col gap-card px-gutter pt-6">
        <SelectCard
          title="Я ищу работу"
          subtitle="Беру заказы и получаю доход"
          icon={<SeekerIcon />}
          isSelected={session.selectedRole === 'seeker'}
          onSelect={() => {
            session.chooseRole('seeker');
          }}
        />
        <SelectCard
          title="Мне нужен работник"
          subtitle="Размещаю заказы и нахожу исполнителей"
          icon={<ClientIcon />}
          isSelected={session.selectedRole === 'client'}
          onSelect={() => {
            session.chooseRole('client');
          }}
        />
      </div>

      <div className="mt-auto flex flex-col gap-card px-gutter pb-8.5">
        {session.error ? (
          <ErrorNote
            message={session.error}
            onRetry={() => {
              void handleContinue();
            }}
          />
        ) : null}
        <p className="text-center text-note font-medium text-muted">
          Роль можно поменять в профиле
        </p>
        <Button
          isLoading={session.isLoading}
          disabled={session.selectedRole === null}
          onClick={() => {
            void handleContinue();
          }}
        >
          Продолжить
        </Button>
      </div>
    </section>
  );
});

export default RolePage;
