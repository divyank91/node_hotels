const passport = require('passport');
const LocalStrategy = require('passport-local').Strategy;
const Person = require('./models/person');


passport.use(new LocalStrategy(async (USERNAME, password, done) => {
    // Authentication logic here
    try {
      // console.log("Received credentials", USERNAME, password); // not a good practice to log passwords
      const user = await Person.findOne({username: USERNAME});
      if(!user) {
        return done(null, false, {message: 'Incorrect username'});
      }

      const isPasswordValid = user.comparePassword(password);
      if(isPasswordValid) {
        return done(null, user);
      } else {
        return done(null, false, {message: 'Incorrect password'});
      }
    } catch (error) {
      return done(error);
    }
}));

module.exports = passport; // Export configured passport