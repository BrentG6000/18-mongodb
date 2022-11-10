const { Schema, model } = require('mongoose');

const userSchema = new Schema(
  {
    username: {
        type: String,
        unique: true,
        required: true,
        trimmed: true
    },
    email: {
        type: String,
        required: true,
        unique: true,
        validate: {
            validator: (v) => {
                return /^([a-z0-9_\.-]+)@([a-z0-9]+)\.([a-z]{2,6})$/.test(v);
            },
            message: props => `${props.value} is not a valid email!`
            }
    },
    thoughts: [
        {
            type: Schema.Types.ObjectId,
            ref: 'Thought',
        },
    ],
    friends: [
        {
            type: Schema.Types.ObjectId,
            ref: 'User',
        },
    ]
  },
  {
    toJSON: {
        getters: true,
        virtuals: true,
    },
  }
);

userSchema
  .virtual('friendCount')
    .get(() => {
        return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User