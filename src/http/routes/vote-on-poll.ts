import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';

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

    return reply.status(201).send();
  });
}
