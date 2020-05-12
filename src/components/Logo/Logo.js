import React from 'react';
import Styles from './Logo.module.css';
import burgerLogo from '../../assets/images/logo.png';

function Logo(props) {
    return (
        <div className={`${Styles['Logo']} ${props.styled}`}>
            <img src={burgerLogo} alt="burger-app-logo" />
        </div>
    )
}

export default Logo