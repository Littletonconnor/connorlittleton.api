// import { Request, Response } from 'express';
// import { comparePassword, createJwt, hashPassword } from './auth';
// import { logger } from './lib/logger';
// import { prisma } from './lib/prisma';

// async function signUp(request: Request, response: Response) {
//   if (!request.body.name || !request.body.password || !request.body.email) {
//     logger.log('Missing required fields, name, password, or email.');
//     response.status(400);
//     return response.json({
//       error: 'Missing required fields, name, password, or email.',
//     });
//   }

//   const user = await prisma.customer.create({
//     data: {
//       name: request.body.name,
//       password: await hashPassword(request.body.password),
//       email: request.body.email,
//     },
//   });

//   const token = createJwt(user);

//   response.status(201);
//   response.json({ data: token });
// }

// async function signIn(request: Request, response: Response) {
//   if (!request.body.email || !request.body.password) {
//     response.status(400);
//     return response.json({
//       error: 'Missing required fields, email or password.',
//     });
//   }

//   const user = await prisma.customer.findUnique({
//     where: {
//       email: request.body.email,
//     },
//   });

//   if (!user) {
//     logger.log('User not found.');
//     response.status(404);
//     return response.json({ error: 'User not found.' });
//   }

//   const isValid = await comparePassword(request.body.password, user.password);

//   if (!isValid) {
//     logger.log('Invalid password.');
//     response.status(401);
//     return response.json({ error: 'Invalid password.' });
//   }

//   const token = createJwt(user);

//   response.status(200);
//   response.json({ data: token });
// }

// export { signUp, signIn };

export {}
