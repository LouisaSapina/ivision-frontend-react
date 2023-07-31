import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Processing.module.css';
import Header from '../../components/header/Header';
import processingImg from '../../assets/images/processing.png';
import ImgProcessing from '../imgprocessing/ImgProcessing';
import Indicator from '../../components/UI/indicator/Indicator';
import Results from '../results/Results';

function Processing() {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/results');
    };
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        // Simulating a delay for demonstration purposes
        const timer = setTimeout(() => {
        setLoading(false);
        
        }, 2000);

        return () => clearTimeout(timer);
    }, []);

    return (
        <div className={cl.processingWrapper}>
            <Header />
            {loading ? <Indicator style={{ marginTop: "38px" }} /> : <Results />}
        </div>
    );
}

export default Processing;
// import Results from '../results/Results';
// import React, { useState, useEffect } from 'react';
// import { useNavigate } from 'react-router-dom';
// import cl from './Processing.module.css';
// import Header from '../../components/header/Header';
// import processingImg from '../../assets/images/processing.png';
// import ImgProcessing from '../imgprocessing/ImgProcessing';
// import Indicator from '../../components/UI/indicator/Indicator';

// function Processing() {
//     const navigate = useNavigate();
//     const [loading, setLoading] = useState(true);

//     useEffect(() => {
//         // Simulating a delay for demonstration purposes
//         const timer = setTimeout(() => {
//             setLoading(false);
//             navigate('/results'); // Navigate to the Results page relative to the current URL
//         }, 2000);

//         return () => clearTimeout(timer);
//     }, [navigate]);

//     return (
//         <div className={cl.processingWrapper}>
//             <Header />
//             {loading ? <Indicator style={{ marginTop: "38px" }} /> : null}
//         </div>
//     );
// }

// export default Processing;
