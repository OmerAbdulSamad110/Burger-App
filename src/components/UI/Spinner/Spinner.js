import React from 'react';
import Styles from './Spinner.module.css';

function Spinner(props) {
    return (
        <div className={Styles['loader']}>Loading...</div>
    )
}

export default Spinner
