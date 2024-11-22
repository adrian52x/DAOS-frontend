import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/posts/$posts')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /posts/$posts!'
}
