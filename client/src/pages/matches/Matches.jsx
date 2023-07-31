// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useParams } from 'react-router-dom';
// import matches from '../data/foundedMatches';
// import sources from '../data/sources';
// import Header from '../../components/header/Header';
// import cl from './Matches.module.css';
// import Button from '../../components/UI/button/Button';
// import pdf from '../../assets/icons/pdf.png';
// import jsonData from '../data/data.json';

// const Matches = () => {
//   const { id } = useParams();
//   const [card, setCard] = useState(null);

//   useEffect(() => {
//     const fetchCardData = () => {
//       const selectedCard = matches.find((item) => item.id === parseInt(id));
//       setCard(selectedCard);
//     };

//     fetchCardData();
//   }, [id]);



//   return (
//     <div className={cl.matchesWrapper}>
//       <Header />
//       {card ? (
//         <div className={cl.container}>
//           <div className={cl.results}>
//             <div className={cl.result__img}>
//               <img src={card.image} alt='img' className={cl.img} />
//             </div>
//             <div className={cl.processing__results}>
//                 <p className={cl.processing__results__status}>{card.name}</p>
//                 <p className={cl.processing__results__status}>{card.iin}</p>
//                 <p className={cl.processing__results__status}>{card.dateOfBirth}</p>
//                 <div className={cl.results__more}>
//                   <Button>Перейти в ITAP</Button>
//                   <Button>Перейти в Досье</Button>
//                   <img src={pdf} alt='pdf' />
//                 </div>
//             </div>
//           </div>
          
//           <h2 className={cl.sources}>Открытые источники</h2>
//           <div className={cl.open__sources}>
//             {sources.map((item) => (
//               <div className={cl.card} key={item.id}>
//                   <img src={item.image} alt={item.name} className={cl.card__img} />
//                   <div className={cl.card__content}>
//                     <p className={cl.card__text}>{item.title}</p>
//                     <a href={item.link} target="_blank" className={cl.card__link}>{item.link}</a>
//                   </div>
//               </div>
//             ))}
//           </div>
//         </div>
//       ) : (
//         <p>Loading...</p>
//       )}
//     </div>
//   );
// };

// export default Matches;

import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import cl from './Matches.module.css';
import Button from '../../components/UI/button/Button';
import pdf from '../../assets/icons/pdf.png';

import jsonData from '../data/data.json';

const Matches = () => {
  const { id } = useParams();
  const [card, setCard] = useState(null);

  useEffect(() => {
    const fetchCardData = () => {
      const selectedCard = jsonData.photos.find((item) => item.id === parseInt(id));
      setCard(selectedCard);
    };

    fetchCardData();
  }, [id]);

  return (
    <div className={cl.matchesWrapper}>
      <Header />
      {card ? (
        <div className={cl.container}>
          <div className={cl.results}>
            <div className={cl.result__img}>
              <img src={card.url} alt='img' className={cl.img} />
            </div>
            <div className={cl.processing__results}>
              <p className={cl.processing__results__status}>{card.name}</p>
              <p className={cl.processing__results__status}>{card.iin}</p>
              <p className={cl.processing__results__status}>{card.dateOfBirth}</p>
              <div className={cl.results__more}>
                <Button>Перейти в ITAP</Button>
                <Button>Перейти в Досье</Button>
                <img src={pdf} alt='pdf' />
              </div>
            </div>
          </div>

          <h2 className={cl.sources}>Открытые источники</h2>
          <div className={cl.open__sources}>
            {jsonData.sources.map((source) => (
              <div className={cl.card} key={source.id}>
                <img src={source.url} alt={source.title} className={cl.card__img} />
                <div className={cl.card__content}>
                  <p className={cl.card__text}>{source.title}</p>
                  <a href={source.link} target="_blank" rel="noopener noreferrer" className={cl.card__link}>{source.link}</a>
                </div>
              </div>
            ))}
          </div>
        </div>
      ) : (
        <p>Oops!</p>
      )}
    </div>
  );
};

export default Matches;
