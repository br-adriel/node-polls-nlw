import fastifyCookie from '@fastify/cookie';
import fastifyWebsocket from '@fastify/websocket';
import fastify from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';
import { voteOnPoll } from './routes/vote-on-poll';
import { pollReults } from './ws/poll-results';

const app = fastify();

// register modules
app.register(fastifyCookie, {
  secret: 'node-polls-nlw',
  hook: 'onRequest',
});
app.register(fastifyWebsocket);

// Register routes
app.register(createPoll);
app.register(getPoll);
app.register(voteOnPoll);
app.register(pollReults);

// Start server
app.listen({ port: 3333 }).then(() => console.log('✅ HTTP SERVER RUNNING'));
