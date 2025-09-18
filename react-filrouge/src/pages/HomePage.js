import React from 'react';
import imgaccueil from '../img/imgaccueil.png';

const Home = () => (
  <>
    <div className="container">
      <div className="text-content">
        <h2>HEALTHY HUB</h2>
        <h1>
          Mangez sain,<br /> vivez bien,<br />
          <span className="yellow">rayonnez</span><br />
          <span className="green">chaque jour.</span>
        </h1>
        <p>
        Rejoignez une communauté qui partage des pratiques alimentaires saines et durables :
        recettes de cuisine, conseils de conservation et hygiène alimentaire.
        </p>
        <a href="http://127.0.0.1:9090/login" className="cta-button">
        C'est parti !
        </a>
      </div>
      <div className="image-content">
        <img src={imgaccueil} alt="Healthy food" className="food-image" />
      </div>
    </div>
  </>
);

export default Home;
