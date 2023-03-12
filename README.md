# ExpressoCrud

Welcome to ExpressoCrud! A simple local Coffee API to demonstrate CRUD operations.

## ENDPOINTS:

* GET /coffee - Get a list of all coffee orders
* GET /coffee/:id - Get details for a specific coffee order
* POST /coffee - Create a new coffee order
* PUT /coffee/:id - Update an existing coffee order
* DELETE /coffee/:id - Delete a coffee order

## Setup

1. First run `pn install`.
2. Run the setup script `pn seed` which will seed the local sqlite DB (You can also reset the db with `pn reset` if you wish).
3. See the local database with `pnpx prisma studio`. This will open a web browser with the local database on http://localhost:5555.
4. To run the server, run `pn dev` which will start the server on http://localhost:5000.

## Libraries

* Prisma
* Sqlite
* Vite

## Features

* Authentication with JWT.
* Local Logging
* Testing.
* Local DB with Prisma.
* Zod for validation.

## TODO

* Add tests.
* Get github actions working.
* Maybe: Setup local logging service.
* Make seed test a lot better by using faker.
* Create JWT authentication for both client and server.
  * For server, we'll return the JWT to the user and they'll need to send it with every request.
  * For client, we'll store the JWT in local storage and send it with every request.
* Add Zod for validation (we're using sqlite so we can't really use any useful enums AFAIK).
