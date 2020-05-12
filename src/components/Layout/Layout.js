import React, { Fragment, Component } from 'react';
import Styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';

class Layout extends Component {
    // console.log(this.props.showDrawer, this.props.showBackdrop);
    state = {
        showDrawer: false
    }

    toggleDrawerHandler = () => {
        this.setState((prevState) => {
            return { showDrawer: !prevState.showDrawer }
        })
    }

    render() {
        return (
            <Fragment>
                <Toolbar
                    toggleDrawer={this.toggleDrawerHandler} />
                {this.state.showDrawer ?
                    <SideDrawer
                        showDrawer={this.state.showDrawer}
                        toggleDrawer={this.toggleDrawerHandler} /> : null}
                <main className={Styles['Content']}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

export default Layout;
