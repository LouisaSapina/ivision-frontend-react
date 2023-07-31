import React from 'react';
import cl from './Card.module.css';
import matches from '../../../pages/data/foundedMatches';
import { Link } from 'react-router-dom';

function Card() {

    return (
    <div className={cl.cardWrapper}>
      {matches.map((item) => (
          <Link to={{
            pathname: `/results/${item.id}`,
            state: { cardData: item }
          }} className={cl.card__link}>
            <div className={cl.card} key={item.id}>
                <img src={item.image} alt={item.name} className={cl.card__img} />
                <div className={cl.card__content}>
                    <p className={cl.card__text}>{item.name}</p>
                    <p className={cl.card__text}>{item.iin}</p>
                    <p className={cl.card__text}>{item.dateOfBirth}</p>
                </div>
            </div>
        </Link>
      ))}
    </div>
    );
}

export default Card;