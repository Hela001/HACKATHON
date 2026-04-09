const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });
const User = require('./backend/models/User');

const email = 'lilia.gossa@esprit.tn';

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const user = await User.findOne({ email });
    if (!user) {
      console.log('USER_NOT_FOUND');
    } else {
      console.log('USER_ROLE:' + user.role);
      if (user.role !== 'admin') {
        user.role = 'admin';
        await user.save();
        console.log('ACTION:PROMOTED_TO_ADMIN');
      }
    }
    process.exit();
  })
  .catch(err => {
    console.error('ERROR:' + err.message);
    process.exit(1);
  });
