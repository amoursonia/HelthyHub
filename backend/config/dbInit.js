const db = require("./db");

// ✅ Fonction pour créer les tables si elles n’existent pas
const initDB = async () => {
  try {
    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS users (
        id INT AUTO_INCREMENT PRIMARY KEY,
        first_name VARCHAR(100),
        last_name VARCHAR(100),
        email VARCHAR(255) NOT NULL UNIQUE,
        dob DATE,
        password VARCHAR(255) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP
      )
    `);
    console.log("✅ Table 'users' prête");

    await db.promise().query(`
      CREATE TABLE IF NOT EXISTS recettes (
        id INT AUTO_INCREMENT PRIMARY KEY,
        user_id INT,
        title VARCHAR(255) NOT NULL,
        video VARCHAR(500) NOT NULL,
        created_at TIMESTAMP DEFAULT CURRENT_TIMESTAMP,
        FOREIGN KEY (user_id) REFERENCES users(id) ON DELETE SET NULL
      )
    `);
    console.log("✅ Table 'recettes' prête");
  } catch (err) {
    console.error("❌ Erreur création des tables :", err);
  }
};

module.exports = initDB; 