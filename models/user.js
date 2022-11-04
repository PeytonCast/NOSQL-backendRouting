// User:
//  has many friends
//  has many thoughts

const { Schema, model } = require('mongoose');
const validator = require('validator');


const userSchema = new Schema(
    {
        username: {
            type: String,
            required: true,
            unique: true,
            trim: true,
        },
        email: {
            type: String,
            trim: true,
            lowercase: true,
            unique: true,
            required: true,
            validate: [ validator.isEmail, 'email is invalid']
            
        },
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            }
        ],
        friends: [
            {
            type: Schema.Types.ObjectId,
            ref: 'users',
            }
        ],

    },
    // {
    //     toJSON: {
    //       getters: true,
    //     },
    // }
)
const User = model('users', userSchema);

module.exports = User;