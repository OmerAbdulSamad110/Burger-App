import React, { Component, Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router';
import OrderForm from './OrderForm/OrderForm';
import { connect } from 'react-redux';

class Checkout extends Component {

    goBackHandler = () => {
        this.props.history.goBack();
    }

    continueHandler = () => {
        this.props.history.replace('/checkout/order');
    }

    render() {
        let summary = <Redirect to='/' />;
        if (this.props.ingredients && !this.props.purchased) {
            summary = (
                <Fragment>
                    <CheckoutSummary
                        ingredients={this.props.ingredients}
                        back={this.goBackHandler}
                        continue={this.continueHandler} />;
                    <Route path={`${this.props.match.path}/order`}
                        component={OrderForm} />
                </Fragment>
            );
        }
        return (
            <div>
                {summary}
            </div>
        );

    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);