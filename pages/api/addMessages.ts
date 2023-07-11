import type { NextApiRequest, NextApiResponse } from 'next';
import { serverPusher } from '../../lib/pusher';
import redis from '../../redis';
import { messageType } from '../../typings';

type Data = {
  message: messageType;
};

type ErrorData = {
  body: string;
};

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse<Data | ErrorData>
) {
  if (req.method !== 'POST') {
    res.status(405).json({ body: 'Method not allowed' });
    return;
  }

  const { messageData } = req.body;

  const newMessage = {
    ...messageData,
    // replace timestamp with the timestamp of the server
    createdAt: Date.now(),
  };

  if (!newMessage) {
    res.status(400).json({ body: 'Missing message' });
    return;
  }

  // push to upstash redis db
  await redis.hset('messages', messageData.id, JSON.stringify(newMessage));
  serverPusher.trigger('messages', 'new-message', newMessage); // push to pusher channel

  res.status(200).json({ message: newMessage });
}
