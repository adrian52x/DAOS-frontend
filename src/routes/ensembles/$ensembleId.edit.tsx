import * as React from 'react'
import { createFileRoute } from '@tanstack/react-router'

export const Route = createFileRoute('/ensembles/$ensembleId/edit')({
  component: RouteComponent,
})

function RouteComponent() {
  return 'Hello /ensembles/$ensembleId/edit!'
}
