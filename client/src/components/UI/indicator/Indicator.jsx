import React, { useEffect, useState } from 'react';
import cl from './Indicator.module.css';
import processingImg from '../../../assets/images/processing.png';


const Indicator = ({ length, progress, file }) => {
  const [loadingProgress, setLoadingProgress] = useState(1);
  const [img, setImg] = useState('')

  useEffect(() => {
    console.log(file)

    const increment = progress > 1 ? Math.ceil(100 / progress) : 100;
    const interval = length / 100;

    const timer = setInterval(() => {
      setLoadingProgress((prevProgress) => {
        if (prevProgress + increment >= 100) {
          clearInterval(timer);
          return 100;
        }
        return prevProgress + increment;
      });
    }, interval);

    return () => {
      clearInterval(timer);
    };
  }, [length, progress]);

  useEffect(() => {
    setImg();

  }, [])

  return (
    <div className={cl.container}>
        <div className={cl.processing__block}>
            <div className={cl.processing__img}>
                <img src={`${URL.createObjectURL(file)}`} alt="img" className={cl.img} />
            </div>
            <div className={cl.processing__index}>
                <p className={cl.processing__status}>Ваш файл в обработке...</p>
                {/* <div className={cl.processing__range} onClick={handleSubmit}> </div> */}
                <div className={cl.progressBar__container}>
                    <div className={cl.progressBar} style={{ width: `${loadingProgress}%` }}>
                        <span className={cl.progressText}>{loadingProgress}%</span>
                    </div>
                </div>
            </div>
        </div>
    </div>

  );
};


export default Indicator;



