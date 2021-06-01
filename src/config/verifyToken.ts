const jwt = require('jsonwebtoken');
const secret = require('../config/clientSecret').secret;

const verifyToken = (req, res, next) => {
    const authHeader = req.headers['authorization'];
    const token = authHeader && authHeader.split(' ')[1];

    if (!token)
    return res.status(403).send({ status: 'Access Denied', message: 'No token provided.' });
  
    jwt.verify(token, secret, function (err, decoded) {
        if (err)
            return res.status(500).send({ status: 'Access Denied', message: 'Failed to authenticate token.' });
        req.userId = decoded.id;
        next();
    });
}
module.exports = verifyToken;