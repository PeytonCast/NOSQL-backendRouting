// reactions (These are like replies)
// Array of nested documents created with the reactionSchema
const { Schema, Types} = require('mongoose');

const reactionsSchema = new Schema({
    reactionId: {
        type: Schema.Types.ObjectId,
        default: () => new Types.ObjectId()
    },
    reactionBody: {
        type: String, 
        required: true,
        max_length:280
    },
    // user name of the reactor/commenter 
    username: {
        type: String, 
        required: true,
    },
    createdAt: {
        type: Date, 
        default: Date.now
        // Use a getter method to format the timestamp on query
    },
   
},
{
    toJSON: {
      getters: true,
    },
    id: false,
    _id: false
  })
  reactionsSchema.virtual('formatDate').get(function () {
    return `${new Date(this.createdAt).getMonth() + 1}/${new Date(this.createdAt).getDate()}/${
        new Date(this.createdAt).getFullYear()
      }`;
  });
module.exports = reactionsSchema