if (typeof process.loadEnvFile === 'function') {
    try {
        process.loadEnvFile();
    } catch (error) {
        if (error.code !== 'ENOENT') {
            console.warn('Could not load .env file:', error.message);
        }
    }
}

const defaultClientOrigins = ['http://localhost:3000', 'http://127.0.0.1:3000'];

const parseOrigins = (value) => {
    if (!value) {
        return defaultClientOrigins;
    }

    const parsed = value
        .split(',')
        .map((origin) => origin.trim())
        .filter(Boolean);

    return parsed.length > 0 ? parsed : defaultClientOrigins;
};

const port = Number(process.env.PORT || 8080);

if (!process.env.MONGO_URI) {
    throw new Error('Missing MONGO_URI environment variable.');
}

export const env = {
    port: Number.isNaN(port) ? 8080 : port,
    mongoUri: process.env.MONGO_URI,
    clientOrigins: parseOrigins(process.env.CLIENT_ORIGINS),
};
