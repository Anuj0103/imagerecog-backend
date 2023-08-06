const express = require('express');
const bodyParser = require('body-parser'); // latest version of exressJS now comes with Body-Parser!
const bcrypt = require('bcrypt-nodejs');
const cors = require('cors');
const knex = require('knex');

const register = require('./controllers/register');
const signin = require('./controllers/signin');
const profile = require('./controllers/profile');
const image = require('./controllers/image');

const db = knex({
  // connect to your own database here:
  client: 'pg',
  connection: {
    host: '127.0.0.1',
    user: 'postgres',
    password: 'admin',
    database: 'smart-brain',
  },
});

// const app = express();

// app.use(cors());
// app.use(express.json()); // latest version of exressJS now comes with Body-Parser!
module.exports = {
  '/': async (req, res) => {
    res.send('It is working!');
  },
  '/signin': async (req, res) => {
    signin.handleSignin(db, bcrypt)(req, res);
  },
  '/register': async (req, res) => {
    register.handleRegister(req, res, db, bcrypt);
  },
  '/profile/:id': async (req, res) => {
    profile.handleProfileGet(req, res, db);
  },
  '/image': async (req, res) => {
    image.handleImage(req, res, db);
  },
  '/imageurl': async (req, res) => {
    image.handleApiCall(req, res);
  },
};

// app.listen(3000, () => {
//   console.log(`app is running on port 3000`);
// });
