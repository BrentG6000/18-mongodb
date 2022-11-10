const { Schema, model } = require('mongoose');

const reactionSchema = new Schema(
  {
    reactionId: {
        type: Schema.Types.ObjectId,
        default: new Schema.Types.ObjectId,
    },
    reactionBody: {
        type: String,
        required: true,
        max_length: 280,
    },
    username: {
      type: String,
      required: true,
    },
    createdAt: {
      type: Date,
        default: Date.now(),
      get: () => {
        return (
          `This reaction created at ${this.createdAt}`
        )
      },
    }
  },
  {
    toJSON: {
        getters: true
    },
  }
);

const Reaction = model('reaction', reactionSchema);

module.exports = Reaction