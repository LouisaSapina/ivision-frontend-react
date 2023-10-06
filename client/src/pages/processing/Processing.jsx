import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Processing.module.css';
import Header from '../../components/header/Header';
import processingImg from '../../assets/images/processing.png';
import ImgProcessing from '../imgprocessing/ImgProcessing';
import Indicator from '../../components/UI/indicator/Indicator';
import Results from '../results/Results';

function Processing(props) {
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
            {/* <Header /> */}
            {loading ? <Indicator style={{ marginTop: "38px" }} /> : <Results file={props.file}/>}
        </div>
    );
}

export default Processing;