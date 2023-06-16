import { Router } from 'express'

import { getAlbum, getAlbums } from './albums'
import {
  createComment,
  getComment,
  getComments,
  updateComment,
} from './comments'
import { createPhotos, getPhoto, getPhotos, updatePhoto } from './photos'
import { getPost, getPosts, createPost, updatePost } from './posts'
import { getTodo, getTodos } from './todos'
import { getUser, getUsers } from './users'

const router = Router()

router.get('/albums', getAlbums)
router.get('/albums/:id', getAlbum)

router.get('/comments', getComments)
router.get('/comments/:id', getComment)

router.get('/photos', getPhotos)
router.get('/photos/:id', getPhoto)

router.get('/posts', getPosts)
router.get('/posts/:id', getPost)

router.get('/todos', getTodos)
router.get('/todos/:id', getTodo)

router.get('/users', getUsers)
router.get('/users/:id', getUser)

router.post('/comments', createComment)
router.post('/posts', createPost)
router.post('/photos', createPhotos)

router.put('/comments/:id', updateComment)
router.put('/posts/:id', updatePost)
router.put('/photos/:id', updatePhoto)

export { router }
