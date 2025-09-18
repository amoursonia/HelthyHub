/* eslint-disable */

import React, { useState } from 'react';
import axios from 'axios';

const SubmitPage = () => {
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    email: '',
    dob: '',
    password: ''
  });
  const [message, setMessage] = useState('');

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.id]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const res = await axios.post('http://localhost:5000/api/auth/register', formData);
      setMessage(res.data.message);
    } catch (err) {
      setMessage(err.response?.data?.message || "Erreur d'inscription ❌");
    }
  };

  return (
    <>
      <form onSubmit={handleSubmit}>
        <div className="titre">
          <h1>Créer un compte</h1>
        </div>
        <p>C’est simple et rapide.</p>
        <hr />

        <div className="row">
          <div className="col">
            <input
              type="text"
              id="firstName"
              className="form-control"
              placeholder="Prénom"
              value={formData.firstName}
              onChange={handleChange}
              required
            />
          </div>
          <div className="col">
            <input
              type="text"
              id="lastName"
              className="form-control"
              placeholder="Nom de famille"
              value={formData.lastName}
              onChange={handleChange}
              required
            />
          </div>
        </div>

        <div className="col">
          <input
            type="email"
            id="email"
            className="form-control"
            placeholder="E-mail"
            value={formData.email}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col">
          {/*<label htmlFor="dob">Date de naissance</label>*/}
          <input
            type="date"
            id="dob"
            className="form-control"
            value={formData.dob}
            onChange={handleChange}
            required
          />
        </div>

        <div className="col">
          <input
            type="password"
            id="password"
            className="form-control"
            placeholder="Mot de passe"
            value={formData.password}
            onChange={handleChange}
            required
          />
        </div>

        <hr />
        <button type="submit" className="btn btn-primary">
          S'inscrire
        </button>
      </form>

      {message && <p>{message}</p>}
    </>
  );
};

export default SubmitPage;
