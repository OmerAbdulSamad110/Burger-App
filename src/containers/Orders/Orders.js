import React, { Component } from 'react';
import Order from '../../components/Order/Order';
import axios from '../../axios-order';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import Spinner from '../../components/UI/Spinner/Spinner';

class Orders extends Component {

    state = {
        orders: [],
        loading: true
    }

    componentDidMount() {
        axios.get('/orders.json')
            .then(response => {
                const orderData = [];
                for (let key in response.data) {
                    orderData.push({
                        ...response.data[key],
                        id: key
                    })
                }
                this.setState({ orders: orderData, loading: false });
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            })
    }

    render() {

        let order = <Spinner />;
        if (!this.state.loading) {
            if (this.state.orders) {
                order = (
                    this.state.orders.map(order => {
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

export default withErrorHandler(Orders, axios);
