'use client';

import { useEffect } from 'react';
import useSWR from 'swr';
import { fetchMessages } from '../lib/fetchMessages';
import { clientPusher } from '../lib/pusher';
import { messageType } from '../typings';
import MessageComponent from './MessageComponent';

interface Props {
  initialMessages: messageType[];
}

const MessageList = ({ initialMessages }: Props) => {
  const {
    data: messages,
    error,
    mutate,
  } = useSWR<messageType[]>('/api/getMessages', fetchMessages);

  useEffect(() => {
    const channel = clientPusher.subscribe('messages');
    channel.bind('new-message', async (newMessage: messageType) => {
      // if the message is already in the list, don't add it again
      if (messages?.find((message) => message.id === newMessage.id)) return;

      if (messages) {
        mutate(fetchMessages, {
          optimisticData: [newMessage, ...messages!],
          rollbackOnError: true,
        });
      } else {
        mutate(fetchMessages);
      }
    });

    return () => {
      clientPusher.unsubscribe('messages');
      channel.unbind_all();
    };
  }, [messages, mutate]);

  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {
        // display the messages
        (messages || initialMessages)?.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))
      }
    </div>
  );
};

export default MessageList;
