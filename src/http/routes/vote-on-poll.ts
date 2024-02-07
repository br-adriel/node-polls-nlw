import { FastifyInstance } from 'fastify';
import { randomUUID } from 'node:crypto';
import { z } from 'zod';
import { prisma } from '../../lib/prisma';
import { redis } from '../../lib/redis';
import { voting } from '../../utils/voting-pub-sub';

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

    if (sessionId) {
      const userPreviouslyVotedOnPoll = await prisma.vote.findUnique({
        where: {
          sessionId_pollId: {
            pollId,
            sessionId,
          },
        },
      });

      if (userPreviouslyVotedOnPoll) {
        if (userPreviouslyVotedOnPoll.pollOptionId === pollOptionId) {
          return reply.status(400).send({
            message: 'You already voted on this poll.',
          });
        }
        await prisma.vote.delete({
          where: {
            id: userPreviouslyVotedOnPoll.id,
          },
        });

        const votes = Number(
          await redis.zincrby(
            pollId,
            -1,
            userPreviouslyVotedOnPoll.pollOptionId
          )
        );

        voting.publish(pollId, {
          pollOptionId: userPreviouslyVotedOnPoll.pollOptionId,
          votes,
        });
      }
    }

    if (!sessionId) {
      sessionId = randomUUID();
      reply.setCookie('sessionId', sessionId, {
        path: '/',
        maxAge: 60 * 60 * 24 * 30, // 30 days
        signed: true,
        httpOnly: true,
      });
    }

    await prisma.vote.create({
      data: {
        sessionId,
        pollId,
        pollOptionId,
      },
    });

    const votes = Number(await redis.zincrby(pollId, 1, pollOptionId));

    voting.publish(pollId, {
      pollOptionId,
      votes,
    });

    return reply.status(201).send();
  });
}
