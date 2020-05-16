import React, { Component } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route } from 'react-router';
import Delivery from './Delivery/Delivery';

class Checkout extends Component {
    state = {
        ingredients: {},
        totalPrice: 0
    }

    componentDidMount() {
        if (this.props.location.ingredients &&
            this.props.location.totalPrice) {
            this.setState({
                ingredients: this.props.location.ingredients,
                totalPrice: this.props.location.totalPrice
            });
        }
        else {
            this.props.history.replace('/');
        }
    }

    goBackHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/delivery');
    }

    render() {
        return (
            <div>
                <CheckoutSummary
                    ingredients={this.state.ingredients}
                    back={this.goBackHandler}
                    continue={this.continueHandler} />;
                <Route path={`${this.props.match.path}/delivery`}
                    render={(props) => (<Delivery {...this.state} {...props} />)} />
            </div>
        )
    }
}

export default Checkout;