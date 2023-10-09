import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import cl from './Processing.module.css';
import Header from '../../components/header/Header';
import processingImg from '../../assets/images/processing.png';
import ImgProcessing from '../imgprocessing/ImgProcessing';
import Indicator from '../../components/UI/indicator/Indicator';
import Results from '../results/Results';
import axios from 'axios';

function Processing(props) {
    const navigate = useNavigate();

    const handleSubmit = () => {
        navigate('/results');
    };
    const [loading, setLoading] = useState(true);

    const [results, setResults] = useState([]);
    const [databaseData, setDatabaseData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                // Create a FormData object to send the image file
                const formData = new FormData();
                formData.append('image', props.file);
    
                const res = await axios.post('http://localhost:23000/subjectsList', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data', // Set the content type to multipart/form-data
                    },
                });
    
                setResults(res.data.recognitionData);
                setDatabaseData(res.data.databaseData);
            } catch (error) {
                console.error(error);
            }

            setLoading(false)
        }
    
        fetchData();
    }, []);

    return (
        <div className={cl.processingWrapper}>
            {loading ? <Indicator file={props.file} style={{ marginTop: "38px" }} /> : <Results results={results} databaseData={databaseData} file={props.file} handleNavBack={props.handleNavBack}/>}
        </div>
    );
}

export default Processing;