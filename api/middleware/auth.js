const fs = require('fs');
const jwt = require('jsonwebtoken');

const auth = (req, res, next) => {
  // Check if get request
  if (req.method === 'GET') return next();

  // Retrieve public key
  const publicKey = fs.readFileSync('./api/key/public.key', 'utf-8');

  // Retrieve headers
  const token = req.headers['x-auth-token'] || req.headers['authorization'];

  // Check if headers exists
  if (!token) {
    res.status(401).json({
      message: 'Access denied, no token provided'
    });
  } else {
    try {
      // Verify token
      jwt.verify(token, publicKey, (err, decoded) => {
        if (!err) {
          req.userId = decoded.id;
          req.userEmail = decoded.email;
          next();
        } else {
          req.status(500).json({
            message: 'Something went wrong while verifying the JWT'
          });
        }
      });
    } catch (ex) {
      // Invalid token
      res.status(401).json({
        message: 'Invalid token'
      });
    }
  }
};

module.exports = auth;
