const mongoose = require('mongoose');

const sessionSchema = new mongoose.Schema({
  time: String,
  title: String,
  speakers: [String],
  description: String,
});

const eventSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
    default: 'Carbo°RESET 2026',
  },
  date: {
    type: Date,
    default: new Date('2026-04-22'),
  },
  location: {
    type: String,
    default: 'ESPRIT',
  },
  programme: [sessionSchema],
}, { timestamps: true });

module.exports = mongoose.model('Event', eventSchema);
