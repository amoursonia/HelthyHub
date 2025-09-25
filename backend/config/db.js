const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST,      // fourni par Railway
  user: process.env.DB_USER,      // fourni par Railway
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
  port: process.env.DB_PORT || 3306,
  ssl: {
    rejectUnauthorized: false,    // ⚡ nécessaire pour Railway
  },
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL:", err);
  } else {
    console.log("✅ Connexion MySQL réussie !");
  }
});

module.exports = db; 