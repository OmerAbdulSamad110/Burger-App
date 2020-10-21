import React, { Fragment } from 'react';
import CheckoutSummary from '../../components/Order/CheckoutSummary/CheckoutSummary';
import { Route, Redirect } from 'react-router';
import OrderForm from './OrderForm/OrderForm';
import { connect } from 'react-redux';

function Checkout(props) {

    const goBackHandler = () => {
        props.history.goBack();
    }

    const continueHandler = () => {
        props.history.replace('/checkout/order');
    }

    let summary = <Redirect to='/' />;
    if (props.ingredients && !props.purchased) {
        summary = (
            <Fragment>
                <CheckoutSummary
                    ingredients={props.ingredients}
                    back={goBackHandler}
                    continue={continueHandler} />;
                <Route path={`${props.match.path}/order`}
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

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        purchased: state.order.purchased
    }
}

export default connect(mapStateToProps)(Checkout);