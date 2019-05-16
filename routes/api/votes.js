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

            if(users.length > 10){
                users = users.slice(0,10);
                res.json(users);
            }else{
                res.json(users);
            }
        
        })
        .catch((err) => console.log(err));
});


// @route   GET api/votes/randUser
// @desc    Geting random user card
//          Do not show already liked or disliked user                  
// @access  Private
router.get('/randUser', passport.authenticate('jwt', {session: false}), (req, res) => {

    const user_id = req.user.id;

    User.find()
        .then((users) => {

            // Filtering on the basis of likes and dislikes

            var randUserArray = users.filter((user) => {
                if(user.likes.includes(user_id) || user.dislikes.includes(user_id)) {
                    return false;
                }else{
                    return true;
                }
            })
            
            
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


// @route   POST api/votes/like
// @desc    For liking the User Given
// @access  Private
router.post('/like', passport.authenticate('jwt', {session: false}), (req, res) => {

    const like_id = req.body.id;
    const user_id = req.user.id;

    User.findById({_id :like_id})
        .then( user => {
            // Add user id to likes array
            user.likes.push(user_id);

            user.save().then(() => res.json({success: true}));
        })
        .catch(err => console.log(err));
});

// @route   POST api/votes/dislike
// @desc    For disliking the User Given
// @access  Private
router.post('/dislike', passport.authenticate('jwt', {session: false}), (req, res) => {

    const dislike_id = req.body.id;
    const user_id = req.user.id;

    User.findById({_id : dislike_id})
        .then( user => {
            // Add user id to dislikes array
            user.dislikes.push(user_id)

            user.save().then(() => res.json({success: true}));
        })
        .catch(err => console.log(err));
});


module.exports = router;