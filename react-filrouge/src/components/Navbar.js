import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import myicon from '../img/myicon.svg';

const Navbar = ({ isLoggedIn, onLogout }) => {
  const [isOpen, setIsOpen] = useState(false); // ✅ état pour mobile menu

  const toggleMenu = () => setIsOpen(!isOpen); // ✅ ouvrir/fermer le menu

  return (
    <nav className="navbar bg-body-tertiary">
      <div className="container-fluid1">
        {/* ✅ Logo */}
        <img alt='logo' src={myicon} />

        {/* ✅ Burger mobile */}
        <button
          className="navbar-toggler"
          type="button"
          onClick={toggleMenu} // ✅ toggle menu
          aria-label="Toggle navigation"
        >
          {/* ✅ trois barres du burger */}
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
          <span className="burger-bar"></span>
        </button>

        {/* ✅ Menu links */}
        <ul className={`navbar-nav ${isOpen ? 'nav-open' : ''}`}>
          {/* ✅ Accueil / Web */}
          <li className="nav-item">
            <Link className="nav-link" to="/">
              Accueil
            </Link>
          </li>

          <li className="nav-item">
            <Link className="nav-link" to="/recettes">
              Recettes
            </Link>
          </li>

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

          {/* ✅ Mes Recettes seulement si connecté */}
          {isLoggedIn && (
            <li className="nav-item">
              <Link className="nav-link" to="/mes-recettes">
                Mes Recettes
              </Link>
            </li>
          )}

          {/* ✅ Authentification */}
          {isLoggedIn ? (
            <li className="nav-item">
              <button className="btn btn-danger nav-link" onClick={onLogout}>
                Se Déconnecter
              </button>
            </li>
          ) : (
            <>
              <li className="nav-item">
                <Link className="nav-link" id="button" to="/login">
                  Me Connecter
                </Link>
              </li>
              <li className="nav-item">
                <Link className="nav-link" id="button" to="/submit">
                  M'inscrire
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
};

export default Navbar;
