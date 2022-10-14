// verifyToken.js - verifying JSON web token for authentication
const jwt = require("jsonwebtoken")

// verifies the JSON web token
function verify(req, res, next) {
    const authHeader = req.headers.token; // get JSON token from header
    if (authHeader) { // if header provided
        const token = authHeader.split(" ")[1]; // ("Bearer", <token>)

        jwt.verify(token, process.env.SECRET_KEY, (err, user) => {
            if (err) {
                res.status(403).json("JWT token is invalid!");
                return;
            }
            req.user = user; // sets req.user 
            next();
        })
    } else {
        return res.status(401).json("You are not authenticated " + req.headers.token); // 401 is not authenticated
    }
}

module.exports = verify;