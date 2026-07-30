import { observer } from 'mobx-react-lite';
import { useNavigate } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { TopBar } from '@/components/layout/TopBar';
import { Field } from '@/components/ui/Field';
import { DangerRow, SettingsGroup, SettingsRow } from '@/components/ui/SettingsGroup';
import { Switch } from '@/components/ui/Switch';
import { useStores } from '@/stores/context';

const roleLabels = { seeker: 'Исполнитель', client: 'Заказчик' } as const;

/** Фрейм 18: настройки. */
const SettingsPage = observer(function SettingsPage() {
  const { settings, session } = useStores();
  const navigate = useNavigate();
  const user = session.user;

  async function handleLogout() {
    await session.logout();
    void navigate('/login', { replace: true });
  }

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <TopBar title="Настройки" />

      <div className="flex flex-1 flex-col gap-gutter px-gutter pt-2 pb-4">
        <Field label="Уведомления">
          <SettingsGroup>
            <SettingsRow
              label="Новые заказы рядом"
              control={
                <Switch
                  isOn={settings.ordersNearby}
                  label="Новые заказы рядом"
                  onToggle={() => {
                    settings.toggleOrdersNearby();
                  }}
                />
              }
            />
            <SettingsRow
              label="Сообщения"
              control={
                <Switch
                  isOn={settings.messages}
                  label="Сообщения"
                  onToggle={() => {
                    settings.toggleMessages();
                  }}
                />
              }
            />
            <SettingsRow
              label="Статусы заказов"
              control={
                <Switch
                  isOn={settings.orderStatuses}
                  label="Статусы заказов"
                  onToggle={() => {
                    settings.toggleOrderStatuses();
                  }}
                />
              }
            />
          </SettingsGroup>
        </Field>

        <Field label="Приложение">
          <SettingsGroup>
            {/* Локализации не будет, выбора языка нет — строка справочная. */}
            <SettingsRow label="Язык" value="Русский" />
            <SettingsRow label="Город" value={user?.city ?? 'Грозный'} />
          </SettingsGroup>
        </Field>

        <Field label="Аккаунт">
          <SettingsGroup>
            <SettingsRow
              label="Сменить роль"
              value={user?.role ? roleLabels[user.role] : 'Не выбрана'}
              onClick={() => {
                void navigate('/role');
              }}
            />
            <SettingsRow label="Telegram" value={user?.telegram ?? 'Не привязан'} />
            <SettingsRow label="Номер телефона" value={user?.phone ?? 'Не указан'} />
          </SettingsGroup>
        </Field>

        <DangerRow
          label="Выйти"
          onClick={() => {
            void handleLogout();
          }}
        />
      </div>
    </section>
  );
});

export default SettingsPage;
