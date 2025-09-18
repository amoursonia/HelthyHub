import React from 'react';

const HygienePage = () => (
  <>
<div className="App">
      <header>
        <h1 className='hygiene'>Hygiène Alimentaire</h1>
        <p className='hygiene2'>Des conseils pour une meilleure santé alimentaire.</p>
      </header>
      <section className="conseils">
        <h2>Conseils d'Hygiène Alimentaire</h2>
        <p>Suivre des pratiques d'hygiène adéquates est essentiel pour éviter
            les contaminations alimentaires. Voici quelques conseils à suivre :</p>
      <h2>1. Lavage des mains</h2>
      <p>Avant de commencer à cuisiner, lavez-vous toujours
        les mains avec du savon et de l'eau chaude pendant au moins 20 secondes.</p>
      <h2>2. Utilisation des ustensiles</h2>
      <p>Utilisez des ustensiles propres et spécifiques pour chaque type d'aliment.</p>
    <ul>
        <li>Utilisez un couteau différent pour la viande et les légumes.</li>
        <li>Ne réutilisez pas les planches à découper sans les nettoyer entre les usages.</li>
    </ul>

    <h2>3. Conservation des aliments</h2>
    <p>Stockez les aliments à des températures sûres :</p>
    <ul>
        <li>Réfrigérez immédiatement les restes.</li>
        <li>Gardez votre réfrigérateur à une température inférieure à 4°C.</li>
    </ul>

    <h2>4. Cuisson des aliments</h2>
    <p>Assurez-vous que les aliments sont bien cuits, surtout les viandes :</p>
    <ul>
        <li>Utilisez un thermomètre pour vous assurer que la
            viande atteint la température minimale de cuisson.</li>
        <li>Évitez de cuire les aliments à feu trop faible.</li>
    </ul>
    <h2>5. Nettoyage de la cuisine</h2>
    <p>Maintenez votre cuisine propre :</p>
    <ul>
        <li>Nettoyez les surfaces de travail avant et après la préparation des aliments.</li>
        <li>Assurez-vous que les éponges et les chiffons utilisés sont propres.</li>
    </ul>
      </section>
</div>
<footer>
        <p>© 2024 Sensibilisation à l'hygiène alimentaire</p>
      </footer>
  </>
);

export default HygienePage;
