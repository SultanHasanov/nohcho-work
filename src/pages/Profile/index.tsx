import { Settings2 } from 'lucide-react';
import { observer } from 'mobx-react-lite';

import { AvailabilityRow } from '@/pages/Profile/components/AvailabilityRow';
import { ProfileMenu } from '@/pages/Profile/components/ProfileMenu';
import { ProfileSummary } from '@/pages/Profile/components/ProfileSummary';
import { StatsRow } from '@/pages/Profile/components/StatsRow';
import { WalletCard } from '@/pages/Profile/components/WalletCard';
import { useStores } from '@/stores/context';

const ProfilePage = observer(function ProfilePage() {
  const { session } = useStores();
  const user = session.user;

  if (!user) return null;

  return (
    <>
      <div className="flex h-cta shrink-0 items-center pr-1 pl-gutter">
        <h1 className="ml-11 flex-1 text-center text-screen-title font-bold text-text">
          Профиль
        </h1>
        {/* Экрана настроек в макете нет — кнопка нарисована и пока неактивна. */}
        <button
          type="button"
          disabled
          aria-label="Настройки"
          className="flex size-11 shrink-0 items-center justify-center"
        >
          <Settings2
            size={24}
            strokeWidth={1.8}
            className="text-text"
            aria-hidden="true"
          />
        </button>
      </div>

      <div className="flex flex-1 flex-col gap-2.5 px-gutter pt-0.5 pb-4">
        <ProfileSummary user={user} />
        <WalletCard balance={user.balance} />
        <StatsRow user={user} />
        <AvailabilityRow
          isAvailable={user.isAvailable}
          onToggle={() => {
            void session.toggleAvailability();
          }}
        />
        <ProfileMenu />
      </div>
    </>
  );
});

export default ProfilePage;
