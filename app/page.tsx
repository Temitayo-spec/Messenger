import { messageType } from '../typings';
import MessageInput from './MessageInput';
import MessageList from './MessageList';
import { getServerSession } from 'next-auth/next';
import Providers from './providers';
import Header from './Header';

export default async function Home() {
  const data = await fetch(
    `${
      (process.env.VERCEL_URL as string) || 'http://localhost:3000'
    }/api/getMessages`
  );
  const response = await data.json();
  const messages: messageType[] = response.messages;

  const session = await getServerSession();

  return (
    <Providers session={session}>
      <main>
        <Header />

        {/* Message List */}
        <MessageList initialMessages={messages} />
        {/* Message Input */}
        <MessageInput session={session} />
      </main>
    </Providers>
  );
}
