import React from 'react';
import Styles from './NavItem.module.css';

function NavItem(props) {
    return (
        <li className={Styles['NavItem']}>
            <a
                className={props.active ? Styles['active'] : null}
                href={props.link}>{props.children}</a>
        </li>
    )
}

export default NavItem