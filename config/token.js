const jwt = require('jsonwebtoken');
const key = require('./key');

// Load User Model
const User = require('../models/User');

// Generate an Access Token for the given User ID
function generateAccessToken(req, res) {

    userId = req.user.id;

    User.findById(userId)
        .then(user => {
            const payload = {
                id: user.id,
                name: user.name,
                info: user.info,
                imageURL: user.imageURL,
                imageID: user.imageID
            }

            // Sign JWT Token
            jwt.sign(payload, key.secretOrKey, {expiresIn: 5400}, (err, token) => {
                res.json({
                success: true,
                token: 'Bearer ' + token
            })
        })
    }) 
}

module.exports = {
    generateAccessToken: generateAccessToken
}