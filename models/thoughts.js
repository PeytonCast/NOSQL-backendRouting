// Thought:
const { Schema, model } = require('mongoose');
const reactionsSchema = require('./Reaction');

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
thoughtsSchema.virtual('reactionCount').get(function () {
    return this.reactions.length;
  });
thoughtsSchema.virtual('formatDate').get(function () {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${
        new Date(this.createdAt).getFullYear()
  }`;})
const Thoughts = model('Thoughts', thoughtsSchema)

module.exports = Thoughts