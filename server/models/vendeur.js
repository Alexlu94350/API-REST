// Import des modules necessaires
const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Connexion à la base de donnée
const connection = mysql.createConnection({
    host: 'hostname',
    user: 'username',
    password: 'password',
    database: 'database_name'
});
connection.connect();
console.log("Connected to the MYSQL database!");

// Utilisation du body-parser pour lire les données en json
app.use(bodyParser.json());

// Enregistrement des routes pour les vendeurs
app.route('/sellers')
    // Récupère tous les vendeurs
    .get((req, res) => {
        connection.query(`SELECT * FROM sellers`, (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    })
    // Ajoute un nouveau vendeur
    .post((req, res) => {
        let seller = req.body;
        let sql = `INSERT INTO sellers (name, email) VALUES ('${seller.name}', '${seller.email}')`;
        connection.query(sql, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err);
            }
        });
    });

// Enregistrement de route pour un vendeur spécifique
app.route('/sellers/:id')
    // Récupère un vendeur spécifique
    .get((req, res) => {
        connection.query(`SELECT * FROM sellers WHERE id = ${req.params.id}`, (err, rows, fields) => {
            if (!err) {
                res.send(rows);
            } else {
                console.log(err);
            }
        });
    })
    // Met à jour un vendeur spécifique
    .put((req, res) => {
        let seller = req.body;
        let sql = `UPDATE sellers SET name = '${seller.name}', email = '${seller.email}' WHERE id = ${req.params.id}`;
        connection.query(sql, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err);
            }
        });
    })
    // Supprime un vendeur spécifique
    .delete((req, res) => {
        connection.query(`DELETE FROM sellers WHERE id = ${req.params.id}`, (err, result) => {
            if (!err) {
                res.send(result);
            } else {
                console.log(err);
            }
        });
    });

// Ecoute sur un port spécifique
app
