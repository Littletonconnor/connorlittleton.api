import { Request, Response } from 'express'
import z from 'zod'

import { prisma } from './lib/prisma'
import { generateRandomNumber } from './lib/utils'

// TODO: add better error handling.
// TODO: check for duplicates when creating/updating.

const postsSchema = z.object({
  title: z.string(),
  body: z.string(),
  userId: z.number(),
})

async function getPosts(request: Request, response: Response) {
  const data = await prisma.post.findMany()

  return response.json({ data })
}

async function getPost(request: Request, response: Response) {
  const data = await prisma.post.findFirst({
    where: {
      id: Number(request.params.id),
    },
  })

  if (!data) {
    return response.status(404).json({ error: 'Not found' })
  }

  return response.json({ data })
}

async function createPost(request: Request, response: Response) {
  try {
    const { title, body, userId } = postsSchema.parse(request.body)

    // check if user exists before we pretend to attach the post to the user.
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      response.status(400).json({ error: 'User not found' })
    }

    response.status(201).json({
      data: {
        id: generateRandomNumber(),
        title,
        body,
        userId,
      },
    })
  } catch (e: unknown) {
    response.status(400).json({ error: 'Bad request' })
  }
}

async function updatePost(request: Request, response: Response) {
  try {
    const id = Number(request.params.id)
    const { title, body, userId } = postsSchema.parse(request.body)

    // check if post exists before we pretend to attach the post to the user.
    const post = await prisma.post.findFirst({
      where: {
        id,
      },
    })

    if (!post) {
      response.status(400).json({ error: 'Post not found' })
    }

    // check if user exists before we pretend to attach the post to the user.
    const user = await prisma.user.findFirst({
      where: {
        id: userId,
      },
    })

    if (!user) {
      response.status(400).json({ error: 'User not found' })
    }

    response.status(201).json({
      data: {
        id: generateRandomNumber(),
        title,
        body,
        userId,
      },
    })
  } catch (e: unknown) {
    response.status(400).json({ error: 'Bad request' })
  }
}

export { getPost, getPosts }
export { createPost }
export { updatePost }
