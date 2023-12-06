## Simple node JS API for movie inventory 

### Tech Stack
* DB - MongoDB(Used Mongo atlas free tier connection, NOTE: i have used the same cluster for both integration tests and also for real time due to free tier constraint).
* BE - Express JS with NodeJS as runtime.
* Language - Typescript.
* Testing - Chai and Mocha.

### npm ci
Install local dependencies using `npm ci`

### npm run start
Starts the local node server in the port `3000`

### npm run lint
Check Lint es issues

### npm run test
To run integration tests

### Endpoints

 - /movies(GET) - Get the entire list of movies.
 - /movies(POST) - Insert a movie with admin role.
 - /movies{id}(DELETE) - Delete a movie with admin role.
 - /movies{id}(PUT) - update a movie with admin role.
 - /movies/search?title={title}|genre={genre} - search with title or genre to fetch a movie.
