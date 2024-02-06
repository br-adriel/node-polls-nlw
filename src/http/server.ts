import fastify from 'fastify';
import { z } from 'zod';
import { prisma } from '../lib/prisma';

const app = fastify();

app.post('/polls', async (request, reply) => {
  const { title } = z
    .object({
      title: z.string(),
    })
    .parse(request.body);

  const poll = await prisma.poll.create({
    data: {
      title,
    },
  });

  return reply.status(201).send({ pollId: poll.id });
});

app.listen({ port: 3333 }).then(() => console.log('✅ HTTP SERVER RUNNING'));
