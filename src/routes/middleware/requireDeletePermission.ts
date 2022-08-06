import {NextFunction, Request, Response} from "express";

export async function requireDeletePermission(request: Request, response: Response, next: NextFunction): Promise<void> {
    next()
}