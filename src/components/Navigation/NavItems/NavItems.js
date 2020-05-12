import React from 'react';
import Styles from './NavItems.module.css';
import NavItem from './NavItem/NavItem';

function NavItems(props) {
    return (
        <ul className={Styles['NavItems']}>
            <NavItem
                link="/"
                active
            >Burger Builder</NavItem>
            <NavItem
                link="/"
            >CheckOut</NavItem>
        </ul>
    )
};
export default NavItems
