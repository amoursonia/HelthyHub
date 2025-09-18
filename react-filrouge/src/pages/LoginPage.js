/* eslint-disable */

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios';

const LoginPage = ({ onLogin }) => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/login', {
        email,
        password
      });

      setMessage(res.data.message);

      // ✅ dire à l'app qu'on est connecté
      onLogin(email);

      // ✅ garder la connexion après refresh
      localStorage.setItem('isLoggedIn', 'true');

      localStorage.setItem('email', email);


      // ✅ optionnel : rediriger vers une page (ex: accueil ou profil)
      navigate('/');
    } catch (err) {
      setMessage(err.response?.data?.message || 'Erreur de connexion ❌');
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="titre">
          <h1>Connectez-vous</h1>
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="email">
            IDENTIFIANT <span className="redstar">*</span>
          </label>
          <input
            id="email"
            type="email"
            className="form-control"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
        </div>

        <div className="mb-3">
          <label className="form-label" htmlFor="password">
            MOT DE PASSE <span className="redstar">*</span>
          </label>
          <input
            id="password"
            type="password"
            className="form-control"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
        </div>

        <button type="submit" className="btn btn-primary">
          Se Connecter
        </button>
        <Link to="/submit">
          <button type="button" className="btn btn-secondary">
            Créer un compte
          </button>
        </Link>
      </form>

      {message && <p>{message}</p>}
    </>
  );
};

export default LoginPage;
