'use client';
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import { fetchMessages } from '../lib/fetchMessages';
import { messageType } from '../typings';
import type { Session } from 'next-auth';

type Props = {
  session: Session | null;
};

const MessageInput = ({ session }: Props) => {
  const [message, setMessage] = useState('');

  const { data, error, mutate } = useSWR('/api/getMessages', fetchMessages);

  const sendMessage = async (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    if (!message || !session) return;

    const newMessage = message;
    const id = uuidv4(); // generate a unique id for each message

    // send the message to the server
    const messageData: messageType = {
      id,
      message: newMessage,
      createdAt: Date.now(),
      username: session?.user?.name!,
      avatar: session?.user?.image!,
      email: session?.user?.email!,
    };

    // send the message to the server
    const uploadMessage = async () => {
      const res = await fetch('/api/addMessages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageData }),
      }).then((res) => res.json());
      return [res.message, ...data!];
    };
    uploadMessage();
    setMessage('');

    // update the messages in the UI
    await mutate(uploadMessage, {
      optimisticData: [messageData, ...data!],
      rollbackOnError: true,
    }); // mutate the data to show the new message
  };

  return (
    <footer className="bg-white">
      <form
        onSubmit={sendMessage}
        className="bg-white flex fixed bottom-0 w-full mx-auto px-5 py-5 border-t border-gray-100 space-x-3 z-50"
      >
        <input
          className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
          disabled={!session}
        />
        <button
          className="bg-blue-500 hover:bg-blue-700 py-2 px-4 text-white font-bold rounded disabled:opacity-50  disabled:cursor-not-allowed"
          type="submit"
          disabled={!message}
        >
          Send
        </button>
      </form>
    </footer>
  );
};

export default MessageInput;
