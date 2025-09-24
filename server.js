const express = require('express');
const app = express();
const db = require('./db'); // Import the database connection
require('dotenv').config();

const bodyParser = require('body-parser');

// Middleware to parse JSON requests
app.use(bodyParser.json()); // stores data in req.body
const PORT = process.env.PORT || 3000;

app.get('/', (req, res) => {
  res.send('Hello World!');
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