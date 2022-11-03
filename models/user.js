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
        thoughts: [// Array of _id values referencing the Thought model
        ],
        friends: [// Array of _id values referencing the friends model
        ],

    },
    {
        toJSON: {
          getters: true,
        },
    }
)
const User = model('user', userSchema);

module.exports = User;