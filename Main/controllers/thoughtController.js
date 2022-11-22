const Thought = require('../models/Thought');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

module.exports = {
  // Get all courses
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
  // Get a course
    getSingleThought(req, res) {
        Thought.findOne({ _id: req.params.thoughtId })
        .select('-__v')
        .then((thought) =>
            !thought
            ? res.status(404).json({ message: 'No thought with that ID' })
            : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
     },
  // Create a course
//   createThought(req, res) {
//     Thought.create(req.body)
//       .then((thought) => res.json(thought))
//       .catch((err) => {
//         console.log(err);
//         return res.status(500).json(err);
//       });
//   },
    
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                //res.json(thought)
                User.findOne({ username: req.body.username })
                    .then((user) => {
                        //console.log(user.username)
                        let newThoughts = []
                        //console.log(user.thoughts)
                        if (user.thoughts != null) {
                            newThoughts = user.thoughts;
                        }
                        //console.log(newThoughts)
                        newThoughts.push(thought._id)
                        console.log(newThoughts)
                        User.findOneAndUpdate(
                            { username: req.body.username },
                            { thoughts: newThoughts },
                            { runValidators: true, new: true }
                        ).then((user) =>
                            !user
                                ? res.status(404).json({ message: 'No user with this id!' })
                                : res.json(thought)
                        )
                    })
                    .catch((err) => {
                        console.log(err);
                        return res.status(500).json(err);;
                
                
            })
        // .catch((err) => {
        //     console.log(err);
        //     return res.status(500).json(err);
        });
    },
  // Delete a course
  deleteThought(req, res) {
    Thought.findOneAndDelete({ _id: req.params.thoughtId })
        .then((thought) => {
            if (!thought) {
                res.status(404).json({ message: 'No thought with that ID' });
            }
        }
      )
      .then(() => res.json({ message: 'Thoughts deleted!' }))
      .catch((err) => res.status(500).json(err));
  },
  // Update a course
    updateThought(req, res) {
        Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $set: req.body },
        { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
                ? res.status(404).json({ message: 'No thought with this id!' })
                : res.json(thought)
        )
        .catch((err) => res.status(500).json(err));
    },
  
    createReaction(req, res) {
        Reaction.create(req.body)
        .then((reaction) => {
            Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $set: req.body },
            { runValidators: true, new: true }
            )
            .then((thought) =>
                !thought
                    ? res.status(404).json({ message: 'No thought with this id!' })
                    : res.json(thought)
            )
            .catch((err) => res.status(500).json(err));
        })
    },

    deleteReaction(req, res) {
        Reactiont.findOneAndDelete({ _id: req.params.reactionId })
        .then((reaction) => {
            if (!reaction) {
                res.status(404).json({ message: 'No reaction with that ID' });
            }
        }
      )
      .then(() => res.json({ message: 'Reaction deleted!' }))
      .catch((err) => res.status(500).json(err));
    }
};
