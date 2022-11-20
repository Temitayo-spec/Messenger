import Image from 'next/image';
import { messageType } from '../typings';

type Props = {
  key: string;
  message: messageType;
};

const MessageComponent = ({ message }: Props) => {
  return (
    <div className="flex items-center">
      <div className="flex-shrink-0">
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
        <p className="text-[0.65rem] px-[2px] pb-[2px] text-red-400">
          {message.username}
        </p>

        <div className="flex items-end">
          <div className="px-3 py-2 rounded-lg w-fit text-white bg-red-400">
            <p>{message.message}</p>
            <div />

            <p className="text-[0.65rem] italic px-2 text-gray-300">
              {new Date(message.createdAt).toLocaleString()}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default MessageComponent;
