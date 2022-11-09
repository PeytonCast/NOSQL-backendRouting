// User:
//  has many friends
//  has many thoughts

const { Schema, model } = require('mongoose');
const validator = require('validator');
const userData = require('../utils/userdata');

// this is the user schema
// difining what goes into a user
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
        // this is an array with the ids of the schema model
        thoughts: [
            {
                type: Schema.Types.ObjectId,
                ref: 'thoughts',
            }
        ],
        // this is an array with the ids of thoughts schema model
        friends: [
            {
                type: Schema.Types.ObjectId,
                ref: 'users',
            }
        ],

    },
    {
        toJSON: {
          getters: true,
          virtuals: true,
        },
        id: false,
    }
)
userSchema.virtual('friendCount').get(function () {
    return this.friends.length;
  });
const User = model('users', userSchema);

const handleError = (err) => console.error(err);

// Will add data only if collection is empty to prevent duplicates
// More than one document can have the same name value
User.find({}).exec((err, collection) => {
  if (collection.length === 0) {
    User.insertMany(userData,
      (insertErr) => {
        if (insertErr) {
          handleError(insertErr);
        }
      }
    );
  }
});
module.exports = User;