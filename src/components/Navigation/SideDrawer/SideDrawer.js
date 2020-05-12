import React, { Fragment } from 'react';
import Styles from './SideDrawer.module.css';
import Logo from '../../Logo/Logo';
import NavItems from '../NavItems/NavItems';
import Backdrop from '../../UI/Backdrop/Backdrop';

function SideDrawer(props) {
    return (
        <Fragment>
            <Backdrop
                show={props.showDrawer}
                close={props.toggleDrawer} />
            <div className={Styles['SideDrawer']}>
                <Logo styled={Styles['Logo']} />
                <nav>
                    <NavItems />
                </nav>
            </div>
        </Fragment>
    )
}

export default SideDrawer
