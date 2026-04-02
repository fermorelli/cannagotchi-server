import mongoose from 'mongoose';
import app from './src/app.js';
import { env } from './src/config/env.js';

let server;

const startServer = async () => {
    try {
        await mongoose.connect(env.mongoUri);
        console.log('Connected to database');

        server = app.listen(env.port, () => {
            console.log(`Cannagotchi API listening on port ${env.port}`);
        });
    } catch (error) {
        console.error('Failed to start server:', error.message);
        process.exit(1);
    }
};

const shutdown = async (signal) => {
    console.log(`${signal} received, shutting down gracefully`);

    if (server) {
        await new Promise((resolve, reject) => {
            server.close((error) => {
                if (error) {
                    reject(error);
                    return;
                }

                resolve();
            });
        });
    }

    await mongoose.disconnect();
    process.exit(0);
};

process.on('SIGINT', () => {
    shutdown('SIGINT').catch((error) => {
        console.error('Error during shutdown:', error.message);
        process.exit(1);
    });
});

process.on('SIGTERM', () => {
    shutdown('SIGTERM').catch((error) => {
        console.error('Error during shutdown:', error.message);
        process.exit(1);
    });
});

process.on('unhandledRejection', (error) => {
    console.error('Unhandled promise rejection:', error);
});

startServer();
