import { observer } from 'mobx-react-lite';
import { useEffect } from 'react';
import { useParams } from 'react-router-dom';

import { StatusBarSpacer } from '@/components/layout/StatusBarSpacer';
import { ErrorNote } from '@/components/ui/ErrorNote';
import { Skeleton } from '@/components/ui/Skeleton';
import { formatDateTime } from '@/lib/format';
import { ChatHeader } from '@/pages/Chat/components/ChatHeader';
import { Composer } from '@/pages/Chat/components/Composer';
import { DateDivider, MessageBubble } from '@/pages/Chat/components/MessageBubble';
import { OrderStrip } from '@/pages/Chat/components/OrderStrip';
import { useStores } from '@/stores/context';

const ChatPage = observer(function ChatPage() {
  const { chat, session } = useStores();
  const { chatId } = useParams();

  useEffect(() => {
    if (chatId) void chat.openChat(chatId);
  }, [chat, chatId]);

  const peer = chat.activeChat;
  const order = chat.activeOrder;
  const myId = session.user?.id;

  return (
    <section className="flex flex-1 flex-col">
      <StatusBarSpacer />
      <ChatHeader
        name={peer?.peerName ?? 'Диалог'}
        isOnline={peer?.peerIsOnline ?? false}
      />

      {order ? (
        <OrderStrip
          orderId={order.id}
          title={order.title}
          price={order.price}
          categoryId={order.categoryId}
        />
      ) : null}

      <div className="flex flex-1 flex-col gap-2.5 px-gutter pt-card pb-2">
        {chat.isLoading ? (
          <>
            <Skeleton className="h-12 w-8/12 self-start rounded-bubble-in" />
            <Skeleton className="h-12 w-7/12 self-end rounded-bubble-out" />
            <Skeleton className="h-12 w-6/12 self-start rounded-bubble-in" />
          </>
        ) : chat.error !== null ? (
          <ErrorNote
            message={chat.error}
            onRetry={() => {
              if (chatId) void chat.openChat(chatId);
            }}
          />
        ) : (
          <>
            {chat.messages.length > 0 ? (
              <DateDivider
                label={formatDateTime(chat.messages[0].createdAt).split(',')[0]}
              />
            ) : null}
            {chat.messages.map((message) => (
              <MessageBubble
                key={message.id}
                text={message.text}
                createdAt={message.createdAt}
                isOwn={message.authorId === myId}
              />
            ))}
          </>
        )}
      </div>

      <Composer
        isSending={chat.isSending}
        onSend={(text) => {
          void chat.send(text);
        }}
      />
    </section>
  );
});

export default ChatPage;
