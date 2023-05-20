import { Request, Response } from 'express'

import { prisma } from './lib/prisma'

async function getComments(request: Request, response: Response) {
  const data = await prisma.comment.findMany()

  return response.json({ data })
}

async function getComment(request: Request, response: Response) {
  const data = await prisma.comment.findFirst({
    where: {
      id: Number(request.params.id),
    },
  })

  if (!data) {
    return response.status(404).json({ error: 'Not found' })
  }

  return response.json({ data })
}

export { getComments, getComment }
