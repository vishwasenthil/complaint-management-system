import {Request, Response, NextFunction} from 'express';

export function isAdmin(req: Request, res: Response, next: NextFunction) {
    const isAdmin = true; //Replace with authentication logic

    if(!isAdmin){
        return res.status(403).json({error: 'Access denied. Admin privileges required.'});
    }

    next();
}