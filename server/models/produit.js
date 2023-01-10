const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const Sequelize = require('sequelize');

// Connexion à la base de donnée
const sequelize = new Sequelize('database', 'username', 'password', {
  host: 'hostname',
  dialect: 'mysql'
});

//Définir le modèle de donnée pour les produits
const Product = sequelize.define('product', {
  id: {
    type: Sequelize.INTEGER,
    primaryKey: true,
    autoIncrement: true
  },
  name: {
    type: Sequelize.STRING,
    allowNull: false
  },
  price: {
    type: Sequelize.DECIMAL(10, 2),
    allowNull: false
  }
});

app.use(bodyParser.json());

// route pour récupérer tous les produits
app.get('/products', (req, res) => {
  Product.findAll().then(products => {
    res.send(products);
  });
});

// route pour ajouter un produit
app.post('/product', (req, res) => {
  const product = req.body;
  Product.create(product).then(() => {
    res.send(product);
  }).catch(err => {
    console.log(err);
  });
});

// route pour mettre à jour un produit
app.put('/product/:id', (req, res) => {
  const product = req.body;
  Product.update(product, {
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send(product);
  }).catch(err => {
    console.log(err);
  });
});

// route pour supprimer un produit
app.delete('/product/:id', (req, res) => {
  Product.destroy({
    where: {
      id: req.params.id
    }
  }).then(() => {
    res.send({message: "Product deleted"});
  }).catch(err => {
    console.log(err);
  });
});

//Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () =>
