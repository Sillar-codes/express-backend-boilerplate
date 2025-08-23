import compression from "compression";
import cors from 'cors';
import express from 'express';
import http from 'http';
import getPassport from 'src/utils/passport';
import { config } from './config';
import { morganMiddleware } from './morgan';

export const app = express();
export const server = http.createServer(app);

export const passport = getPassport();

export const loadExpressMiddleware = () => {
    [
        morganMiddleware,
        compression(),
        express.json(),
        cors({ origin: '*' }),
        passport.initialize(),
        passport.session()
    ].forEach(middleware => app.use(middleware));
}