import React, { Fragment, Component } from 'react';
import Styles from './Layout.module.css';
import Toolbar from '../Navigation/Toolbar/Toolbar';
import SideDrawer from '../Navigation/SideDrawer/SideDrawer';
import { connect } from 'react-redux';

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
                    isAuth={this.props.isAuth}
                    toggleDrawer={this.toggleDrawerHandler} />
                {this.state.showDrawer ?
                    <SideDrawer
                        isAuth={this.props.isAuth}
                        showDrawer={this.state.showDrawer}
                        toggleDrawer={this.toggleDrawerHandler} /> : null}
                <main className={Styles['Content']}>
                    {this.props.children}
                </main>
            </Fragment>
        );
    }
}

const mapStateToProps = state => {
    return {
        isAuth: state.auth.userId !== null
    }
}

export default connect(mapStateToProps)(Layout);
