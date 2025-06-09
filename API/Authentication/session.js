const jwt = require('jsonwebtoken');
require('dotenv').config();

function authenticate(req, res, next) {
    let sessionValid = false;
    let tokenValid = false;

    if (req.session && req.session.user) {
        req.user = req.session.user;
        sessionValid = true;
    }

    const authHeader = req.headers.authorization;
    if (authHeader && authHeader.startsWith('Bearer ')) {
        const token = authHeader.split(' ')[1];
        jwt.verify(token, process.env.JWT_SECRET, (err, user) => {
            if (!err) {

                req.user = user;
                tokenValid = true;
            }

            if (sessionValid || tokenValid) {
                return next();
            } else {
                return res.status(401).json({
                    status: "failed",
                    message: "Unauthorized access"
                });
            }
        });
        
    } else {
        
        if (sessionValid == true && tokenValid == true) {
            return next();
        } else {
            return res.status(401).json({
                status: "failed",
                message: "Unauthorized access"
            });
        }
    }
}

module.exports = {
    authenticate,
}