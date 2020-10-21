import React from 'react';
import Styles from './NavItem.module.css';
import { NavLink } from 'react-router-dom';

function NavItem(props) {
    return (
        <li className={Styles['NavItem']}>
            <NavLink activeClassName={Styles['active']} exact to={props.link}>{props.children}</NavLink>
        </li>
    )
}

export default NavItem