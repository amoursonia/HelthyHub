import React from 'react';
import { Link } from 'react-router-dom';
import myicon from '../img/myicon.svg';

const Navbar = ({ isLoggedIn, onLogout }) => (
  <>
    <nav className="navbar navbar-expand-lg bg-body-tertiary">
      <div className="container-fluid1">
        <img alt="logo" src={myicon} />
        <ul className="navbar-nav me-auto mb-2 mb-lg-0">

          {/* ✅ Affiche Accueil seulement si pas connecté */}
          {!isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/">
                Accueil
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/recettes">
              Recettes
            </Link>
          </li>

          {/* ✅ afficher l’onglet Mes Recettes uniquement si connecté */}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/mes-recettes">
                Mes Recettes
              </Link>
            </li>
          )}

          <li className="nav-item">
            <Link className="nav-link" to="/conseils">
              Conseils
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/hygiene">
              Hygiène
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/activities">
              Activités
            </Link>
          </li>

          {/* ✅ Si connecté → bouton déconnexion */}
          {isLoggedIn ? (
            <li className="nav-item">
              <button
                className="btn btn-danger nav-link"
                onClick={onLogout}
              >
                Se Déconnecter
              </button>
            </li>
          ) : (
            <>
              <Link className="nav-link" id="button" to="/login">
                Me Connecter
              </Link>
              <Link className="nav-link" id="button" to="/submit">
                M'inscrire
              </Link>
            </>
          )}
        </ul>
      </div>
    </nav>
  </>
);

export default Navbar;
