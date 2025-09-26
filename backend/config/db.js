const mysql = require("mysql2");

const db = mysql.createConnection({
  host: process.env.DB_HOST || "localhost",
  port: process.env.DB_PORT || 3306,
  user: process.env.DB_USER || "root",
  password: process.env.DB_PASSWORD || "Root",
  database: process.env.DB_NAME || "mon_projet",
  multipleStatements: true
});

db.connect((err) => {
  if (err) {
    console.error("❌ Erreur de connexion MySQL:", err);
  } else {
    console.log("✅ Connexion MySQL réussie !");
  }
});

module.exports = db; 