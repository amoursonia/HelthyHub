import React from 'react';

const PasswordPage = () => (
  <>
    <form>
      <div className='titre'>
        <h1>Trouvez votre compte</h1>
      </div>
      <hr />
      <p>Veuillez entrer votre e-mail ou votre numéro de mobile pour rechercher votre compte.</p>
      <div className="row">
        <div className="col">
          <input type="text" className="form-control" placeholder="E-mail ou numéro de mobile" aria-label="E-mail ou numéro de mobile" />
        </div>
      </div>
      <div className="d-grid gap-2 d-md-flex justify-content-md-end">
        <button className="btn-primary2" type="button">Annuler</button>
        <button className="btn-primary2" type="submit">Rechercher</button>
      </div>
    </form>
  </>
);

export default PasswordPage;
