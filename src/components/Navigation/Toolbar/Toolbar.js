import React from 'react';
import Styles from './Toolbar.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import DrawerToggle from '../SideDrawer/DrawerToggle/DrawerToggle';

function Toolbar(props) {
    return (
        <header className={Styles['Toolbar']}>
            <DrawerToggle
                toggleDrawer={props.toggleDrawer} />
            <Logo styled={Styles['Logo']} />
            <nav>
                <NavItems isAuth={props.isAuth} />
            </nav>
        </header>
    );
}

export default Toolbar
