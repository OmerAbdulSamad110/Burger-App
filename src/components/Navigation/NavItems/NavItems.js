import React from 'react';
import Styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

function NavItems(props) {
    return (
        <ul className={Styles['NavItems']}>
            <NavItem link="/">Burger Builder</NavItem>
            <NavItem link="/orders">Orders</NavItem>
        </ul>
    )
};
export default NavItems
