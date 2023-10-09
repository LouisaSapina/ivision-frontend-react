import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Header from '../../components/header/Header';
import cl from './Matches.module.css';
import Button from '../../components/UI/button/Button';
import pdf from '../../assets/icons/pdf.png';

import jsonData from '../data/data.json';
import axios from 'axios';

const Matches = () => {
  const { iin } = useParams();

  const [images, setImages] = useState([])
  const [info, setInfo] = useState([])

  useEffect(() => {
    const fetchCardData = async () => {
      console.log(iin)

      const res = await axios.post(
        'http://localhost:23000/searchByIIN', 
        {"subjectId": iin }, 
        {
          headers: {
            'x-api-key': '45878514-11f5-4db6-8dd6-6229066b8995' // Add the x-api-key header here
          }
        }
      );

      setImages(res.data.images)
      setInfo(res.data.info)
    };

    fetchCardData();
  }, [iin]);

  return (
    <div className={cl.matchesWrapper}>
      <Header />
      {info[0] != undefined ? (
        <div className={cl.container}>
          <div className={cl.results}>
            <div className={cl.result__img}>
              <img src={`data:image/png;base64,${images[0]}`} alt='img' className={cl.img} />
            </div>
            <div className={cl.processing__results}>
              <div>
                <div>
                  <p className={cl.processing__results__status}>ФИО: {info[0].first_name || ""} {info[0].second_name || ""} {info[0].patronymic || ""}</p>
                </div>
                <p className={cl.processing__results__status}>ИИН: {info[0].iin || ""}</p>
              </div>
              <div className={cl.results__more}>
                <Button>Перейти в ITAP</Button>
                <Button>Перейти в Досье</Button>
                <img src={pdf} alt='pdf' />
              </div>
            </div>
          </div>

          <h2 className={cl.sources}>Открытые источники</h2>
          <div className={cl.open__sources}>
            {images.map((image) => (
              <div className={cl.card} key={image}>
                <img src={`data:image/png;base64,${image}`} className={cl.card__img} />
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
