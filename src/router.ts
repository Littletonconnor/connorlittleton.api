import { Router } from 'express';
import { getAlbum, getAlbums } from './albums';
import { getComment, getComments } from './comments';
import { getPhoto, getPhotos } from './photos';
import { getPost, getPosts } from './posts';
import { getTodo, getTodos } from './todos';
import { getUser, getUsers } from './users';

const router = Router();

router.get('/albums', getAlbums);
router.get('/albums/:id', getAlbum);

router.get('/comments', getComments);
router.get('/comments/:id', getComment);

router.get('/photos', getPhotos);
router.get('/photos/:id', getPhoto);

router.get('/posts', getPosts);
router.get('/posts/:id', getPost);

router.get('/todos', getTodos);
router.get('/todos/:id', getTodo);

router.get('/users', getUsers);
router.get('/users/:id', getUser);

export { router };
