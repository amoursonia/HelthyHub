import React from 'react';
import './style.scss';
import conservation from './img/conservation.jpg';
import frigo from './img/frigo.png';

const Conseils = () => (
  <div className='div-conseils'>
    <div className='conseil1'>
    <div className="image-content2">
    <img src={conservation} alt="Healthy food" className="div-image" />
    </div>
      <h3 className='conseilsh3'>Comment bien conserver ses aliments ?</h3>
      <p>Conserver ses aliments, préparations ou plats cuisinés dans
        les meilleures conditions vous permet de les garder plus
        longtemps.<br></br>Aussi, découvrez nos conseils et astuces pour
        stocker vos aliments, fruits, légumes et viandes!</p>
      <h3 className='conseilsh3'>Quels aliments mettre au frigo et comment les ranger ? </h3>
      <p>Viande, poisson, laitages, fruits, légumes…, on peut globalement tout
        mettre dans un frigo ! Attention, certains aliments comme la<br></br>
        pomme de terre, la tomate (qui perd en goût !), l’ail, l’oignon ou
        certains fruits exotiques, préfèrent un stockage à l’air libre.
        <span></span>
        <p>Le concombre aura tendance à se flétrir en raison de l’humidité et
        du froid. Les oeufs deviennent quant à eux poreux à l’humidité
        du frigo.</p>
        <span>
        La température d’un réfrigérateur n’est pas uniforme. Il y a
        des sections qui sont plus fraîches que d’autres,et qui conviennent
        donc <br></br>mieux à certaines familles d’aliments ! </span></p>
        <p>Petit rappel : Ne surchargez pas trop votre frigo, car ça nuit à la bonne
          circulationde l’air froid. </p>
    </div>
     <div>
      <h3 className='conseilsh3'>Schéma pour bien ranger ses aliments au réfrigérateur</h3>
     <div className="image-content2">
    <img src={frigo} alt="Healthy food" className="div-image2" />
    </div>
    <p>Source de l’Infographie : agriculture.gouv.fr</p>
     </div>
     <h3 className='conseilsh3'>Comment conserver vos aliments hors du frigo ?</h3>
     <p>Certains bocaux, condiments (moutarde, confiture, miel) ou aliments en pots, n’ont
       pas toujours besoin d’être mis au frigo.<br></br> Ils doivent cependant être conservés
        dans des lieux secs, à l’abri de la lumière et à une température ambiante stable de moins
         de 20 °C.<br></br><br></br>Les fruits et légumes peuvent aussi être stockés à l’air libre.
         Les mêmes
         recommandations
      s’appliquent. À noter qu’ils auront tendance à mûrir plus vite que s’ils étaient rangés
      dans le bac à légumes de votre réfrigérateur.
      Placez vos huiles hors du frigo mais veillez cependant à les ranger à l’abri de la lumière
      pour certaines. Conservez au frigo les huiles riches en oméga 3 une fois ouvertes, pour
      éviter l’oxydation.</p>
  </div>
);

export default Conseils;
