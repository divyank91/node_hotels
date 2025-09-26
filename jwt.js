const jwt = require('jsonwebtoken');

const jwtAuthMiddleware = (req, res, next) => {

    // First check the request header has authorization or not
    const authorization = req.headers.authorization;
    if(!authorization) return res.status(401).json({error: "Token not found"})


    // Extract the jwt token from the request headers
    const token = req.headers.authorization.split(' ')[1]; // Assuming Bearer token format
    if(!token) return res.status(401).json({error: "Unauthorized"});

    try {
        // Verify the JWT token
        const decoded = jwt.verify(token, process.env.JWT_SECRET);
        // Attach the user info to the request object
        req.user = decoded;
        next(); // Proceed to the next middleware or route handler
    } catch (error) {
        console.log(error);
        res.status(401).json({error: "Invalid Token"});
    }
}

// Fucntion to generate JWT token
const generateToken = (userData) => {
    // Generate a new JWT token using user data
    return jwt.sign(userData, process.env.JWT_SECRET, {expiresIn: 3000});
}

module.exports = {jwtAuthMiddleware, generateToken};