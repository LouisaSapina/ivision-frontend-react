import React, {useState, useEffect} from 'react';
import { Link } from 'react-router-dom';
import cl from './Results.module.css';
import resultImg from '../../assets/images/result.png';
import Header from '../../components/header/Header';
import pdf from '../../assets/icons/pdf.png';
import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import axios from 'axios';
import jsonData from '../data/data.json';

function Results() {
    const [photos, setPhotos] = useState([]);
    const [text, setText] = useState('');
  
    useEffect(() => {
      // Fetch JSON data using Axios
      axios.get('../data/data.json')
        .then(function (response) {
          const data = response.data;
          setPhotos(data.photos);
          setText(data.text);
        })
        .catch(function (error) {
          console.log(error);
        });
  
      // Access JSON data from imported file
      setPhotos(jsonData.photos);
      setText(jsonData.text);
    }, []);

    return (
        <div className={cl.resultsWrapper}>
            <div className={cl.container}>
                <div className={cl.results}>
                    <div className={cl.result__img}>
                        <img src={resultImg} alt='img' />
                    </div>
                    <div className={cl.processing__results}>
                        <p className={cl.processing__results__status}>Фотография прошла обработку</p>
                        <div className={cl.results__more}>
                            <Button>Перейти в ITAP</Button>
                            <Button>Перейти в Досье</Button>
                            <img src={pdf} alt='pdf' />
                        </div>
                    </div>
                </div>
                <h2 className={cl.mathces}>Найдено 12 совпадений</h2>
                <div className={cl.found__mathces}>
                    {photos.map((photo, index) => (
                        <Link 
                            key={index}
                            className={cl.card__link}
                            to={{
                                pathname: `/results/${photo.id}`,
                                state: { cardData: photo },
                            }}>
                            <div key={index} className={cl.card}>
                                <img src={photo.url} alt={photo.caption} className={cl.card__img} />
                                <div className={cl.card__content}>
                                    <p className={cl.card__text} >{photo.name}</p>
                                    <p className={cl.card__text} >{photo.iin}</p>
                                    <p className={cl.card__text} >{photo.dateOfBirth}</p>
                                </div>
                            </div>
                        </Link>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default Results;