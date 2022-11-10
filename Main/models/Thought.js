const { Schema, model } = require('mongoose');

const thoughtSchema = new Schema(
  {
    thoughtText: {
        type: String,
          required: true,
        min_length: 1,
        max_length: 280,
    },
    createdAt: {
      type: Date,
      default: Date.now(),
    },
    createdAt: {
      type: Date.now(),
      get: () => {
        return (
          `This thought created at ${this.createdAt}`
        )
      },
    },
    username: {
      type: String,
      required: true
    },
    reactions: [
      {
        type: Schema.Types.ObjectId,
        ref: 'Reaction',
      },
    ],
  },
  {
    toJSON: {
        getters: true,
        virtuals: true,
    },
  }
);

thoughtSchema
  .virtual('reactionCount')
    .get(() => {
        return this.reactions.length;
  });

const Thought = model('thought', thoughtSchema);

module.exports = Thought