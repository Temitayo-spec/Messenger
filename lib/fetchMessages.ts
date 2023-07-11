import { messageType } from '../typings';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  const messages: messageType[] = data.parsedMessages;
  return messages;
};

export const fetchMessages = async () => {
  const messages = await fetcher('/api/getMessages');
  return messages;
};
