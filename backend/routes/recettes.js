const express = require('express');
const router = express.Router();
const db = require('../config/db');

// Pour créer une recette on a besoin de :
// - Titre de la recette
// - Du lien Youtube de la recette
// - L'adresse mail de l'utilisateur qui créé la recette

// ✅ Créer une nouvelle recette
router.post('/', (req, res) => { // -> /api/recettes
  const { title, video, email } = req.body;

  if (!title || !video || !email) {
    return res.status(400).json({ message: 'Titre, vidéo et email requis' });
  }

  // récupérer l'id utilisateur en base (insensible à la casse)
  db.query('SELECT id FROM users WHERE LOWER(email) = LOWER(?)', [email], (err, results) => {
    if (err) {
      console.error("Erreur SQL:", err);
      return res.status(500).json({ message: 'Erreur DB' });
    }
    if (results.length === 0) {
      console.warn("Utilisateur introuvable pour email:", email);
      return res.status(400).json({ message: 'Utilisateur non trouvé ❌' });
    }

    const userId = results[0].id;

    db.query(
      'INSERT INTO recettes (user_id, title, video) VALUES (?, ?, ?)',
      [userId, title, video],
      (err) => {
        if (err) {
          console.error("Erreur insert:", err);
          return res.status(500).json({ message: 'Erreur lors de l’ajout ❌' });
        }
        res.json({ message: 'Recette ajoutée ✅' });
      }
    );
  });
});

// ✅ récupérer les recettes d’un utilisateur
router.get('/user/:email', (req, res) => { // -> /api/recettes/user/xxx@mail.com
  const { email } = req.params;

  db.query(
    'SELECT r.* FROM recettes r JOIN users u ON r.user_id = u.id WHERE LOWER(u.email) = LOWER(?) ORDER BY r.created_at DESC',
    [email],
    (err, results) => {
      if (err) return res.status(500).json({ message: 'Erreur serveur ❌' });
      res.json(results);
    }
  );
});

// ✅ récupérer toutes les recettes
router.get('/', (req, res) => { // -> /api/recettes
  db.query('SELECT * FROM recettes ORDER BY created_at DESC', (err, results) => {
    if (err) return res.status(500).json({ message: 'Erreur serveur ❌' });
    res.json(results);
  });
});

// ✅ Supprimer une recette
router.delete('/:id', (req, res) => { // -> /api/recettes/12
  const { id } = req.params;
  const { email } = req.body;

  if (!email) {
    return res.status(400).json({ message: "Email requis ❌" });
  }

  // Vérifie que la recette appartient bien à l’utilisateur
  db.query(
    `SELECT r.id 
     FROM recettes r 
     JOIN users u ON r.user_id = u.id 
     WHERE r.id = ? AND LOWER(u.email) = LOWER(?)`,
    [id, email],
    (err, results) => {
      if (err) return res.status(500).json({ message: "Erreur DB ❌" });
      if (results.length === 0) {
        return res.status(403).json({ message: "Vous n’êtes pas autorisé à supprimer cette recette ❌" });
      }

      // Si OK → supprimer la recette
      db.query('DELETE FROM recettes WHERE id = ?', [id], (err) => {
        if (err) return res.status(500).json({ message: "Erreur lors de la suppression ❌" });
        res.json({ message: "Recette supprimée ✅" });
      });
    }
  );
});

// ✅ Modifier le titre d’une recette
router.put('/:id', (req, res) => { // -> /api/recettes/12
  const { id } = req.params;
  const { title, email } = req.body;

  if (!title || !email) {
    return res.status(400).json({ message: 'Titre et email requis ❌' });
  }

  // Vérifie que la recette appartient bien à l’utilisateur
  db.query(
    `UPDATE recettes r
     JOIN users u ON r.user_id = u.id
     SET r.title = ?
     WHERE r.id = ? AND LOWER(u.email) = LOWER(?)`,
    [title, id, email],
    (err, result) => {
      if (err) {
        console.error("Erreur SQL:", err);
        return res.status(500).json({ message: 'Erreur DB ❌' });
      }

      if (result.affectedRows === 0) {
        return res.status(404).json({ message: 'Recette non trouvée ou non autorisée ❌' });
      }

      res.json({ message: 'Recette modifiée avec succès ✅' });
    }
  );
});

module.exports = router;
