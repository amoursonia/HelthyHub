/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MesRecettes = () => {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [message, setMessage] = useState('');
  const [recettes, setRecettes] = useState([]);

  // États pour modification
  const [editId, setEditId] = useState(null);
  const [editTitle, setEditTitle] = useState('');

  const email = localStorage.getItem('email'); // Email utilisateur connecté

  // Transformer automatiquement les liens YouTube en /embed/
  const transformYoutubeUrl = (url) => {
    const match = url.match(/(?:v=|\.be\/)([a-zA-Z0-9_-]{11})/);
    return match ? `https://www.youtube.com/embed/${match[1]}` : url;
  };

  useEffect(() => {
    if (email) fetchMesRecettes();
  }, [email]);

  // Récupérer les recettes de l'utilisateur
  const fetchMesRecettes = async () => {
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const res = await axios.get(
        `${baseURL}/api/recettes/user/${encodeURIComponent(email)}`
      );
      setRecettes(res.data);
    } catch (err) {
      console.error('Erreur récupération recettes utilisateur:', err);
    }
  };

  // Ajouter une nouvelle recette
  const handleSubmit = async (e) => {
    e.preventDefault();
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const embedUrl = transformYoutubeUrl(video);
      const res = await axios.post(`${baseURL}/api/recettes`, {
        title,
        video: embedUrl,
        email
      });

      setMessage(res.data.message);
      setTitle('');
      setVideo('');
      fetchMesRecettes();
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de l’ajout ❌');
    }
  };

  // Supprimer une recette
  const handleDelete = async (id) => {
    if (!window.confirm('Voulez-vous vraiment supprimer cette recette ?')) return;
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const res = await axios.delete(`${baseURL}/api/recettes/${id}`, {
        data: { email }
      });
      setRecettes(recettes.filter((recette) => recette.id !== id));
      setMessage(res.data.message || 'Recette supprimée ✅');
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
      setMessage(err.response?.data?.message || 'Erreur lors de la suppression ❌');
    }
  };

  // Démarrer la modification
  const startEdit = (recette) => {
    setEditId(recette.id);
    setEditTitle(recette.title);
  };

  // Annuler la modification
  const cancelEdit = () => {
    setEditId(null);
    setEditTitle('');
  };

  // Sauvegarder la modification
  const saveEdit = async (id) => {
    const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
    try {
      const res = await axios.put(`${baseURL}/api/recettes/${id}`, {
        title: editTitle,
        email
      });
      setMessage(res.data.message);
      setEditId(null);
      setEditTitle('');
      fetchMesRecettes(); // rafraîchit la liste
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur lors de la modification ❌');
    }
  };

  return (
    <div className="container mt-5">
      <div className="row justify-content-center">
        <div className="col-md-8">

          <h1 className="mb-4 text-center">Nouvelle recette</h1>

          <form onSubmit={handleSubmit} className="mb-5">
            <div className="mb-3">
              <label className="form-label">Titre de la recette</label>
              <input
                type="text"
                className="form-control"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                required
              />
            </div>

            <div className="mb-3">
              <label className="form-label">Lien YouTube</label>
              <input
                type="text"
                className="form-control"
                value={video}
                onChange={(e) => setVideo(e.target.value)}
                required
              />
            </div>

            <button type="submit" className="btn btn-success w-100">
              ➕ Ajouter ma recette
            </button>
          </form>

          {message && (
            <div className="alert alert-info text-center">{message}</div>
          )}

          <h2 className="mt-5 mb-4 text-center">Mes recettes enregistrées</h2>
          <div className="mes-recettes-list">
            {recettes.length > 0 ? (
              recettes.map((recette) => (
                <div key={recette.id} className="mb-5 video-card">
                  <iframe
                    width="100%"
                    height="300px"
                    src={recette.video}
                    title={recette.title}
                    allowFullScreen
                  ></iframe>

                  {/* Titre ou champ d'édition */}
                  {editId === recette.id ? (
                    <input
                      type="text"
                      className="form-control mt-3"
                      value={editTitle}
                      onChange={(e) => setEditTitle(e.target.value)}
                    />
                  ) : (
                    <h3 className="mt-3">{recette.title}</h3>
                  )}

                  {/* Boutons */}
                  {editId === recette.id ? (
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      <button
                        className="btn btn-primary"
                        onClick={() => saveEdit(recette.id)}
                      >
                        💾 Sauvegarder
                      </button>
                      <button
                        className="btn btn-secondary"
                        onClick={cancelEdit}
                      >
                        ❌ Annuler
                      </button>
                    </div>
                  ) : (
                    <div className="d-flex justify-content-center gap-2 mt-2">
                      <button
                        className="btn btn-danger"
                        onClick={() => handleDelete(recette.id)}
                      >
                        Supprimer
                      </button>
                      <button
                        className="btn btn-warning"
                        onClick={() => startEdit(recette)}
                      >
                        Modifier
                      </button>
                    </div>
                  )}
                </div>
              ))
            ) : (
              <p className="text-center">
                Aucune recette enregistrée pour le moment.
              </p>
            )}
          </div>

        </div>
      </div>
    </div>
  );
};

export default MesRecettes;
