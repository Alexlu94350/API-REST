const mysql = require('mysql');

// Création de la connexion à la base de données
const connection = mysql.createConnection({
  host: 'localhost',
  user: 'root',
  password: 'password',
  database: 'app'
});

// Connexion à la base de données
connection.connect((err) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Connexion à la base de données établie avec succès.');
});

// Exemple de requête SQL pour récupérer des données
connection.query('SELECT * FROM users', (err, rows, fields) => {
  if (err) {
    console.error(err);
    return;
  }
  console.log('Résultats de la requête : ', rows);
});

// Fermeture de la connexion
connection.end();
