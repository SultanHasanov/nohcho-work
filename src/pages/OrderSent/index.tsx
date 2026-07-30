import { observer } from 'mobx-react-lite';
import { Link, useParams } from 'react-router-dom';

import { ResultScreen } from '@/components/ui/ResultScreen';
import { useStores } from '@/stores/context';

const primaryClass =
  'flex h-cta w-full items-center justify-center rounded-btn bg-accent text-body font-semibold text-text active:bg-accent-pressed';
const secondaryClass =
  'flex h-cta w-full items-center justify-center rounded-btn border border-line text-body font-semibold text-text active:bg-surface';

/** Фрейм 05: подтверждение отклика исполнителя. */
const OrderSentPage = observer(function OrderSentPage() {
  const { chat } = useStores();
  const { orderId } = useParams();
  const chatId = chat.chats.find((item) => item.orderId === orderId)?.id;

  return (
    <ResultScreen
      title="Отклик отправлен"
      description="Заказчик увидит его и напишет вам в чат"
      actions={
        <>
          <Link
            to={chatId === undefined ? '/chats' : `/chats/${chatId}`}
            className={primaryClass}
          >
            Перейти в чат
          </Link>
          <Link to="/" className={secondaryClass}>
            Вернуться к заказам
          </Link>
        </>
      }
    />
  );
});

export default OrderSentPage;
