import React from 'react';
import cl from './Header.module.css';
import logo from '../../assets/icons/afm.svg';
import profile from '../../assets/icons/pic.png';
import { Link } from 'react-router-dom';

function Header() {
    return (
        <div className={cl.header__wrapper}>
            <div className={cl.container}>
                <div className={cl.header}>
                    <Link to='/'>
                        <div className={cl.logo}>
                            <img src={logo} alt="" />
                            <p className={cl.logo__text}>ABFM</p>
                        </div>
                    </Link>
                    <div className={cl.profile}>
                        <img src={profile} alt="" />
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Header;