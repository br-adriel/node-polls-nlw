import { FastifyInstance } from 'fastify';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';

export async function getPoll(app: FastifyInstance) {
  app.get('/polls/:pollId', async (request, reply) => {
    const getPollParams = z
      .object({
        pollId: z.string().uuid(),
      })
      .parse(request.params);

    const { pollId } = getPollParams;
    const poll = await prisma.poll.findUnique({
      include: {
        options: {
          select: {
            id: true,
            title: true,
          },
        },
      },
      where: {
        id: pollId,
      },
    });

    return reply.send({ poll });
  });
}
