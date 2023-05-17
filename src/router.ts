import { Router } from 'express';
import { getPost, getPosts } from './posts';

// TODO: add support for the other endpoints.

const router = Router();

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);

export { router };
