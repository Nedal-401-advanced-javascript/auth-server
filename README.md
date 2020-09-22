#### Author: NEDAL EREKAT
# auth-server

An Express/Node.js based server using a custom “authentication” module that is designed to handle user registration and sign in using Basic, Bearer, or OAuth along with a custom “authorization” module that will grant/deny users access to the server based on their role or permissions level.

## authentication modules:
1. Basic Auth.
2. Bearer Auth.
3. OAuth.

our auth-server is able to handle Basic Authentication (user provides a username + password) and OAuth (user authenticates through a 3rd party). When a “good” login happens, the user is considered to be “authenticated” and our auth-server generates a JWT signed “Token” which is returned to the application.
using that Token to re-authenticate users to shield access to any route that requires a valid login to access.

### .env requirements:
- PORT
- MONGOOSE_url
- CLIENT_id
- CLINET_secret

### Running the app
npm start
- Endpoint: /signin
- Endpoint: /signup
- Endpoint: /users
- Endpoint: /oauth

### Tests
- Unit Tests: npm run test
- Lint Tests: npm run lint


## UML diagram:
![](./assets/OAuth.jpg)