import Idea from '../models/Idea.js';

export const createIdea = async (req, res) => {
  try {
    const { title, description } = req.body;
    const idea = await Idea.create({
      userId: req.user._id,
      title,
      description
    });
    res.status(201).json(idea);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find().populate('userId', 'name email').sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const getUserIdeas = async (req, res) => {
  try {
    const ideas = await Idea.find({ userId: req.user._id }).sort({ createdAt: -1 });
    res.json(ideas);
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};

export const deleteIdea = async (req, res) => {
  try {
    const idea = await Idea.findById(req.params.id);
    if (!idea) return res.status(404).json({ message: 'Idea not found' });
    
    await idea.deleteOne();
    res.json({ message: 'Idea removed' });
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
};
