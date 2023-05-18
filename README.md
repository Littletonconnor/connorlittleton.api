# Connorlittleton.api

## Overview
Welcome to connorlittleton.api! A simple jsonplaceholder alternative using my own API, a custom docs site, CICD pipeline, etc.

- Api: connorlittleton.api [connorlittleton.api](https://docs.connorlittleton.api/)
- Docs: docs.connorlittleton.api [docs.connorlittleton.api](https://connorlittleton.api/)

## Endpoints
/posts	100 posts
/comments	500 comments
/albums	100 albums
/photos	5000 photos
/todos	200 todos
/users	10 users

## Models:

| model   | Post      |
|---------|-----------|
| Field   | Type      |
|---------|-----------|
| id      | Int       |
| title   | String    |
| body    | String    |
| userId  | Int       |
| user    | User      |
| comments| Comment[] |

| model   | Comment   |
|---------|-----------|
| Field   | Type      |
|---------|-----------|
| id      | Int       |
| name    | String    |
| email   | String    |
| body    | String    |
| postId  | Int       |
| post    | Post?     |

| model   | Album     |
|---------|-----------|
| Field   | Type      |
|---------|-----------|
| id      | Int       |
| title   | String    |
| userId  | Int       |
| user    | User      |
| photos  | Photo[]   |


| model   | Album     |
|---------|-----------|
| Field   | Type      |
|---------|-----------|
| id      | Int       |
| title   | String    |
| userId  | Int       |
| user    | User      |
| photos  | Photo[]   |

| model   | Todo      |
|---------|-----------|
| Field   | Type      |
|---------|-----------|
| id      | Int       |
| title   | String    |
| completed | Boolean |
| userId  | Int       |
| user    | User      |

| model   | User      |
|---------|-----------|
| Field   | Type      |
|---------|-----------|
| id      | Int       |
| name    | String    |
| email   | String    |
| address | String    |
| phone   | String    |
| website | String    |
| company | String    |
| posts   | Post[]    |
| albums  | Album[]   |
| todos   | Todo[]    |
| password | String   |



## Setup

🌱 Just run the seed script and you're all set!
```sh
pnpm prisma:seed
```

Check the database out with prisma studio
```sh
pnpm prisma:studio
```
