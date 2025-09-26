/* eslint-disable no-console */
/* eslint-disable */

import React, { useEffect, useState } from 'react';
import { Col, Container, Row } from 'react-bootstrap';
import './style.scss';

const VideoRecette = ({ title, video }) => (
  <Col md={4} className="mb-4"> 
    {/* md=4 => 12 colonnes bootstrap / 4 = 3 vidéos par ligne */}
    <div className="video-card">
      <iframe
        width="100%"
        height="200px"
        src={video}
        title={title}
        allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
        referrerPolicy="strict-origin-when-cross-origin"
        allowFullScreen
      ></iframe>
      <h2>{title}</h2>
    </div>
  </Col>
);

const VideoRecettes = ({ recettes }) => (
  <Row>
    {recettes.map((recette, index) => (
      <VideoRecette key={index} title={recette.title} video={recette.video} />
    ))}
  </Row>
);

const Recettes = ({ isLoggedIn }) => {
  const [recettes, setRecettes] = useState([]);
const baseURL = process.env.REACT_APP_API_URL || "http://localhost:5000";
  useEffect(() => {
    fetch(`${baseURL}/api/recettes`)
      .then((res) => res.json())
      .then((data) => setRecettes(data))
      .catch((err) => console.error(err));
  }, []);

  // si pas connecté → on coupe à 3 recettes max
  const recettesAffichees = isLoggedIn ? recettes : recettes.slice(0, 3);

  return (
    <Container fluid>
      <Row className="recettes">
        <h1 className="display-3">Recettes</h1>
      </Row>

      <VideoRecettes recettes={recettesAffichees} />

      {!isLoggedIn && (
        <Row>
          <div className="d-grid gap-2">
            <a href="/login" className="btn4" size="lg">
              Afficher plus de recettes
            </a>
          </div>
        </Row>
      )}
    </Container>
  );
};

export default Recettes;
