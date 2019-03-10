const express = require('express');
const router = express.Router();
const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const keys = require('../../config/key');
const passport = require('passport');

//Image upload libraries used
const multer = require("multer");
const cloudinary = require("cloudinary");
const cloudinaryStorage = require("multer-storage-cloudinary");
/*****************************/

// Cloudinary and multer configuration
cloudinary.config({
    cloud_name: keys.cloudName,
    api_key: keys.cloudKey,
    api_secret: keys.cloudSecret
});

const storage = cloudinaryStorage({
    cloudinary: cloudinary,
    folder: "pollywinUsers",
    allowedFormats: ["jpg", "png"],
    transformation: [{ width: 500, height: 500, crop: "limit" }]
});

// Middleware for using image upload
const parser = multer({ storage: storage });

// TODO: move this errors obj to validations
const errors = {};

// Load User Model
const User = require('../../models/User');


// @route   GET api/users/current
// @desc    Return current user
// @access  Private
router.get('/current', passport.authenticate('jwt', {session: false}), (req, res) => {
    res.json({
        id: req.user.id,
        name: req.user.name,
        info: req.user.info,
        imageURL: req.user.imageURL,
        imageID: req.user.imageID       
    });
});

// @route   POST api/users/edit/details
// @desc    Updating details of user.
// @access  Private
router.post('/edit/details', passport.authenticate('jwt', {session: false}), (req, res) => {
    
    var query = { _id: req.user.id };
    var update = { $set: req.body };
    var options = { new: true};

    User.findOneAndUpdate(query, update, options, function(err, user){
        
        if(err) {
            console.log(err);
        }

        const payload = {
            id: user.id,
            name: user.name,
            info: user.info,
            imageURL: user.imageURL,
            imageID: user.imageID
        }

        return res.json(payload);
    });
    
});

// @route   POST api/users/edit/image
// @desc    Updating details of user.
// @access  Private
router.post('/edit/image', parser.single("image"), passport.authenticate('jwt', {session: false}), (req, res) => {
    const id = req.user.id;
    const imageURL =  req.file.url;
    const imageID = req.file.public_id;

    // logic for deleting previous updated pic from cloudinary
    const imageIDtoDelete = req.user.imageID;
    if(imageIDtoDelete) {
        cloudinary.uploader.destroy(imageIDtoDelete);
    }

    User.findByIdAndUpdate(id, {imageURL, imageID})
        .then(user => {
            return res.json({success: true});
        })
        .catch(err => console.error(err));
});


module.exports = router;