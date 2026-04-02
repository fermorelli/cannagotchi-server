import express from 'express';
import cors from 'cors';
import router from './routes.js';
import { env } from './config/env.js';

const app = express();

const corsOptions = {
    origin(origin, callback) {
        if (!origin || env.clientOrigins.includes(origin)) {
            callback(null, true);
            return;
        }

        callback(null, false);
    },
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
};

app.disable('x-powered-by');
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors(corsOptions));

app.get('/', (req, res) => {
    res.send('Hello World!');
});

app.get('/health', (req, res) => {
    res.status(200).json({
        message: 'Server is healthy',
        data: {
            status: 'ok',
            uptime: process.uptime(),
        },
        error: false,
    });
});

app.use(router);

app.use((req, res) => {
    res.status(404).json({
        message: 'Route not found',
        data: {},
        error: true,
    });
});

app.use((error, req, res, next) => {
    console.error(error);

    res.status(500).json({
        message: 'Unexpected server error',
        data: {},
        error: true,
    });
});

export default app;
