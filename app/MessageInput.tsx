'use client'; // is a special import that tells Snowpack to load this file in the browser. This is how we can use React in the browser without any build step. Snowpack will take care of that for us.
import { FormEvent, useState } from 'react';
import useSWR from 'swr';
import { v4 as uuidv4 } from 'uuid';
import { getMessages } from '../lib/getMessages';
import { messageType } from '../typings';

const MessageInput = () => {
  const [message, setMessage] = useState('');

  const { data, error, mutate } = useSWR('/api/getMessages', getMessages);

  console.log(data);

  const sendMessage = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log(message);

    if (!message) return;

    const newMessage = message;
    const id = uuidv4(); // generate a unique id for each message

    // send the message to the server
    const messageData: messageType = {
      id,
      message: newMessage,
      createdAt: Date.now(),
      username: 'Temitayo',
      avatar: 'https://links.papareact.com/jne',
      email: 'olawanletemitayo@gmail.com',
    };

    // send the message to the server
    const uploadMessage = async () => {
      const res = await fetch('/api/messages', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ messageData }),
      });
      const data = await res.json();
      console.log(data);
    };
    uploadMessage();
    setMessage('');
  };

  return (
    <footer>
      <form
        onSubmit={sendMessage}
        className="flex fixed bottom-0 w-full mx-auto px-5 py-5 border-t border-gray-100 space-x-3"
      >
        <input
          className="flex-1 rounded border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-transparent px-5 py-3 disabled:opacity-50 disabled:cursor-not-allowed"
          type="text"
          placeholder="Type a message..."
          value={message}
          onChange={(e) => setMessage(e.target.value)}
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
