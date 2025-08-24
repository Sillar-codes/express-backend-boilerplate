import express, { NextFunction, Request, Response } from 'express';
import passport from 'passport';
import { stripVTControlCharacters } from 'util';

import { User } from 'src/modules/user/types';
import { logger } from 'src/system/winston';
import { ApiValidationError, InternalError } from '../errors';

export type Router = express.Router;
export type App = express.Express;
export type Passport = passport.PassportStatic;

export interface AuthRequest extends Request {
    user: Omit<User, 'password'>;
}

export const isAuthRequest = <T extends Request>(req: T) => {
    return !!req && !!req.user;
}

const call = 
    (process: (req: Request, res: Response) => Promise<unknown>) => 
    (req: Request, res: Response) => {
        process(req, res)
            .then(data => {
                if (!res.headersSent) {
                    res.json(data || { success: true });
                }
            })
            .catch(async (e) => {
                logger.error(e);
                if (e instanceof ApiValidationError) {
                    res.status(400).json({
                        code: e.code,
                        message: stripVTControlCharacters(e.message),
                        field: e.options.field
                    });
                    return;
                } else if (e instanceof InternalError) {
                    res.status(500).json({
                        message: stripVTControlCharacters(e.message),
                    });
                    return;
                }

                res.status(500).send({ message: "Internal server error"});
            })
    }

    const authenticate = (req: Request, res: Response, next: NextFunction) => {
        passport.authenticate('jwt', {session: false})(req, res, next);
    }

    const authorize = (req: Request, res: Response, next: NextFunction) => {
        const user = req.user as User;

        if (!user || user.role !== 'admin') {
            res.status(403).json({ message: 'Forbidden: Admin access required'});
            return;
        }

        next();
    }

    export const api = {authenticate, authorize, call};