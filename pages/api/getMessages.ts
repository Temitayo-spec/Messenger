import type { NextApiRequest, NextApiResponse } from 'next';
import redis from '../../redis';
import { messageType } from '../../typings';

type Data = {
  parsedMessages: messageType[];
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'GET') {
    res.status(405).json({ body: 'Method not allowed' });
    return;
  }

  const messages = await redis.hvals('messages');
  const parsedMessages: messageType[] = messages
    .map((message) => JSON.parse(message))
    .sort((a, b) => a.createdAt - b.createdAt);
  res.status(200).json({ parsedMessages });
}
