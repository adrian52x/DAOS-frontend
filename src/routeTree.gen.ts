/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file was automatically generated by TanStack Router.
// You should NOT make any changes in this file as it will be overwritten.
// Additionally, you should also exclude this file from your linter and/or formatter to prevent it from being checked or modified.

// Import Routes

import { Route as rootRoute } from "./routes/__root";
import { Route as ViteImport } from "./routes/vite";
import { Route as ReactImport } from "./routes/react";
import { Route as IndexImport } from "./routes/index";

// Create/Update Routes

const ViteRoute = ViteImport.update({
  id: "/vite",
  path: "/vite",
  getParentRoute: () => rootRoute,
} as any);

const ReactRoute = ReactImport.update({
  id: "/react",
  path: "/react",
  getParentRoute: () => rootRoute,
} as any);

const IndexRoute = IndexImport.update({
  id: "/",
  path: "/",
  getParentRoute: () => rootRoute,
} as any);

// Populate the FileRoutesByPath interface

declare module "@tanstack/react-router" {
  interface FileRoutesByPath {
    "/": {
      id: "/";
      path: "/";
      fullPath: "/";
      preLoaderRoute: typeof IndexImport;
      parentRoute: typeof rootRoute;
    };
    "/react": {
      id: "/react";
      path: "/react";
      fullPath: "/react";
      preLoaderRoute: typeof ReactImport;
      parentRoute: typeof rootRoute;
    };
    "/vite": {
      id: "/vite";
      path: "/vite";
      fullPath: "/vite";
      preLoaderRoute: typeof ViteImport;
      parentRoute: typeof rootRoute;
    };
  }
}

// Create and export the route tree

export interface FileRoutesByFullPath {
  "/": typeof IndexRoute;
  "/react": typeof ReactRoute;
  "/vite": typeof ViteRoute;
}

export interface FileRoutesByTo {
  "/": typeof IndexRoute;
  "/react": typeof ReactRoute;
  "/vite": typeof ViteRoute;
}

export interface FileRoutesById {
  __root__: typeof rootRoute;
  "/": typeof IndexRoute;
  "/react": typeof ReactRoute;
  "/vite": typeof ViteRoute;
}

export interface FileRouteTypes {
  fileRoutesByFullPath: FileRoutesByFullPath;
  fullPaths: "/" | "/react" | "/vite";
  fileRoutesByTo: FileRoutesByTo;
  to: "/" | "/react" | "/vite";
  id: "__root__" | "/" | "/react" | "/vite";
  fileRoutesById: FileRoutesById;
}

export interface RootRouteChildren {
  IndexRoute: typeof IndexRoute;
  ReactRoute: typeof ReactRoute;
  ViteRoute: typeof ViteRoute;
}

const rootRouteChildren: RootRouteChildren = {
  IndexRoute: IndexRoute,
  ReactRoute: ReactRoute,
  ViteRoute: ViteRoute,
};

export const routeTree = rootRoute
  ._addFileChildren(rootRouteChildren)
  ._addFileTypes<FileRouteTypes>();

/* ROUTE_MANIFEST_START
{
  "routes": {
    "__root__": {
      "filePath": "__root.tsx",
      "children": [
        "/",
        "/react",
        "/vite"
      ]
    },
    "/": {
      "filePath": "index.tsx"
    },
    "/react": {
      "filePath": "react.tsx"
    },
    "/vite": {
      "filePath": "vite.tsx"
    }
  }
}
ROUTE_MANIFEST_END */
