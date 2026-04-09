const Feedback = require('../models/Feedback');

exports.submitFeedback = async (req, res) => {
  try {
    const { rating, comments } = req.body;
    const feedback = new Feedback({
      user: req.user.id,
      rating,
      comments,
    });
    await feedback.save();
    res.status(201).json({ success: true, message: 'Feedback submitted successfully', feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

exports.getAllFeedback = async (req, res) => {
  try {
    const feedback = await Feedback.find().populate('user', 'name email');
    res.status(200).json({ success: true, feedback });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
