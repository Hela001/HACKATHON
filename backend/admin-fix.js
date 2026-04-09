const mongoose = require('mongoose');
require('dotenv').config();
const User = require('./models/User');

const email = 'lilia.gossa@esprit.tn';

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );
    if (user) {
      console.log(`✅ SUCCESS: ${user.email} is now an ${user.role}`);
    } else {
      console.log(`❌ ERROR: User ${email} not found`);
    }
    process.exit();
  })
  .catch(err => {
    console.error('❌ CONNECTION ERROR:', err.message);
    process.exit(1);
  });
