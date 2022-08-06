import {Request, RequestHandler, Response, Router} from "express";

interface AsyncRequestHandler {
    (request: Request, response: Response): Promise<void>
}

interface RouterWithBasePath extends Router {
    base: string
}

interface RouteDefinition {
    method: string
    path: string
    handler: AsyncRequestHandler
}

function define(method: string, path: string, handler: AsyncRequestHandler): RouteDefinition {
    return {
        method,
        path,
        handler
    }
}

export function get(path: string, handler: AsyncRequestHandler): RouteDefinition {
    return define('GET', path, handler)
}

export function patch(path: string, handler: AsyncRequestHandler): RouteDefinition {
    return define('PATCH', path, handler)
}

export function post(path: string, handler: AsyncRequestHandler): RouteDefinition {
    return define('POST', path, handler)
}

export function createRouter(base: string, routes: RouteDefinition[]): RouterWithBasePath {
    const router = Router() as RouterWithBasePath
    router.base = base

    for (const route of routes) {
        switch (route.method) {
            case 'GET':
                router.get(route.path, route.handler as RequestHandler)
                break
            case 'PATCH':
                router.patch(route.path, route.handler as RequestHandler)
                break
            case 'POST':
                router.post(route.path, route.handler as RequestHandler)
                break
        }
    }

    return router
}