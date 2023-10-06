import React, {useState} from 'react';
import {useNavigate} from 'react-router-dom';
import cl from './FileUploader.module.css';
import picture from '../../assets/icons/img.svg';
import Button from '../UI/button/Button';

const FileUploader = () => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [fileError, setFileError] = useState(false);

    const handleDrop = (event) => {
        event.preventDefault();
        const file = event.dataTransfer.files[0];
        setSelectedFile(file);
    };

    const handleFileSelect = (event) => {
        const file = event.target.files[0];

        if (file && file.type.split('/')[0] === 'image') {

            setFileError(false)
            setSelectedFile(file);
        } else {
            setFileError(true);
        }

    };

    const handleChooseAnotherFile = (event) => {
        // setSelectedFile(null);
        const file = event.target.files[0];
        setSelectedFile(file);
    };

    const navigate = useNavigate();

    const handleSubmit = () => {
        // console.log(selectedFile)
        navigate(`/search`);
    };

    const handleSearch = () => {
        // Perform search based on the selected file Replace this placeholder code with
        // your actual search logic
        if (selectedFile) {
            console.log('Searching for:', selectedFile.name);
        }
    };

    return (
        <div
            className={cl.file__selector}
            onDragOver={(event) => event.preventDefault()}
            onDrop={handleDrop}>
            {selectedFile
                ? (
                    <div className={cl.choose_another}>
                        <img
                            src={URL.createObjectURL(selectedFile)}
                            alt="Selected file"
                            style={{
                            width: '587px',
                            height: '363px',
                            borderRadius: '15px',
                            objectFit: 'cover'
                        }}/>
                        <div className={cl.button__container}>
                            <Button
                                onClick={handleChooseAnotherFile}
                                className={cl.choose__another__file__button}>
                                Выбрать другой файл
                            </Button>
                            <Button onClick={handleSubmit} className={cl.search__button}>
                                Поиск
                            </Button>
                        </div>
                    </div>
                )
                : (
                    <div>
                        <div className={cl.picture__selected__img}>
                            <img src={picture} className={cl.picture__select}/>
                            {fileError ? <p className={cl.file_error_text}>Данный тип файлов не поддерживается</p> : null}
                            <p className={cl.file__text}>Перетащите файл </p>
                            <p className={cl.file__text__or}>или</p>
                            <label htmlFor="fileInput" className={cl.custom__file__input}>
                                Выберите файл
                                <input
                                    type="file"
                                    id="fileInput"
                                    onChange={handleFileSelect}
                                    className={cl.hidden__input}/>
                            </label>
                        </div>
                    </div>
                )}
        </div>
    );
};

export default FileUploader;
