const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection
require('dotenv').config();
const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');

const bodyParser = require('body-parser');

// Middleware to parse JSON requests
app.use(bodyParser.json()); // stores data in req.body
const PORT = process.env.PORT || 3000;

// Middleware Function
const logRequest = (req, res, next) => {
  console.log(`[${new Date().toLocaleString()}] Request made to : ${req.originalUrl}`);
  next();
}

app.use(logRequest);

passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication logic here
    try {
      console.log("Received credentials", username, password);
      const user = await Person.findOne({username: USERNAME});
      if(!user) {
        return done(null, false, {message: 'Incorrect username'});
      }

      const isPasswordValid = user.password === password ? true : false;
      if(isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Incorrect password'});
      }
    } catch (error) {
      return done(error);
    }
}))

app.use(passport.initialize());

app.get('/', passport.authenticate('local', { session: false }), (req, res) => {
  res.send('Welcome to our Hotel');
});

// Import the router files
const personRoutes = require('./routes/personRoutes');
const menuItemRoutes = require('./routes/menuItemRoutes');

// Use the routers
app.use('/person', personRoutes);
app.use('/menu', menuItemRoutes);

app.listen(3000, () => {
  console.log('Server is running on port 3000');
});