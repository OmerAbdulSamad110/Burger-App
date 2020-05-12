import React from 'react';
import Styles from './Backdrop.module.css';

function Backdrop(props) {
    return (
        props.show ?
            <div
                className={Styles['Backdrop']}
                onClick={props.close}></div>
            : null
    );
}

export default Backdrop
