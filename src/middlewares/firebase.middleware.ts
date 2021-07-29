import { Request, Response, NextFunction } from 'express';
import * as admin from 'firebase-admin';
import {fbValidateToken} from "../util/firebase.util";

export interface CustomRequest extends Request {
    user: {
        iss: string,
        aud: string,
        auth_time: number,
        user_id: string,
        sub: string,
        iat: number,
        exp: number,
        email: string,
        email_verified: boolean,
        firebase: any,
        uid: string,
        customClaims: any,
        display_name: string,
        photo_URL: string
    };
}

export async function firebaseMiddleware(req: CustomRequest, res: Response, next: NextFunction) {
    req.user = null;
    const authorization = req.headers.authorization;
    if (authorization) {
        const authorizationBearer = authorization.split(' ');
        if (authorizationBearer.length === 2) {
            req.user = await fbValidateToken(authorizationBearer[1]);
        }
    }
    next();
}
