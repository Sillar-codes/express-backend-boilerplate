import mongoose from 'mongoose';
import { config } from './config';
import { logger } from './winston';

export const initMongoDB = async () => {
    try {
        await mongoose.connect(config.mongodb.uri);
        logger.info('MongoDB connected successfully');
    } catch (error) {
        const msg = (error as Error).message;
        throw new Error(msg);
    }
}