import React, { useEffect } from 'react';
import Order from '../../components/Order/Order';
import Styles from './Orders.module.css';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

function Orders(props) {

    const { onFetchOrders, token, userId } = props;
    useEffect(() => {
        onFetchOrders(token, userId);
    }, [onFetchOrders, token, userId]);


    let order = <Spinner />;
    if (!props.loading) {
        if (props.orders.length > 0) {
            order = (
                props.orders.map(order => {
                    return <Order
                        key={order.id}
                        ingredients={order.ingredients}
                        totalPrice={+order.price} />
                })
            );
        } else {
            order = <p className={Styles['noOrder']}>Please add burgers to order</p>;
        }
    }
    return (
        <div>
            {order}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: (token, userId) => dispatch(actions.fetchOrders(token, userId))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
