import { MessageCircle } from 'lucide-react';
import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';

import { ChatRow } from '@/components/chat/ChatRow';
import { EmptyState } from '@/components/ui/EmptyState';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { SearchField } from '@/components/ui/SearchField';
import { Skeleton } from '@/components/ui/Skeleton';
import { useStores } from '@/stores/context';

const ChatsPage = observer(function ChatsPage() {
  const { chat } = useStores();

  useEffect(() => {
    void chat.loadChats();
  }, [chat]);

  return (
    <>
      <div className="flex flex-col gap-card px-gutter pt-1.5">
        <h1 className="text-screen-title font-bold text-text">Сообщения</h1>
        <SearchField
          value={chat.search}
          placeholder="Поиск по диалогам"
          onChange={(value) => {
            chat.setSearch(value);
          }}
        />
      </div>

      <div className="flex flex-1 flex-col px-gutter pt-2.5 pb-4">
        {chat.isLoading ? (
          <>
            <RowSkeleton />
            <RowSkeleton />
            <RowSkeleton />
          </>
        ) : chat.error !== null ? (
          <ErrorNote
            message={chat.error}
            onRetry={() => {
              void chat.loadChats();
            }}
          />
        ) : chat.isEmpty ? (
          <EmptyState
            icon={<MessageCircle size={34} strokeWidth={1.8} aria-hidden="true" />}
            title={chat.search ? 'Ничего не нашлось' : 'Диалогов пока нет'}
            description={
              chat.search
                ? 'Попробуйте изменить запрос'
                : 'Переписка появится, когда вы возьмёте заказ или вам ответят'
            }
          />
        ) : (
          chat.visibleChats.map((item) => <ChatRow key={item.id} chat={item} />)
        )}
      </div>
    </>
  );
});

function RowSkeleton() {
  return (
    <div className="flex h-18 items-center gap-3 border-b border-line">
      <Skeleton className="size-12 shrink-0 rounded-pill" />
      <div className="flex flex-1 flex-col gap-1.5">
        <Skeleton className="h-3.5 w-5/12 rounded-pill" />
        <Skeleton className="h-3 w-9/12 rounded-pill" isStatic />
        <Skeleton className="h-2.5 w-6/12 rounded-pill" isStatic />
      </div>
    </div>
  );
}

export default ChatsPage;
