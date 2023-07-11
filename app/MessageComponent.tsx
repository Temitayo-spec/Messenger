import Image from 'next/image';
import { messageType } from '../typings';
import { useSession } from 'next-auth/react';
import TimeAgo from 'react-timeago';

type Props = {
  key: string;
  message: messageType;
};

const MessageComponent = ({ message }: Props) => {
  const { data: session } = useSession();

  const isUser = session?.user?.email === message.email;
  return (
    <div className={`flex w-fit items-center ${isUser && 'ml-auto'}`}>
      <div className={`flex-shrink-0 ${isUser && 'order-2'}`}>
        <Image
          className="rounded-full mx-2"
          height={50}
          width={50}
          src={message.avatar}
          alt="avatar"
          priority
        />
      </div>
      <div>
        <p
          className={`text-[0.65rem] px-[2px] pb-[2px] ${
            isUser ? 'text-blue-400 text-right' : 'text-red-400 text-left'
          }`}
        >
          {message.username}
        </p>
        <div className="flex items-end">
          <div
            className={`px-3 py-1 rounded-lg w-fit text-white ${
              isUser ? 'bg-blue-400 ml-auto order-2' : 'bg-red-400'
            }`}
          >
            <p>{message.message}</p>
            <div />

            <p className="text-[0.65rem] italic px-2 text-gray-300">
              <TimeAgo date={new Date(message.createdAt).toLocaleString()} />
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
