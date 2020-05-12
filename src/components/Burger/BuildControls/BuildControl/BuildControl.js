import React from 'react';
import Styles from './BuildControl.module.css';

function BuildControl(props) {
    return (
        <div className={Styles['BuildControl']}>
            <div className={Styles['Label']}>{props.label}</div>
            <button
                className={Styles['Less']}
                onClick={props.remove}
                disabled={props.disabled}>Less</button>
            <button
                className={Styles['More']}
                onClick={props.add}>More</button>
        </div>
    )
}

export default BuildControl
