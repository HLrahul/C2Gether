import { Socket } from 'socket.io';

const rateLimits = new Map<string, { count: number; timestamp: number }>();

export const socketRateLimiter = (
  socket: Socket,
  eventName: string,
  limit: number = 10,
  timeWindowMs: number = 10000, // default 10 requests per 10 seconds
): boolean => {
  const key = `${socket.id}:${eventName}`;
  const now = Date.now();
  const record = rateLimits.get(key);

  if (!record) {
    rateLimits.set(key, { count: 1, timestamp: now });
    return true;
  }

  if (now - record.timestamp > timeWindowMs) {
    record.count = 1;
    record.timestamp = now;
    return true;
  }

  if (record.count >= limit) {
    socket.emit('send-notification', {
      title: 'Rate Limit Exceeded',
      message: `Too many requests for '${eventName}'. Please slow down.`,
    });
    return false;
  }

  record.count += 1;
  return true;
};

export const clearSocketRateLimits = (socketId: string) => {
  for (const key of rateLimits.keys()) {
    if (key.startsWith(`${socketId}:`)) {
      rateLimits.delete(key);
    }
  }
};
