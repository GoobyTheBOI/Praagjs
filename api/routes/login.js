const express = require('express');
const router = express.Router();
const fs = require('fs');
const jwt = require('jsonwebtoken');
const bcrypt = require('bcrypt');
const conn = require('../util/connection');

const privateKey = fs.readFileSync('./api/key/private.key', 'utf-8');

// ! POST Login user
router.post('/', (req, res) => {
  conn.query('SELECT * FROM users WHERE email = ?', [req.body.email], (error, results) => {
    if (error) return res.status(500).json({ error: error });
    // bcrypt.hash(req.body.password, 10, (err, hash) => {
    //   console.log(hash);
    // });
    if (results.length === 1) {
      bcrypt.compare(req.body.password, results[0].password, (err, compare) => {
        if(compare) {
          jwt.sign({
            id: results[0].id,
            email: results[0].email,
          }, privateKey, { algorithm: 'RS256' }, (err, token) => {
            if(!err) {
              res.status(200).json({
                token
              });
            } else {
              res.status(500).json({
                message: 'Something went wrong while creating a JWT'
              });
            }
          })
        } else {
          return res.status(401).json({
            message: 'Invalid password',
          })
        }
      })
    } else {
      return res.status(404).json({
        message: 'This user doesn\'t exists',
      })
    }
  });
});

module.exports = router;
