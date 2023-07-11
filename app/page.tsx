import { messageType } from '../typings';
import MessageInput from './MessageInput';
import MessageList from './MessageList';

export default async function Home() {
  const data = await fetch(
    `${process.env.VERCEL_URL as string || 'http://localhost:3000'}/api/getMessages`
  );
  const response = await data.json();

  const messages: messageType[] = response.messages;

  return (
    <main>
      {/* Message List */}
      <MessageList initialMessages={messages} />
      {/* Message Input */}
      <MessageInput />
    </main>
  );
}
