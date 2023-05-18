import { Photo, Post, User } from '@prisma/client';
import { logger } from './logger';
import { prisma } from './prisma';
import {
  createAlbum,
  createComment,
  createPhoto,
  createPost,
  createTodo,
  createUser,
} from './seed-utils';

// There are some ugly for loops in this file instead of Promise.all() because sqlite doesn't seem to support concurrent writes.

const POSTS = 100;
const USERS = 10;
const COMMENTS = 500;
const ALBUMS = 100;
const PHOTOS = 5000;
const TODOS = 200;

async function seed() {
  logger.log('🌱 Seeding Database...');
  console.time('🌱 Database has been seeded.');

  await deleteData();

  const users = await createUsers();
  const posts = await createPosts(users);
  const photos = await createPhotos();
  await createAlbums(users, photos);
  await createTodos(users);
  await createComments(posts);

  console.timeEnd('🌱 Database has been seeded.');
}

async function createUsers() {
  console.time('👤 Created users');

  let users = [];
  for (let index = 0; index < USERS; index++) {
    const userData = createUser();
    const postData = createPost();
    const albumData = createAlbum();
    const todoData = createTodo();

    const user = await prisma.user.create({
      data: {
        ...userData,
        posts: {
          create: {
            ...postData,
          },
        },
        albums: {
          create: {
            ...albumData,
          },
        },
        todos: {
          create: {
            ...todoData,
          },
        },
      },
    });

    users.push(user);
  }

  console.timeEnd('👤 Created users');
  return users;
}

async function createPosts(users: User[]) {
  console.time('📝 Created posts');

  let posts = [];
  for (let i = 0; i < POSTS - USERS; i++) {
    const postData = createPost();
    const commentData = createComment();
    const randomUserId =
      users[Math.floor(Math.random() * users.length - 1) + 1].id;

    const post = await prisma.post.create({
      data: {
        ...postData,
        user: {
          connect: {
            id: randomUserId,
          },
        },
        comments: {
          create: {
            ...commentData,
          },
        },
      },
    });

    posts.push(post);
  }

  console.timeEnd('📝 Created posts');
  return posts;
}

async function createComments(posts: Post[]) {
  console.time('💬 Created comments');

  let comments = [];
  for (let i = 0; i < COMMENTS - USERS - PHOTOS; i++) {
    const commentData = createComment();
    const randomPostId =
      posts[Math.floor(Math.random() * posts.length - 1) + 1].id;

    const comment = await prisma.comment.create({
      data: {
        ...commentData,
        post: {
          connect: {
            id: randomPostId,
          },
        },
      },
    });

    comments.push(comment);
  }

  console.timeEnd('💬 Created comments');
  return comments;
}

async function createAlbums(users: User[], photos: Photo[]) {
  console.time('📸 Created albums');

  let albums = [];
  for (let i = 0; i < ALBUMS - USERS; i++) {
    const albumData = createAlbum();
    const randomUserId =
      users[Math.floor(Math.random() * users.length - 1) + 1].id;
    const randomPhotoId =
      photos[Math.floor(Math.random() * photos.length - 1) + 1].id;

    const album = await prisma.album.create({
      data: {
        ...albumData,
        user: {
          connect: {
            id: randomUserId,
          },
        },
        photos: {
          connect: {
            id: randomPhotoId,
          },
        },
      },
    });

    albums.push(album);
  }

  console.timeEnd('📸 Created albums');
  return albums;
}

async function createPhotos() {
  console.time('🖼 Created photos');

  let photos = [];
  for (let i = 0; i < PHOTOS; i++) {
    const photoData = createPhoto();

    const photo = await prisma.photo.create({
      data: {
        ...photoData,
      },
    });

    photos.push(photo);
  }

  console.timeEnd('🖼 Created photos');
  return photos;
}

async function createTodos(users: User[]) {
  console.time('✅ Created todos');

  let todos = [];
  for (let i = 0; i < TODOS - USERS; i++) {
    const todoData = createTodo();
    const randomUserId =
      users[Math.floor(Math.random() * users.length - 1) + 1];

    const todo = await prisma.todo.create({
      data: {
        ...todoData,
        user: {
          connect: {
            id: randomUserId.id,
          },
        },
      },
    });

    todos.push(todo);
  }

  console.timeEnd('✅ Created todos');
  return todos;
}

async function deleteData() {
  console.time('🧹 Cleaned up the database');
  await prisma.comment.deleteMany();
  await prisma.photo.deleteMany();
  await prisma.todo.deleteMany();
  await prisma.post.deleteMany();
  await prisma.album.deleteMany();
  await prisma.user.deleteMany();
  console.timeEnd('🧹 Cleaned up the database');
}

seed()
  .catch((e) => {
    logger.error(e);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
