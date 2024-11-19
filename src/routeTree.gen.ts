/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from './routes/__root'
import { Route as ViteImport } from './routes/vite'
import { Route as RegisterImport } from './routes/register'
import { Route as ReactImport } from './routes/react'
import { Route as ProfileImport } from './routes/profile'
import { Route as PostsImport } from './routes/posts'
import { Route as LoginImport } from './routes/login'
import { Route as IndexImport } from './routes/index'

// Create/Update Routes

const ViteRoute = ViteImport.update({
  id: '/vite',
  path: '/vite',
  getParentRoute: () => rootRoute,
} as any)

const RegisterRoute = RegisterImport.update({
  id: '/register',
  path: '/register',
  getParentRoute: () => rootRoute,
} as any)

const ReactRoute = ReactImport.update({
  id: '/react',
  path: '/react',
  getParentRoute: () => rootRoute,
} as any)

const ProfileRoute = ProfileImport.update({
  id: '/profile',
  path: '/profile',
  getParentRoute: () => rootRoute,
} as any)

const PostsRoute = PostsImport.update({
  id: '/posts',
  path: '/posts',
  getParentRoute: () => rootRoute,
} as any)

const LoginRoute = LoginImport.update({
  id: '/login',
  path: '/login',
  getParentRoute: () => rootRoute,
} as any)

const IndexRoute = IndexImport.update({
  id: '/',
  path: '/',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/': {
      id: '/'
      path: '/'
      fullPath: '/'
      preLoaderRoute: typeof IndexImport
      parentRoute: typeof rootRoute
    }
    '/login': {
      id: '/login'
      path: '/login'
      fullPath: '/login'
      preLoaderRoute: typeof LoginImport
      parentRoute: typeof rootRoute
    }
    '/posts': {
      id: '/posts'
      path: '/posts'
      fullPath: '/posts'
      preLoaderRoute: typeof PostsImport
      parentRoute: typeof rootRoute
    }
    '/profile': {
      id: '/profile'
      path: '/profile'
      fullPath: '/profile'
      preLoaderRoute: typeof ProfileImport
      parentRoute: typeof rootRoute
    }
    '/react': {
      id: '/react'
      path: '/react'
      fullPath: '/react'
      preLoaderRoute: typeof ReactImport
      parentRoute: typeof rootRoute
    }
    '/register': {
      id: '/register'
      path: '/register'
      fullPath: '/register'
      preLoaderRoute: typeof RegisterImport
      parentRoute: typeof rootRoute
    }
    '/vite': {
      id: '/vite'
      path: '/vite'
      fullPath: '/vite'
      preLoaderRoute: typeof ViteImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/posts': typeof PostsRoute
  '/profile': typeof ProfileRoute
  '/react': typeof ReactRoute
  '/register': typeof RegisterRoute
  '/vite': typeof ViteRoute
}

export interface FileRoutesByTo {
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/posts': typeof PostsRoute
  '/profile': typeof ProfileRoute
  '/react': typeof ReactRoute
  '/register': typeof RegisterRoute
  '/vite': typeof ViteRoute
}

export interface FileRoutesById {
  __root__: typeof rootRoute
  '/': typeof IndexRoute
  '/login': typeof LoginRoute
  '/posts': typeof PostsRoute
  '/profile': typeof ProfileRoute
  '/react': typeof ReactRoute
  '/register': typeof RegisterRoute
  '/vite': typeof ViteRoute
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath
  fullPaths:
    | '/'
    | '/login'
    | '/posts'
    | '/profile'
    | '/react'
    | '/register'
    | '/vite'
  fileRoutesByTo: FileRoutesByTo
  to: '/' | '/login' | '/posts' | '/profile' | '/react' | '/register' | '/vite'
  id:
    | '__root__'
    | '/'
    | '/login'
    | '/posts'
    | '/profile'
    | '/react'
    | '/register'
    | '/vite'
  fileRoutesById: FileRoutesById
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute
  LoginRoute: typeof LoginRoute
  PostsRoute: typeof PostsRoute
  ProfileRoute: typeof ProfileRoute
  ReactRoute: typeof ReactRoute
  RegisterRoute: typeof RegisterRoute
  ViteRoute: typeof ViteRoute
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  LoginRoute: LoginRoute,
  PostsRoute: PostsRoute,
  ProfileRoute: ProfileRoute,
  ReactRoute: ReactRoute,
  RegisterRoute: RegisterRoute,
  ViteRoute: ViteRoute,
}

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>()

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/login",
        "/posts",
        "/profile",
        "/react",
        "/register",
        "/vite"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/login": {
      "filePath": "login.tsx"
    },
    "/posts": {
      "filePath": "posts.tsx"
    },
    "/profile": {
      "filePath": "profile.tsx"
    },
    "/react": {
      "filePath": "react.tsx"
    },
    "/register": {
      "filePath": "register.tsx"
    },
    "/vite": {
      "filePath": "vite.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
