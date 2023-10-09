import React, {useState, useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import cl from './Results.module.css';
// import resultImg from '../../assets/images/example-data.jpg';
import Header from '../../components/header/Header';
import pdf from '../../assets/icons/pdf.png';
import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import axios from 'axios';
import jsonData from '../data/data.json';

import jsonResponse from './jsonResponse.js'

import BackLeftIcon from './../../assets/icons/back_left.png';

import './results.scss';


function Results(props) {
    const canvasRef = useRef(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [hoverSubject, setHoverSubject] = useState(null);

    const [mouseXpos, setMouseXpos] = useState(null);
    const [mouseYpos, setMouseYpos] = useState(null);

    const [results, setResults] = useState([]);
    const [databaseData, setDatabaseData] = useState([])

    const [resultImg, setResultImg] = useState(null)
    
    useEffect(() => {
        setResultImg(props.file)
    }, [])

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
        }
    
        fetchData();
    }, []);
    


    useEffect(() => {
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
    
        const img = new Image();
        img.src = URL.createObjectURL(props.file);
    
        let circles = [
            // { 
            //     centerX: '', 
            //     centerY: '', 
            //     radius: '', 
            //     subject: '', 
            // }
        ];
    
        const canvasWidth = 700;
        const canvasHeight = 500;
    
        img.onload = () => {
            // canvas.width = img.width;
            // canvas.height = img.height;

            let scaleX = 1;
            let scaleY = 1;

            if (img.width >= 500) {
                canvas.width = canvasWidth;
                canvas.height = canvasHeight;
                
                scaleX = canvasWidth / img.width
                scaleY = canvasHeight / img.height;
            } else {
                canvas.width = img.width;
                canvas.height = img.height;
            }

    
            

            console.log(img.width, img.height)
            console.log(img.width, img.height)
            console.log(scaleX, scaleY)

            circles = circles.map(circle => ({
                centerX: circle.centerX * scaleX,
                centerY: circle.centerY * scaleY,
                radius: circle.radius * Math.min(scaleX, scaleY),
                subject: circle.subject,
            }));
    
            ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
            canvas.addEventListener('mousemove', (event) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = (event.clientX - rect.left); // Adjust for scaling
                const mouseY = (event.clientY - rect.top);   // Adjust for scaling
    
                setMouseXpos(mouseX);
                setMouseYpos(mouseY);
    

                console.log(circles, results, mouseX, mouseY)

                canvas.style.cursor = 'pointer';


                circles.forEach(circle => {
                    if (Math.sqrt((mouseX - circle.centerX) ** 2 + (mouseY - circle.centerY) ** 2) <= circle.radius) {
                        canvas.style.cursor = 'pointer';
                        handleCircleMouseMove(circle.subject);
                    }
                });
    
                redrawCanvas();
            });
    
            canvas.addEventListener('mouseout', () => {
                handleCircleMouseOut();
            });
    
            canvas.addEventListener('click', (event) => {
                const rect = canvas.getBoundingClientRect();
                const mouseX = (event.clientX - rect.left); // Adjust for scaling
                const mouseY = (event.clientY - rect.top);   // Adjust for scaling
    
                circles.forEach(circle => {
                    if (
                        Math.sqrt((mouseX - circle.centerX) ** 2 + (mouseY - circle.centerY) ** 2) <= circle.radius
                    ) {
                        handleCircleClick(circle.subject);
                    }
                });
            });
    
            const handleCircleMouseMove = (subject) => {
                setHoverSubject(subject);
                redrawCanvas();
            };
    
            const handleCircleMouseOut = () => {
                canvas.style.cursor = 'default';
                redrawCanvas();
            };
    
            const handleCircleClick = (subject) => {
                setCurrentSubject(subject);
                redrawCanvas();
            };
    
            if (Array.isArray(results)) {
                results.forEach(subject => {
                    let { x_min, x_max, y_min, y_max } = subject.box;
    
                    const centerX = (x_max + x_min) / 2 * scaleX; // Adjust for scaling
                    const centerY = (y_max + y_min) / 2 * scaleY; // Adjust for scaling
                    const radius = Math.max((x_max - x_min) / 2 * scaleX, (y_max - y_min) / 2 * scaleY); // Adjust for scaling
    
                    circles.push({ centerX, centerY, radius, subject });
                });
            }
    
            const redrawCanvas = () => {
                ctx.clearRect(0, 0, canvas.width, canvas.height);
                ctx.drawImage(img, 0, 0, canvas.width, canvas.height);
    
                circles.forEach(({ centerX, centerY, radius, subject }) => {
                    ctx.beginPath();
                    ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
    
                    if (currentSubject === subject) {
                        ctx.strokeStyle = 'blue';
                        ctx.lineWidth = 3;
                        ctx.stroke();
                        return;
                    } 
    
                    if (hoverSubject === subject) {
                        ctx.strokeStyle = 'white';
                        ctx.lineWidth = 3;
                    } else {
                        ctx.strokeStyle = 'red';
                        ctx.lineWidth = 2;
                    }
    
                    ctx.stroke();
                });

                // ctx.strokeStyle = 'yellow';
                // ctx.lineWidth = 3;
                // ctx.beginPath();
                // ctx.arc(mouseXpos, mouseYpos, 2, 0, 2 * Math.PI);
                // ctx.stroke();
            };
    
            // Initial canvas rendering
            redrawCanvas();
        };
    }, [props.file, results, currentSubject, mouseXpos, mouseYpos]);
    
  
    return (
        <div className='results-page'>
            <div className={'container'}>
                <div className='nav-back'>
                    <img src={BackLeftIcon} alt="back" onClick={props.handleNavBack}/>
                </div>
                <div className={'result-head'}>
                    <div className={'result-img'}>
                        {/* <img src={resultImg} alt='img' /> */}
                        <canvas ref={canvasRef} alt="img" />
                    </div>
                    <div className={'result-info-wrapper'}>
                        <div className='result-info'>
                            <h1>Фотография прошла обработку</h1>
                            {
                                currentSubject === null ? null 
                                : (
                                    <>
                                        <h4>Выбранный человек:</h4>
                                        <p>ИИН: <span>{currentSubject.subjects[0].subject}</span></p>
                                        <p>Similarity: <span>{currentSubject.subjects[0].similarity}</span></p>
                                        <p>Probability: <span>{currentSubject.box.probability}</span></p>
                                    </>
                                )
                            }
                        </div>
                        <div className={'actions'}>
                            <Button>Перейти в ITAP</Button>
                            <Button>Перейти в Досье</Button>
                            <img src={pdf} alt='pdf' />
                        </div>
                    </div>
                </div>
                <h2 className={'result-matches-count'}>Найдено {databaseData.length} совпадений</h2>
                <div className={'result-matches'}>
                    {databaseData.map((data, index) => (
                        <Link 
                            key={index}
                            className={'result-card-link'}
                            to={{
                                pathname: `/results/${data.iin}`,
                                state: { cardData: data.img },
                            }}>
                            <div key={index} className={'result-card'}>
                                <img src={`data:image/png;base64,${data.img}`} alt={'person img'} className={'result-card-img'} />
                                <div className={'result-card-content'}>
                                    <div className="result-card-info">
                                        <p>{data.first_name || ''} {data.second_name || ''} {data.patronymic || ''}</p>
                                        <p>{data.iin}</p>
                                        {/* <p>{photo.dateOfBirth}</p> */}
                                    </div>
                                    <div className="result-match-info">
                                        <p>
                                            Совпадение <span>69.9%</span>
                                        </p>
                                    </div>
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