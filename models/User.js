const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// User Schema
const UserSchema = new Schema({
    fbId: {
        type:String
    },
    name: {
        type: String,
    },
    email: {
        type: String
    },
    info: {
        type: String
    },
    imageURL: {
        type: String
    },
    imageID: {
        type: String
    },
    likes: [
        {
            id: {
                type: String
            }
        }
    ],
    dislikes: [
        {
            id: {
                type: String
            }
        }
    ]
});

module.exports = User = mongoose.model('users', UserSchema);