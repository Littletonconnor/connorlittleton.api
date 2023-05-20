import { Request, Response } from 'express'

import { prisma } from './lib/prisma'

async function getAlbums(request: Request, response: Response) {
  const data = await prisma.album.findMany()

  return response.json({ data })
}

async function getAlbum(request: Request, response: Response) {
  const data = await prisma.album.findFirst({
    where: {
      id: Number(request.params.id),
    },
  })

  if (!data) {
    return response.status(404).json({ error: 'Not found' })
  }

  return response.json({ data })
}

export { getAlbum, getAlbums }
