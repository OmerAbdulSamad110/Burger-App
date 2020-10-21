import React from 'react';
import Styles from './DrawerToggle.module.css';

function DrawerToggle(props) {
    return (
        <div
            className={Styles['DrawerToggle']}
            onClick={props.toggleDrawer}>
            <div></div>
            <div></div>
            <div></div>
        </div>
    )
}

export default DrawerToggle
