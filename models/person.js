const mongoose = require('mongoose');
const bcrypt = require('bcrypt');
// Define the Person schema
const personSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    age: {
        type: Number
    },
    work: {
        type: String,
        enum: ['chef', 'owner', 'manager', 'waiter'],
        required: true
    },
    mobile: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true,
        unique: true
    },
    address: {
        type: String
    },
    salary: {
        type: Number,
        required: true
    },
    username: {
        required: true,
        type: String,
        unique: true
    },
    password: {
        required: true,
        type: String
    }
});

personSchema.pre('save', async function(next) {
    const person = this;
    // Hash the password only if it has been modified (or is new)
    if(!person.isModified('password')) return next();
    try {
        // Hash password generation
        const salt = await bcrypt.genSalt(10);

        //hash password
        const hashedPassword = await bcrypt.hash(person.password, salt);
        person.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
})

personSchema.methods.comparePassword = async function(candidatePassword) {
    try {
        // Use bcrypt to compare the hashed password with the provided password
        const isMatch = await bcrypt.compare(candidatePassword, this.password);
        return isMatch;
    } catch(error) {
        throw error;
    }
}

// Create person model
const Person = mongoose.model('Person', personSchema);
module.exports = Person;