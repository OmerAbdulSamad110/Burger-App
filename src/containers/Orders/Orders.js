import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';

class Orders extends Component {

    componentDidMount() {
        this.props.onFetchOrders();
    }

    render() {

        let order = <Spinner />;
        if (!this.props.loading) {
            if (this.props.orders) {
                order = (
                    this.props.orders.map(order => {
                        return <Order
                            key={order.id}
                            ingredients={order.ingredients}
                            totalPrice={+order.price} />
                    })
                );
            } else {
                order = <p>Please add burgers to order</p>;
            }
        }
        return (
            <div>
                {order}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        orders: state.order.orders,
        loading: state.order.loading
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onFetchOrders: () => dispatch(actions.fetchOrders())
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Orders, axios));
