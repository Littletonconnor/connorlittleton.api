# ExpressoCrud

A Coffee API.

## ENDPOINTS:

* GET /coffee - Get a list of all coffee orders
* GET /coffee/:id - Get details for a specific coffee order
* POST /coffee - Create a new coffee order
* PUT /coffee/:id - Update an existing coffee order
* DELETE /coffee/:id - Delete a coffee order

## Setup

1. First run `git clone`.
2. Run the setup script which will seed the local sqlite DB.
3. Run `npm run dev`

## Libraries

* Prisma
* Sqlite
* Vite

## TODO

* Add tests.
* Get github actions working.
* Maybe: Setup local logging service.
* Make seed test a lot better by using faker.
* Create JWT authentication for both client and server.
  * For server, we'll return the JWT to the user and they'll need to send it with every request.
  * For client, we'll store the JWT in local storage and send it with every request.
* Add Zod for validation (we're using sqlite so we can't really use any useful enums AFAIK).
