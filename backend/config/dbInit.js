const db = require('./db');

// ✅ Fonction pour créer les tables si elles n’existent pas
const initDB = () => {
  // Table users
  db.query(`
    CREATE TABLE IF NOT EXISTS users (
      id INT AUTO_INCREMENT PRIMARY KEY,
      first_name VARCHAR(100),
      last_name VARCHAR(100),
      email VARCHAR(255) NOT NULL UNIQUE,
      dob DATE,
      password VARCHAR(255) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
    )
  `, (err) => {
    if (err) console.error("Erreur création table users:", err);
    else console.log("✅ Table 'users' prête");
  });

  // Table recettes
  db.query(`
    CREATE TABLE IF NOT EXISTS recettes (
      id INT AUTO_INCREMENT PRIMARY KEY,
      user_id INT,
      title VARCHAR(255) NOT NULL,
      video VARCHAR(500) NOT NULL,
      created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
      FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
    )
  `, (err) => {
    if (err) console.error("Erreur création table recettes:", err);
    else console.log("✅ Table 'recettes' prête");
  });
};

module.exports = initDB;
