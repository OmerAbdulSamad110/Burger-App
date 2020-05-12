import React, { Fragment } from 'react';
import Styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
    return (
        <Fragment>
            <Backdrop
                show={props.purchasing}
                close={props.togglePurchasing} />
            <div className={Styles['Modal']}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default Modal
