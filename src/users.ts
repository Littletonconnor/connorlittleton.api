import { Request, Response } from 'express';
import { prisma } from './lib/prisma';

async function getUsers(request: Request, response: Response) {
  const data = await prisma.user.findMany();

  return response.json({ data });
}

async function getUser(request: Request, response: Response) {
  const data = await prisma.user.findFirst({
    where: {
      id: Number(request.params.id),
    },
  });

  if (!data) {
    return response.status(404).json({ error: 'Not found' });
  }

  return response.json({ data });
}

export { getUsers, getUser };
