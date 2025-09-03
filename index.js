const express = require('express');
const bodyParser = require('body-parser');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

let recettes = [];

app.post('/recettes', (req, res) => {
  const { titre, ingredients, instructions } = req.body;
  const nouvelleRecette = { id: recettes.length + 1, titre, ingredients, instructions };
  recettes.push(nouvelleRecette);
  res.status(201).json(nouvelleRecette);
});

app.get('/recettes', (req, res) => {
  res.json(recettes);
});

app.get('/recettes/:id', (req, res) => {
  const { id } = req.params;
  const recetteTrouvee = recettes.find(recette => recette.id === parseInt(id));
  if (!recetteTrouvee) return res.status(404).send('Recette non trouvée');
  res.json(recetteTrouvee);
});

app.put('/recettes/:id', (req, res) => {
  const { id } = req.params;
  const { titre, ingredients, instructions } = req.body;
  const recetteIndex = recettes.findIndex(recette => recette.id === parseInt(id));
  if (recetteIndex === -1) return res.status(404).send('Recette non trouvée');
  recettes[recetteIndex] = { id: parseInt(id), titre, ingredients, instructions };
  res.json(recettes[recetteIndex]);
});

app.delete('/recettes/:id', (req, res) => {
  const { id } = req.params;
  const recetteIndex = recettes.findIndex(recette => recette.id === parseInt(id));
  if (recetteIndex === -1) return res.status(404).send('Recette non trouvée');
  recettes.splice(recetteIndex, 1);
  res.status(204).send();
});

app.listen(PORT, () => {
  console.log(`Serveur en écoute sur le port ${PORT}`);
});