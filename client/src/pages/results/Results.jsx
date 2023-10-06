import React, {useState, useEffect } from 'react';
import { useRef } from 'react';
import { Link } from 'react-router-dom';
import cl from './Results.module.css';
import resultImg from '../../assets/images/example-data.jpg';
import Header from '../../components/header/Header';
import pdf from '../../assets/icons/pdf.png';
import Button from '../../components/UI/button/Button';
import Card from '../../components/UI/card/Card';
import axios from 'axios';
import jsonData from '../data/data.json';

import jsonResponse from './jsonResponse.js'

import './results.scss';


function Results() {
    const canvasRef = useRef(null);
    const [currentSubject, setCurrentSubject] = useState(null);
    const [hoverSubject, setHoverSubject] = useState(null);

    const [mouseXpos, setMouseXpos] = useState(null);
    const [mouseYpos, setMouseYpos] = useState(null);

    const [results, setResults] = useState([]);
    const [databaseData, setDatabaseData] = useState([])

    useEffect(() => {
        async function fetchData() {
            try {
                const res = await axios.post('http://localhost:23000/subjectsList', {
                    image: resultImg
                });
                console.log(res.data);
                setResults(res.data.recognitionData);
                setDatabaseData(res.data.databaseData);
                console.log(results);
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
        img.src = resultImg;
    
        const circles = [
            { 
                centerX: '', 
                centerY: '', 
                radius: '', 
                subject: '', 
            }
        ];
    
        img.onload = () => {
        canvas.width = img.width;
        canvas.height = img.height;
    
        ctx.drawImage(img, 0, 0, img.width, img.height);
    
        canvas.addEventListener('mousemove', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;
    
            setMouseXpos(mouseX);
            setMouseYpos(mouseY);

            circles.forEach(circle => {
                if (Math.sqrt((mouseX - circle.centerX) ** 2 + (mouseY - circle.centerY) ** 2) <= circle.radius) {
                    canvas.style.cursor = 'pointer';
                    handleCircleMouseMove(circle.subject);
                }
            })

            redrawCanvas();
        });
    
        canvas.addEventListener('mouseout', () => {
            handleCircleMouseOut();
        });

        canvas.addEventListener('click', (event) => {
            const rect = canvas.getBoundingClientRect();
            const mouseX = event.clientX - rect.left;
            const mouseY = event.clientY - rect.top;

            circles.forEach(circle => {
                if (
                    Math.sqrt((mouseX - circle.centerX) ** 2 + (mouseY - circle.centerY) ** 2) <= circle.radius
                ) {
                    handleCircleClick(circle.subject);
                }
            })
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
        
                const centerX = (x_max + x_min) / 2;
                const centerY = (y_max + y_min) / 2;
        
                const radius = Math.max((x_max - x_min) / 2, (y_max - y_min) / 2);
        
                
        
                circles.push({ centerX, centerY, radius, subject });
                
            });
        }
    
        // Function to redraw the canvas with updated hover effect
        const redrawCanvas = () => {
            ctx.clearRect(0, 0, canvas.width, canvas.height);
    
            // Draw the image onto the canvas
            ctx.drawImage(img, 0, 0, img.width, img.height);

            
            circles && circles.forEach(({ centerX, centerY, radius, subject }) => {
                ctx.beginPath();
                ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI);
        
                if (currentSubject === subject) {
                    ctx.strokeStyle = 'blue'; // Set the stroke color to blue when hovered
                    ctx.lineWidth = 3;
                    ctx.stroke();
                    return;
                } 
                
                if (hoverSubject === subject) {
                    ctx.strokeStyle = 'white'; // Set the stroke color to blue when hovered
                    ctx.lineWidth = 3;
                } else {
                    ctx.strokeStyle = 'red'; // Set the stroke color to red when not hovered
                    ctx.lineWidth = 2;
                }
        
                ctx.stroke();
            });
        };
    
        // Initial canvas rendering
        redrawCanvas();
        };
    }, [resultImg, results, currentSubject, mouseXpos, mouseYpos]);
  
  
    return (
        <div className='results-page'>
            <div className={'container'}>
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