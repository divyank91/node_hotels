const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection
require('dotenv').config();
const passport = require('./auth');
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

app.use(passport.initialize());
const localAuthmiddleware = passport.authenticate('local', {session: false});

app.get('/', localAuthmiddleware, function (req, res) {
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