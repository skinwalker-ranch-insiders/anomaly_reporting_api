import {NextFunction, Request, Response} from "express";

export async function requireEditPermission(request: Request, response: Response, next: NextFunction): Promise<void> {
    next()
}