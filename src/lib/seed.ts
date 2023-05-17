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

// FIXME: Sqlite doesn't work well with promise.all
const TEMP = 1;

const POSTS = TEMP;
const COMMENTS = TEMP;
const ALBUMS = TEMP;
const PHOTOS = TEMP;
const TODOS = TEMP;
const USERS = TEMP;

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
  const users = await Promise.all(
    Array.from({ length: USERS }, async (_, index) => {
      const userData = createUser();
      const postData = createPost();
      const albumData = createAlbum();
      const todoData = createTodo();

      return prisma.user.create({
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
    })
  );

  console.timeEnd('👤 Created users');
  return users;
}

async function createPosts(users: User[]) {
  console.time('📝 Created posts');
  const posts = await Promise.all(
    Array.from({ length: POSTS }, async () => {
      const postData = createPost();
      const commentData = createComment();
      const randomUserId =
        users[Math.floor(Math.random() * users.length - 1) + 1].id;

      return prisma.post.create({
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
    })
  );

  console.timeEnd('📝 Created posts');
  return posts;
}

async function createComments(posts: Post[]) {
  console.time('💬 Created comments');

  const comments = await Promise.all(
    Array.from({ length: COMMENTS }, async () => {
      const commentData = createComment();
      const randomPostId =
        posts[Math.floor(Math.random() * posts.length - 1) + 1].id;

      return prisma.comment.create({
        data: {
          ...commentData,
          post: {
            connect: {
              id: randomPostId,
            },
          },
        },
      });
    })
  );

  console.timeEnd('💬 Created comments');
  return comments;
}

async function createAlbums(users: User[], photos: Photo[]) {
  console.time('📸 Created albums');

  const albums = await Promise.all(
    Array.from({ length: ALBUMS }, async () => {
      const albumData = createAlbum();
      const randomUserId =
        users[Math.floor(Math.random() * users.length - 1) + 1].id;
      const randomPhotoId =
        photos[Math.floor(Math.random() * photos.length - 1) + 1].id;

      return prisma.album.create({
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
    })
  );

  console.timeEnd('📸 Created albums');
  return albums;
}

async function createPhotos() {
  console.time('🖼 Created photos');

  const photos = Promise.all(
    Array.from({ length: PHOTOS }, async () => {
      const photoData = createPhoto();

      return prisma.photo.create({
        data: {
          ...photoData,
        },
      });
    })
  );

  console.timeEnd('🖼 Created photos');
  return photos;
}

async function createTodos(users: User[]) {
  console.time('✅ Created todos');

  const todos = await Promise.all(
    Array.from({ length: TODOS - USERS }, async () => {
      const todoData = createTodo();
      const randomUserId =
        users[Math.floor(Math.random() * users.length - 1) + 1];

      return prisma.todo.create({
        data: {
          ...todoData,
          user: {
            connect: {
              id: randomUserId.id,
            },
          },
        },
      });
    })
  );

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
