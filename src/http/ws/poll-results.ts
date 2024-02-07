import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { voting } from '../../utils/voting-pub-sub';

export async function pollReults(app: FastifyInstance) {
  app.get(
    '/polls/:pollId/results',
    { websocket: true },
    (connection, request) => {
      const urlParams = z
        .object({
          pollId: z.string().uuid(),
        })
        .parse(request.params);
      const { pollId } = urlParams;

      voting.subscribe(pollId, (message) => {
        connection.socket.send(JSON.stringify(message));
      });
    }
  );
}
