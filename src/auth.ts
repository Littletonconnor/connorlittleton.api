import bcrypt from 'bcrypt';
import { NextFunction, Request, Response } from 'express';
import jwt from 'jsonwebtoken';

interface Customer {
  id: number;
  name: string;
}

async function hashPassword(password: string) {
  return await bcrypt.hash(password, 10);
}

async function comparePassword(password: string, hash: string) {
  return await bcrypt.compare(password, hash);
}

function createJwt(user: Customer) {
  return jwt.sign({ id: user.id, name: user.name }, process.env.JWT_SECRET);
}

function protect(request: Request, response: Response, next: NextFunction) {
  const bearer = request.headers.authorization;

  if (!bearer || !bearer.startsWith('Bearer ')) {
    response.status(401);
    return response.json({ error: 'Unauthorized' });
  }

  const [, token] = bearer.split(' ');

  try {
    const user = jwt.verify(token, process.env.JWT_SECRET) as Customer;
    // @ts-ignore
    request.user = user;
    next();
  } catch (error: unknown) {
    response.status(401);
    return response.json({ error: 'Unauthorized' });
  }
}

export { hashPassword, comparePassword, createJwt, protect };
