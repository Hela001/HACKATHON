const mongoose = require('mongoose');

const agendaItemSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true
  },
  startTime: {
    type: String, // HH:mm
    required: true
  },
  endTime: {
    type: String, // HH:mm
    required: true
  },
  section: {
    type: String, // e.g., 'Main Stage', 'Workshop A'
    default: 'Main Stage'
  },
  speakerName: {
    type: String,
    default: ''
  },
  speakerRole: {
    type: String,
    default: ''
  },
  tags: {
    type: [String],
    default: []
  },
  description: {
    type: String,
    default: ''
  },
  date: {
    type: String, // e.g., '2026-04-22'
    required: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});

module.exports = mongoose.model('AgendaItem', agendaItemSchema);
