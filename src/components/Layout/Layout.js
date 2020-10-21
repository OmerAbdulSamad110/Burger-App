import React, { Fragment, useState } from 'react';
import Styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

function Layout(props) {
    const [showDrawer, setShowDrawer] = useState(false)

    const toggleDrawerHandler = () => {
        setShowDrawer(!showDrawer);
    }

    return (
        <Fragment>
            <Toolbar
                isAuth={props.isAuth}
                toggleDrawer={toggleDrawerHandler} />
            {showDrawer ?
                <SideDrawer
                    isAuth={props.isAuth}
                    showDrawer={showDrawer}
                    toggleDrawer={toggleDrawerHandler} /> : null}
            <main className={Styles['Content']}>
                {props.children}
            </main>
        </Fragment>
    );
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.userId !== null
    }
}

export default connect(mapStateToProps)(Layout);
