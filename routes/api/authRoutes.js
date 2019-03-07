const express = require('express');
const router = express.Router();
const jwt = require('jsonwebtoken');
const key = require('../../config/key');

// @route   POST /auth/token-fb
// @desc    For creating JWT for client side using fb details from fb callback. 
router.post('/token-fb', (req, res) => {
        
        const profile_id = req.body.id;
        const profile_name = req.body.name;
        const profile_email = req.body.email;

        if(!profile_id) {
            return res.json('No Profile Id obtained.');
        }
        
        User.findOne({ fbId: profile_id })
            .then(user => {
                if(user) {
                    const payload = {
                        id: user.id,
                        name: user.name,
                        info: user.info,
                        imageURL: user.imageURL,
                        imageID: user.imageID
                    }

                    // Sign JWT Token
                    jwt.sign(payload, key.secretOrKey, {expiresIn: 5400}, (err, token) => {
                        return res.json({
                            success: true,
                            token: 'Bearer ' + token
                        })     
                    })
                }else {
                    const newUser = new User({
                        fbId: profile_id,
                        name: profile_name,
                        email: profile_email
                    })
                    newUser.save()
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
                                    return res.json({
                                        success: true,
                                        token: 'Bearer ' + token
                                    })     
                                })
                            })
                }
            })
});


module.exports = router;