import morgan, { StreamOptions } from 'morgan';
import { config } from './config';
import { logger } from './winston';

const stream: StreamOptions = {
    write: (message) => logger.http(message),
};

const skip = () => {
    return config.nodeEnv !== 'development';
};

export const morganMiddleware = morgan(
    ':method :url :status :res[content-length] - :response-time ms',
    { stream, skip }
);