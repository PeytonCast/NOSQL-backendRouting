// Thought:
const { Schema, model } = require('mongoose');
const reactionsSchema = require('./reaction');

const thoughtsSchema = new Schema({
    thoughtText: {
     type: String, 
     required: true,
     min_length:1,
     max_length:280
    },
    createdAt: {
        type: Date, 
        default: Date.now
        // Use a getter method to format the timestamp on query
    },
    // the user who posted will be filled in here
    username: {
        type: String, 
        required: true,
    },
    reactions: [reactionsSchema]
},
{
    toJSON: {
      virtuals: true,
      getters: true,
    },
  })

const Thoughts = model('thoughts', thoughtsSchema)

module.exports = Thoughts