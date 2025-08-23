import dotenv from 'dotenv';
import { DeepNonNullable, DeepReadonly } from 'ts-essentials';

dotenv.config();

const nullableConfig = {
    port: process.env.PORT || 5000,
    logLevel: process.env.LOG_LEVEL || 'debug',
    worker: process.env.WORKER || 'api',
    mongodb: {
        uri: process.env.MONGODB_URI || 'mongodb+srv://Sillar:<db_password>@clusters.dobhwv2.mongodb.net/test',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useFindAndModify: true,
            useCreateIndex: true,
        },
    },
    jwt: {
        secret: process || 'secret',
        lifetime: process.env.JWT_LIFETIME || '1d',
    },
    nodeEnv: process.env.NODE_ENV || 'development',
    sessionSecret: process.env.SESSION_SECRET || 'secret-key'
};

type Config = DeepReadonly<DeepNonNullable<typeof nullableConfig>>;

export const config = nullableConfig as Config;

export const SCHEMA_NAMES = {
    user: 'users'
}