import { Request, Response } from 'express'
import z from 'zod'

import { prisma } from './lib/prisma'
import { generateRandomNumber } from './lib/utils'

const photoSchema = z.object({
  title: z.string(),
  url: z.string(),
  thumbnail: z.number(),
  albumId: z.number(),
})

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

async function createPhotos(request: Request, response: Response) {
  try {
    const { url, thumbnail, title, albumId } = photoSchema.parse(request.body)

    // check if user exists before we pretend to attach the post to the user.
    const album = await prisma.album.findFirst({
      where: {
        id: albumId,
      },
    })

    if (!album) {
      response.status(400).json({ error: 'Album not found' })
    }

    response.status(201).json({
      data: {
        url,
        thumbnail,
        title,
        albumId,
      },
    })
  } catch (e: unknown) {
    response.status(400).json({ error: 'Bad request' })
  }
}

async function updatePhoto(request: Request, response: Response) {
  try {
    const id = Number(request.params.id)
    const { url, thumbnail, title, albumId } = photoSchema.parse(request.body)

    // check if user exists before we pretend to attach the post to the user.
    const photo = await prisma.photo.findFirst({
      where: {
        id,
      },
    })

    if (!photo) {
      response.status(400).json({ error: 'Photo not found' })
    }

    const album = await prisma.album.findFirst({
      where: {
        id: albumId,
      },
    })

    if (!album) {
      response.status(400).json({ error: 'Album not found' })
    }

    response.status(201).json({
      data: {
        id: generateRandomNumber(),
        title,
        url,
        thumbnail,
      },
    })
  } catch (e: unknown) {
    response.status(400).json({ error: 'Bad request' })
  }
}

export { getPhotos, getPhoto }
export { createPhotos, updatePhoto }
