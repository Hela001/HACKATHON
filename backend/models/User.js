const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
  role: {
    type: String,
    enum: ['participant', 'admin'],
    default: 'participant'
  },
  profilePhoto: {
    type: String,
    default: ''
  },
  attended: {
    type: Boolean,
    default: false,
  },
  badgeShared: {
    type: Boolean,
    default: false,
  },
  qrCodeData: {
    type: String,
  },
  teamId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'Team',
  },
  phone: {
    type: String,
  },
  bio: {
    type: String,
  },
  isInvited: {
    type: Boolean,
    default: false,
  }
}, { timestamps: true });

// Pre-save hook to hash password
userSchema.pre('save', async function() {
  if (!this.isModified('password')) return;
  const salt = await bcrypt.genSalt(10);
  this.password = await bcrypt.hash(this.password, salt);
});

// Method to compare passwords
userSchema.methods.comparePassword = async function(candidatePassword) {
  return await bcrypt.compare(candidatePassword, this.password);
};

module.exports = mongoose.model('User', userSchema);
