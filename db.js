const mongoose = require('mongoose');
require('dotenv').config();

// Define the MongoDB connection URL
//const mongoURL = process.env.DB_URL_LOCAL; // for local MongoDB
const mongoURL = process.env.DB_URL;

// Set up the MongoDB connection
mongoose.connect(mongoURL, { 
    useNewUrlParser: true, 
    useUnifiedTopology: true 
});    

// Get the default connection
// Mongoose maintains a default connection object representing the MongoDB connection.
const db = mongoose.connection;
db.on('connected', () => {
    console.log('MongoDB connected successfully');
});

db.on('error', () => {
    console.log('MongoDB connection error');
});

db.on('disconnected', () => {
    console.log('MongoDB disconnected');
});

// Export the database connection
module.exports = db;


