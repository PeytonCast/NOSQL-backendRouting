// reactions (These are like replies)
// Array of nested documents created with the reactionSchema
const { Schema } = require('mongoose');

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
  })

module.exports = reactionsSchema