import express from 'express';
import router from './routes.js';
import cors from 'cors';

const corsOptions = {
  origin: true,
  methods: ["GET", "POST", "PUT", "DELETE"]
};

const app = express();

app.use(express.json());

app.use(cors(corsOptions));

app.use((req, res, next) => {
  res.header('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.use(router);

app.get('/', (req, res) => {
  res.send('Hello World!');
});

export default app;
