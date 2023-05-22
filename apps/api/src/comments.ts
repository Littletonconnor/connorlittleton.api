import { Request, Response } from 'express'
import z from 'zod'

import { prisma } from './lib/prisma'
import { generateRandomNumber } from './lib/utils'

// TODO: add better error handling.
// TODO: check for duplicates when creating/updating.

const commentSchema = z.object({
  name: z.string(),
  body: z.string(),
  email: z.string().email(),
  postId: z.number(),
})

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

async function createComment(request: Request, response: Response) {
  try {
    const { name, body, email, postId } = commentSchema.parse(request.body)

    // check if post exists before we pretend to attach the comment to the post.
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    })

    if (!post) {
      response.status(400).json({ error: 'Post not found' })
    }

    response.status(201).json({
      data: {
        id: generateRandomNumber(),
        body,
        name,
        email,
        postId,
      },
    })
  } catch (e: unknown) {
    response.status(400).json({ error: 'Bad request' })
  }
}

async function updateComment(request: Request, response: Response) {
  try {
    const id = Number(request.params.id)
    const { name, body, email, postId } = commentSchema.parse(request.body)

    // check if comment exists before we pretend to attach the comment to the post
    const comment = await prisma.comment.findFirst({
      where: {
        id,
      },
    })

    if (!comment) {
      response.status(400).json({ error: 'Comment not found' })
    }

    // check if post exists before we pretend to attach the comment to the post.
    const post = await prisma.post.findFirst({
      where: {
        id: postId,
      },
    })

    if (!post) {
      response.status(400).json({ error: 'Post not found' })
    }

    response.status(201).json({
      data: {
        id: generateRandomNumber(),
        body,
        name,
        email,
        postId,
      },
    })
  } catch (e: unknown) {
    response.status(400).json({ error: 'Bad request' })
  }
}

export { getComments, getComment }
export { createComment }
export { updateComment }
