import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';

export async function voteOnPoll(app: FastifyInstance) {
  app.post('/polls/:pollId/votes', async (request, reply) => {
    const voteOnPollBody = z
      .object({
        pollOptionId: z.string().uuid(),
      })
      .parse(request.body);

    const voteOnPollParams = z
      .object({
        pollId: z.string().uuid(),
      })
      .parse(request.params);

    const { pollOptionId } = voteOnPollBody;
    const { pollId } = voteOnPollParams;

    let { sessionId } = request.cookies;
    if (!sessionId) {
      sessionId = randomUUID();
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    return reply.status(201).send({ sessionId });
  });
}
