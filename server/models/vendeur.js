const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// Connexion à la base de donnée
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'hostname',
  dialect: 'mysql'
});

//Définir le modèle de donnée pour les vendeurs
const Seller = sequelize.define('seller', {
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  email: {
    type: Sequelize.STRING,
    allowNull: false
  }
});

app.use(bodyParser.json());

// route pour récupérer tous les vendeurs
app.get('/sellers', (req, res) => {
  Seller.findAll().then(sellers => {
    res.send(sellers);
  });
});

// route pour ajouter un vendeur
app.post('/seller', (req, res) => {
  const seller = req.body;
  Seller.create(seller).then(() => {
    res.send(seller);
  }).catch(err => {
    console.log(err);
  });
});

// route pour mettre à jour un vendeur
app.put('/seller/:id', (req, res) => {
  const seller = req.body;
  Seller.update(seller, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send(seller);
  }).catch(err => {
    console.log(err);
  });
});

// route pour supprimer un vendeur
app.delete('/seller/:id', (req, res) => {
  Seller.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({message: "Seller deleted"});
  }).catch(err => {
    console.log(err);
  });
});

//Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`);
});
