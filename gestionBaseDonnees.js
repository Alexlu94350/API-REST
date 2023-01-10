const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const mysql = require('mysql2');

// Connexion avec la base de donnée
const connection = mysql.createConnection({
    host: 'hostname',
    user: 'username',
    password: 'password',
    database: 'database_name'
});
connection.connect();
console.log("Connected to the MYSQL database!");

app.use(bodyParser.json());

// Route pour ajouter un élément
app.post('/item', (req, res) => {
    let item = req.body;
    let sql = `INSERT INTO items (name, description) VALUES ('${item.name}', '${item.description}')`;
    connection.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

// Route pour mettre à jour un élément
app.put('/item/:id', (req, res) => {
    let item = req.body;
    let sql = `UPDATE items SET name = '${item.name}', description = '${item.description}' WHERE id = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (!err) {
            res.send(result);
        } else {
            console.log(err);
        }
    });
});

// Route pour supprimer un élément
app.delete('/item/:id', (req, res) => {
    let sql = `DELETE FROM items WHERE id = ${req.params.id}`;
    connection.query(sql, (err, result) => {
        if (!err) {
         res.send(result);
        } 
        else {
console.log(err);
}
});
});

//Démarrage du serveur
const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
console.log(Server is running on port ${PORT}.);
});
        
