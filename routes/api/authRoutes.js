const passport = require('passport');
const express = require('express');
const router = express.Router();
const token = require('../../config/token');

// @route   GET /auth/facebook
// @desc    For sending request to facebook 
// @access  Private
router.get('/facebook', 
    passport.authenticate('facebook', { scope: ['email'], session: false })
);

// @route   GET /auth/facebook/callback
// @desc    geting respond from fb data. 
// @access  Private
generateUserToken = (req, res) => {
    token.generateAccessToken(req, res);
}

router.get('/facebook/callback', 
    passport.authenticate('facebook', { session: false }),
    generateUserToken
);


module.exports = router;