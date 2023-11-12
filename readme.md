#  RegistrationUser task

This is an app with 3-screen registration ui and server api. On first screen you can create user by providing email and password. After that server api sends confirmation code to provided email and ui moves you to second screen, waiting for email confirmation. When mail confirmed, user gets random name and photo from random user api (this is a tech viewer req) and see hello screen (third screen of registration).

## Quick run

1. Setup google app password: 
Create a file called APP_PASS.ts in project root. Declare there const APP_PASS and SENDER_EMAIL of type string end export them.
This is required by google api, so server could use your mailbox as code sender.

2. Run  backend server start script
```bash
# Starts backend api server
./server npm run serve
```

3. Run angular dev server
```bash
# Starts client dev server
./app ng serve
```

## Stack

### Clinet

Client powered by:
- Typescript
- Angular
- Sass

### Server

Server powered by:

- Typescript
- NodeJS
- Nodemon
- Cors
- Nodmailer

#### The app has many todo's and bugs. This is not the final version. 
