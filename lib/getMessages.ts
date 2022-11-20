import { messageType } from '../typings';

const fetcher = async (url: string) => {
  const res = await fetch(url);
  const data = await res.json();
  const messages: messageType[] = Object.values(data);
  return messages;
};

export const getMessages = async () => {
  const messages = await fetcher('/api/getMessages');
  return messages;
};
