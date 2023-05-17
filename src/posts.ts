import { Request, Response } from 'express';
import { prisma } from './lib/prisma';

async function getPosts(request: Request, response: Response) {
  const data = await prisma.post.findMany();

  return response.json({ data });
}

async function getPost(request: Request, response: Response) {
  const data = await prisma.post.findFirst({
    where: {
      id: Number(request.params.id),
    },
  });

  if (!data) {
    return response.status(404).json({ error: 'Not found' });
  }

  return response.json({ data });
}

export { getPost, getPosts };
