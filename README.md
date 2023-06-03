# Connorlittleton.api

## Overview
Welcome to connorlittleton.api! A simple jsonplaceholder alternative using my own API, a custom docs site, CICD pipeline, etc.

## Folder Structure

### Terraform
This directory contains a Terraform module to deploy the API on an EC2 instance. At one point I had the EC2 instance configured with a docs site and API but I removed it. Checkout my [blog post](https://www.connorlittleton.dev/posts/deploying-an-api) on how I configured it though.

### apps/www
This is an un-finished nextra site, but demonstrates how you can easily setup documentation around your API.

### apps/api
This is the meat of the project, this is where the API lives!

## Endpoints
* /posts	100 posts
* /comments	500 comments
* /albums	100 albums
* /photos	5000 photos
* /todos	200 todos
* /users	10 users

## Setup

🌱 Just run the seed script and you're all set!
```sh
pnpm prisma:seed
```

Check the database out with prisma studio
```sh
pnpm prisma:studio
```
