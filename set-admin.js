const mongoose = require('mongoose');
require('dotenv').config({ path: './backend/.env' });
const User = require('./backend/models/User');

const email = 'lilia.gossa@esprit.tn';

console.log('⏳ Connexion à la base de données...');

mongoose.connect(process.env.MONGODB_URI)
  .then(async () => {
    const user = await User.findOneAndUpdate(
      { email: email },
      { role: 'admin' },
      { new: true }
    );
    if (user) {
      console.log(`\n✅ Succès ! Le compte ${email} est désormais ADMINISTRATEUR.`);
      console.log(`   Rôle actuel : ${user.role}`);
    } else {
      console.log(`\n❌ Erreur : Aucun utilisateur trouvé avec l'email "${email}".`);
      console.log(`   Assurez-vous d'avoir d'abord créé un compte avec cet email sur le site.`);
    }
    process.exit();
  })
  .catch(err => {
    console.error('\n❌ Erreur de connexion MongoDB :', err.message);
    process.exit(1);
  });
