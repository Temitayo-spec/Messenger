'use client'; // is a special import that tells Snowpack to load this file in the browser. This is how we can use React in the browser without any build step. Snowpack will take care of that for us.

import useSWR from 'swr';
import { getMessages } from '../lib/getMessages';
import { messageType } from '../typings';
import MessageComponent from './MessageComponent';

const MessageList = () => {
  const { data, error, mutate } = useSWR<messageType[]>(
    '/api/getMessages',
    getMessages
  );
  return (
    <div className="space-y-5 px-5 pt-8 pb-32 max-w-2xl xl:max-w-4xl mx-auto">
      {
        // display the messages
        data?.map((message) => (
          <MessageComponent key={message.id} message={message} />
        ))
      }
    </div>
  );
};

export default MessageList;
