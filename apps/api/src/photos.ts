import { Request, Response } from 'express'

import { prisma } from './lib/prisma'

async function getPhotos(request: Request, response: Response) {
  const data = await prisma.photo.findMany()

  return response.json({ data })
}

async function getPhoto(request: Request, response: Response) {
  const data = await prisma.photo.findFirst({
    where: {
      id: Number(request.params.id),
    },
  })

  if (!data) {
    return response.status(404).json({ error: 'Not found' })
  }

  return response.json({ data })
}

export { getPhotos, getPhoto }
