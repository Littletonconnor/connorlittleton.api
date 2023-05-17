import { faker } from '@faker-js/faker';
import bcrypt from 'bcryptjs';

export function createUser() {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const address = faker.location.streetAddress();
  const phone = faker.phone.number();
  const website = faker.internet.url();
  const company = faker.company.name();

  return {
    name,
    email,
    address,
    phone,
    website,
    company,
    password: createPassword(name),
  };
}

export function createTodo() {
  const title = faker.lorem.sentence();
  const completed = faker.datatype.boolean();

  return {
    title,
    completed,
  };
}

export function createPhoto() {
  const title = faker.lorem.sentence();
  const url = faker.image.url();
  const thumbnail = faker.image.url();

  return {
    title,
    url,
    thumbnail,
  };
}

export function createAlbum() {
  const title = faker.lorem.sentence();

  return {
    title,
  };
}

export function createComment() {
  const name = faker.person.fullName();
  const email = faker.internet.email();
  const body = faker.lorem.paragraph();

  return {
    name,
    email,
    body,
  };
}

export function createPost() {
  const title = faker.lorem.sentence();
  const body = faker.lorem.paragraph();

  return {
    title,
    body,
  };
}

export function createPassword(username: string = faker.internet.userName()) {
  return bcrypt.hashSync(username, 10);
}
