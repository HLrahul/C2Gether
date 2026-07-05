import cors from 'cors';
import express from 'express';
import rateLimit from 'express-rate-limit';
import helmet from 'helmet';
import http from 'http';
import { Server } from 'socket.io';

import { keepAlive } from './scripts/keepAlive';
import { handleSocketEvents } from './services/socketEvents';

const app = express();

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  standardHeaders: true,
  legacyHeaders: false,
});

app.use(helmet());
app.use(limiter);

app.use(
  cors({
    origin: 'https://collab-study-client.vercel.app/',
    methods: ['GET', 'POST'],
    credentials: true,
  }),
);

app.get('/', (req, res) => {
  res.send('Socket server running');
});

const server = http.createServer(app);

const io = new Server(server);
io.on('connection', (socket) => {
  handleSocketEvents(socket, io);
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});

keepAlive();
