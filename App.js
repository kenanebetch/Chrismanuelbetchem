const express = require('express');
const app = express();

// Important : ceci permet à ton code de lire les données envoyées par Meta
app.use(express.json());

// --- LE CODE POUR META COMMENCE ICI ---

// Cette partie sert à la VÉRIFICATION (le bouton "Vérifier" sur Meta)
app.get('/webhook', (req, res) => {
  // Tu pourras changer "mon_code_secret" par ce que tu veux plus tard
  const VERIFY_TOKEN = "mon_code_secret"; 

  const mode = req.query['hub.mode'];
  const token = req.query['hub.verify_token'];
  const challenge = req.query['hub.challenge'];

  if (mode === 'subscribe' && token === VERIFY_TOKEN) {
    console.log('Lien validé par Meta !');
    res.status(200).send(challenge);
  } else {
    res.sendStatus(403);
  }
});

// Cette partie servira à RECEVOIR les messages plus tard
app.post('/webhook', (req, res) => {
  console.log('Données reçues :', req.body);
  res.sendStatus(200);
});

// --- LE CODE POUR META TERMINE ICI ---

// Ton message d'accueil pour vérifier que le site marche
app.get('/', (req, res) => {
  res.send('Le serveur de mon projet est en ligne !');
});

// Le port pour Render (ne change pas cette partie)
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Serveur prêt sur le port ${PORT}`);
});

