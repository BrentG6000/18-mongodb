const User = require('../models/User');
const Thought = require('../models/Thought');

module.exports = {
  // Get all users
    getUsers(req, res) {
        User.find()
        .then((users) => res.json(users))
        .catch((err) => res.status(500).json(err));
    },
    
  // Get a course
    getSingleUser(req, res) {
        User.findOne({ _id: req.params.userId })
        .select('-__v')
        .then((user) =>
            !user
            ? res.status(404).json({ message: 'No user with that ID' })
            : res.json(user)
        )
        .catch((err) => res.status(500).json(err));
     },
  // Create a course
  createUser(req, res) {
    console.log(req.body)
    User.create(req.body)
      .then((user) => {

        res.json(user)
      })
      .catch((err) => {
       
        console.log(err);
        return res.status(500).json(err);
      });
  },
  // Delete a course
  deleteUser(req, res) {
    User.findOneAndDelete({ _id: req.params.userId })
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with that ID' })
          : Thought.deleteMany({ _id: { $in: user.thoughts } })
      )
      .then(() => res.json({ message: 'User and thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
  updateUser(req, res) {
    User.findOneAndUpdate(
      { _id: req.params.userId },
      { $set: req.body },
      { runValidators: true, new: true }
    )
      .then((user) =>
        !user
          ? res.status(404).json({ message: 'No user with this id!' })
          : res.json(user)
      )
      .catch((err) => res.status(500).json(err));
  },

  addFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        let newFriends = []
        if (user.friends != null) {
          newFriends = user.friends;
        }
        newFriends.push(req.params.friendId)
        //console.log(newThoughts)
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { friends: newFriends },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      })
  },

  deleteFriend(req, res) {
    User.findOne({ _id: req.params.userId })
      .then((user) => {
        let newFriends = []
        if (user.friends != null) {
          newFriends = user.friends;
        }
        newFriends.pop(req.params.friendId)
        //console.log(newThoughts)
        User.findOneAndUpdate(
          { _id: req.params.userId },
          { friends: newFriends },
          { runValidators: true, new: true }
        )
          .then((user) =>
            !user
              ? res.status(404).json({ message: 'No user with this id!' })
              : res.json(user)
          )
          .catch((err) => res.status(500).json(err));
      })
  }
};
