# Spoiler Zone's Server

A server to handle all Spoiler Zone's API calls. Created with Node.js and Express, with calls to The Movie Database and Cloud Firestore.

## Table of Contents

* [Technologies](#Technologies)
* [Server](#Server)
* [Launch](#Launch)
* [Contibutions](#Contibutions)

## Technologies

Spoiler Zone uses:
* Firebase 8.2.7
* Firebase Admin 9.5.0
* NPM 6.14.10
* Node 14.15.4
* Express 4.17.1
* Express Rate Limit 5.2.5
* CORS 2.8.5
* Helmet 4.4.1
* Dotenv 8.2.0
* Node Fetch 2.6.1
* Nodemon 2.0.7

## Server

This server was created mainly for security reasons, since no secret key should be used in the front end with React. Notice that this project uses environment variables to store these keys.

All the technical information about movies in [the original website](https://almirleandro.github.io/spoilerzone/) is from The Movie Database API. The API key is stored as an environment variable in Heroku.

The spoilers, on the other hand, are stored in a Firebase database, which is also called from the server, not from the front end. The path for the configuration of the Firebase package is stored as an environment variable too.

CORS, Helmet and Express Rate Limit were used as tools to ensure the security of the server, which, just as the Firebase database, is configured to receive calls only from [the original website](https://almirleandro.github.io/spoilerzone/#/).

## Launch

In the project directory, you can run:

#### `npm start`

Runs the server, and now it is ready to receive calls.

It is served at [http://localhost:3002](http://localhost:3002) or at a custom port specified with an environment variable.

#### `npm run dev`

Runs the server in development mode, using Nodemon. It will reload if you make edits.

## Contibutions

Any kind of contributions is welcome. If you encounter any bug, please raise an issue. Pull Requests are also great. Please, in any of these cases, try to be explicit about what is the issue or the PR about.