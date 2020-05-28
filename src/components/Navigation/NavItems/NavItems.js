import React, { Fragment } from 'react';
import Styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

function NavItems(props) {
    return (
        <ul className={Styles['NavItems']}>
            <NavItem link="/">Burger Builder</NavItem>
            {props.isAuth ?
                (<Fragment>
                    <NavItem link="/orders">Orders</NavItem>
                    <NavItem link="/logout">Logout</NavItem>
                </Fragment>) :
                <NavItem link="/auth">Auth</NavItem>
            }
        </ul>
    )
};
export default NavItems
