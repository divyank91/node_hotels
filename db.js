const mongoose = require('mongoose');

// Define the MongoDB connection URL
const mongoURL = 'mongodb://localhost:27017/hotels'; // Replace 'mydatabase' with your database name

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


