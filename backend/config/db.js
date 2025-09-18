const mysql = require('mysql2');

const db = mysql.createConnection({
  host: 'localhost',
  user: 'root',         // ton utilisateur MySQL
  password: 'Root', // ton mot de passe MySQL
  database: 'mon_projet'
});

db.connect((err) => {
  if (err) throw err;
  console.log('✅ Connecté à MySQL');
});

module.exports = db;
