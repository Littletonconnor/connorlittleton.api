import { Request, Response } from 'express'

import { prisma } from './lib/prisma'

async function getTodos(request: Request, response: Response) {
  const data = await prisma.todo.findMany()

  return response.json({ data })
}

async function getTodo(request: Request, response: Response) {
  const data = await prisma.todo.findFirst({
    where: {
      id: Number(request.params.id),
    },
  })

  if (!data) {
    return response.status(404).json({ error: 'Not found' })
  }

  return response.json({ data })
}

export { getTodos, getTodo }
