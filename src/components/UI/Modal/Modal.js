import React, { Fragment, memo } from 'react';
import Styles from './Modal.module.css';
import Backdrop from '../Backdrop/Backdrop';

function Modal(props) {
    return (
        <Fragment>
            <Backdrop
                show={props.show}
                close={props.modalClose} />
            <div className={Styles['Modal']}>
                {props.children}
            </div>
        </Fragment>
    )
}

export default memo(Modal, (prevProps, nextProps) =>
    nextProps.show === prevProps.show && nextProps.children === prevProps.children
)
