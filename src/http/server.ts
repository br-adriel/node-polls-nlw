import fastify from 'fastify';
import { createPoll } from './routes/create-poll';
import { getPoll } from './routes/get-poll';

const app = fastify();

// Register routes
app.register(createPoll);
app.register(getPoll);

// Start server
app.listen({ port: 3333 }).then(() => console.log('✅ HTTP SERVER RUNNING'));
