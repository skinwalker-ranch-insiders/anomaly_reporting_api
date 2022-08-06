import {NextFunction, Request, Response} from "express";

export async function requireValidToken(request: Request, response: Response, next: NextFunction): Promise<void> {
    next()
}