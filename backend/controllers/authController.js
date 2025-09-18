// controllers/authController.js
const db = require('../config/db');
const bcrypt = require('bcrypt');
const jwt = require('jsonwebtoken');

exports.register = async (req, res) => {
  const { firstName, lastName, email, dob, password } = req.body;

  // Vérifier si l’email existe déjà
  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, result) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (result.length > 0) {
      return res.status(400).json({ message: "Email déjà utilisé" });
    }

    // Hachage du mot de passe
    const hashedPassword = await bcrypt.hash(password, 10); // base 10

    // Insérer en base
    db.query(
      "INSERT INTO users (first_name, last_name, email, dob, password) VALUES (?, ?, ?, ?, ?)",
      [firstName, lastName, email, dob, hashedPassword],
      (err, result) => {
        if (err) return res.status(500).json({ message: "Erreur lors de l'inscription" });
        res.json({ message: "Inscription réussie ✅" });
      }
    );
  });
};

exports.login = (req, res) => {
  const { email, password } = req.body;

  db.query("SELECT * FROM users WHERE email = ?", [email], async (err, results) => {
    if (err) return res.status(500).json({ message: "Erreur serveur" });
    if (results.length === 0) {
      return res.status(400).json({ message: "Utilisateur introuvable" });
    }

    const user = results[0];
    const isMatch = await bcrypt.compare(password, user.password);

    if (!isMatch) {
      return res.status(400).json({ message: "Mot de passe incorrect" });
    }

    // Générer un token JWT
    const token = jwt.sign({ id: user.id, email: user.email }, "SECRET123", { expiresIn: "1h" });

    res.json({ message: "Connexion réussie ✅", token });
  });
};
