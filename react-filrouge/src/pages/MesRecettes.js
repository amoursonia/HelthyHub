/* eslint-disable */
import React, { useState, useEffect } from 'react';
import axios from 'axios';

const MesRecettes = () => {
  const [title, setTitle] = useState('');
  const [video, setVideo] = useState('');
  const [message, setMessage] = useState('');
  const [recettes, setRecettes] = useState([]);

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
    try {
      const res = await axios.get(
        `http://localhost:5000/api/recettes/user/${encodeURIComponent(email)}`
      );
      setRecettes(res.data);
    } catch (err) {
      console.error('Erreur récupération recettes utilisateur:', err);
    }
  };

  // Ajouter une nouvelle recette
  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const embedUrl = transformYoutubeUrl(video);
      const res = await axios.post('http://localhost:5000/api/recettes', {
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

    try {
      const res = await axios.delete(`http://localhost:5000/api/recettes/${id}`, {
        data: { email } // axios utilise `data` pour envoyer le body avec DELETE
      });
      console.log(res.data);
      setRecettes(recettes.filter((recette) => recette.id !== id));
      setMessage(res.data.message || 'Recette supprimée ✅');
    } catch (err) {
      console.error('Erreur lors de la suppression :', err);
      setMessage(err.response?.data?.message || 'Erreur lors de la suppression ❌');
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
                  <h3 className="mt-3">{recette.title}</h3>
                  <button
                    className="btn btn-danger mt-2"
                    onClick={() => handleDelete(recette.id)}
                  >
                    Supprimer
                  </button>
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
