import fastify from 'fastify';
import { createPoll } from './routes/create-poll';

const app = fastify();

// Register routes
app.register(createPoll);

// Start server
app.listen({ port: 3333 }).then(() => console.log('✅ HTTP SERVER RUNNING'));
