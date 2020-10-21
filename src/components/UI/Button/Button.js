import React from 'react';
import Styles from './Button.module.css';

function Button(props) {
    return (
        <button
            className={`${Styles['Button']} 
            ${Styles[props.btnType]}`}
            disabled={props.disable}
            onClick={props.click}>{props.children}</button>
    );
}

export default Button
