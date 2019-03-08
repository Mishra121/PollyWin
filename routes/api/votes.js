const express = require('express');
const router = express.Router();
const passport = require('passport');

// Load User Model
const User = require('../../models/User');

// @route   GET api/votes/rankings
// @desc    Geting all user rankings based on like and dislike
//          | like +5 points dislike -5 points |
// @access  Private
router.get('/rankings', (req, res) => {

    User.find()
        .then(users => {
            users.sort((a, b) => {
                return ((b.likes.length * 5) - (b.dislikes.length * 3)) 
                    - ((a.likes.length * 5) - (a.dislikes.length * 3));
            })

            // var rankedUsers = users.sort((a, b) => {return b.score - a.score});
            res.json(users);
        })
        .catch((err) => console.log(err));
});


// @route   GET api/votes/randUser
// @desc    Geting random user card
//          Do not show already liked or disliked user                  
// @access  Private
router.get('/randUser', passport.authenticate('jwt', {session: false}), (req, res) => {

    User.find()
        .then((users) => {
            // Filtering on the basis of likes and dislikes
            const  randUserArray = users.filter(user => (user.likes.length) == 0 || (user.dislikes.length) == 0 );
            // Finding a random user
            const randUserDetails = randUserArray[Math.floor(Math.random() * randUserArray.length)];

            const randUser = {
                id: randUserDetails._id,
                name: randUserDetails.name,
                info: randUserDetails.info,
                imageURL: randUserDetails.imageURL
            }

            res.json({randUser});
        })
        .catch((err) => console.log(err));
});


// @route   POST api/votes/like/:id
// @desc    For liking the User Given
// @access  Private
router.post('/like/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const like_id = req.params.id;
    const user_id = req.user.id;

    User.findById({_id :like_id})
        .then( user => {
            // Add user id to likes array
            user.likes.unshift({ id: user_id})

            user.save().then(() => res.json({success: true}));
        })
        .catch(err => console.log(err));
});

// @route   POST api/votes/dislike/:id
// @desc    For disliking the User Given
// @access  Private
router.post('/dislike/:id', passport.authenticate('jwt', {session: false}), (req, res) => {

    const dislike_id = req.params.id;
    const user_id = req.user.id;

    User.findById({_id : dislike_id})
        .then( user => {
            // Add user id to dislikes array
            user.dislikes.unshift({ id: user_id})

            user.save().then(() => res.json({success: true}));
        })
        .catch(err => console.log(err));
});


module.exports = router;