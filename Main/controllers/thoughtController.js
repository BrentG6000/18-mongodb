const Thought = require('../models/Thought');
const User = require('../models/User');
const Reaction = require('../models/Reaction');

module.exports = {
    // Get all thoughts
    getThoughts(req, res) {
        Thought.find()
        .then((thoughts) => res.json(thoughts))
        .catch((err) => res.status(500).json(err));
    },
    
    // Get a thought
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
    
    // Create a thought
    createThought(req, res) {
        Thought.create(req.body)
            .then((thought) => {
                User.findOne({ username: req.body.username })
                    .then((user) => {
                        let newThoughts = []
                        if (user.thoughts != null) {
                            newThoughts = user.thoughts;
                        }
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
        });
    },

    // Delete a thought  
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
  
    // Update a thought
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
  
    // Create a reaction
    createReaction(req, res) {
        Thought.findOneAndUpdate(
            { _id: req.params.thoughtId },
            { $addToSet: { reactions: req.body } },
            { runValidators: true, new: true }
        )
        .then((thought) =>
            !thought
              ? res.status(404).json({ message: 'No thought with this id!' })
              : res.json(thought)
        )
        .catch((err) => res.status(500).json(err)); 
    },

    // Delete a reaction
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
