import { NextFunction, Request, RequestHandler, Response, Router } from 'express'

import { HttpMethod } from './enum'

interface AsyncMiddleware extends RequestHandler {
    (request: Request, response: Response, next: NextFunction): Promise<void>
}

interface AsyncRequestHandler extends RequestHandler {
    (request: Request, response: Response): Promise<void>
}

interface RouterWithBasePath<Base extends string> extends Router {
    base: Base
}

interface RouteDefinition {
    method: string
    path: string
    middleware: AsyncMiddleware[]
    handler: AsyncRequestHandler
}

function define(method: string, path: string, middleware: AsyncMiddleware[], handler: AsyncRequestHandler): RouteDefinition {
    return {
        method,
        path,
        middleware,
        handler
    }
}

export function get(path: string, middleware: AsyncMiddleware[], handler: AsyncRequestHandler): RouteDefinition {
    return define(HttpMethod.Get, path, middleware, handler)
}

export function patch(path: string, middleware: AsyncMiddleware[], handler: AsyncRequestHandler): RouteDefinition {
    return define(HttpMethod.Patch, path, middleware, handler)
}

export function post(path: string, middleware: AsyncMiddleware[], handler: AsyncRequestHandler): RouteDefinition {
    return define(HttpMethod.Post, path, middleware, handler)
}

export function del(path: string, middleware: AsyncMiddleware[], handler: AsyncRequestHandler): RouteDefinition {
    return define(HttpMethod.Delete, path, middleware, handler)
}

export function createRouter<Base extends string>(base: Base, middleware: AsyncMiddleware[], routes: RouteDefinition[]): RouterWithBasePath<Base> {
    const router = Router() as RouterWithBasePath<Base>
    router.base = base

    for (const fn of middleware) {
        router.use(fn)
    }

    for (const route of routes) {
        switch (route.method) {
            case HttpMethod.Get:
                router.get(route.path, route.middleware, route.handler)
                break
            case HttpMethod.Patch:
                router.patch(route.path, route.middleware, route.handler)
                break
            case HttpMethod.Post:
                router.post(route.path, route.middleware, route.handler)
                break
            case HttpMethod.Delete:
                router.delete(route.path, route.middleware, route.handler)
        }
    }

    return router
}