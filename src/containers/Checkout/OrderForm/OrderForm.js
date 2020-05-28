import React, { Component } from 'react';
import Styles from './OrderForm.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Form/Form';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

class OrderForm extends Component {
    state = {
        orderForm: {
            name: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your name'
                },
                identify: { name: 'name', id: 'name' },
                validation: {
                    required: true,
                    minLength: 3,
                    maxLength: 10
                },
                valid: false,
                touched: false,
                value: ''
            },
            email: {
                elementType: 'input',
                elementConfig: {
                    type: 'email',
                    placeholder: 'Enter your email'
                },
                identify: { name: 'email', id: 'email' },
                validation: {
                    required: true,
                    isEmail: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            phone: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your phone number'
                },
                identify: { name: 'phone', id: 'phone' },
                validation: {
                    required: true,
                    isNumeric: true,
                    minLength: 11,
                    maxLength: 11
                },
                valid: false,
                touched: false,
                value: ''
            },
            address: {
                elementType: 'textarea',
                elementConfig: {
                    placeholder: 'Enter your address'
                },
                identify: { name: 'address', id: 'address' },
                validation: {
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            method: {
                elementType: 'select',
                elementConfig: {
                    label: 'method of payment',
                    options: [
                        { value: 'cod', display: 'Cash on delivery' },
                        { value: 'pickup', display: 'Pick Up' },
                    ]
                },
                identify: { name: 'method', id: 'method' },
                validation: {
                    required: true
                },
                valid: true,
                touched: false,
                value: 'cod',
            }
        },
        formValid: false
    }

    formChangeHandler = (type, event) => {
        const newOrderForm = updateObject(
            this.state.orderForm,
            {
                [type]: updateObject(this.state.orderForm[type], {
                    value: event.target.value,
                    valid: checkValidation(
                        event.target.value,
                        this.state.orderForm[type].validation
                    ),
                    touched: true
                })
            }
        )
        let formValid = true;
        for (let key in newOrderForm) {
            formValid = newOrderForm[key].valid && formValid;
        }
        this.setState({ orderForm: newOrderForm, formValid: formValid });
    }

    orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData,
            userId: this.props.userId
        };
        this.props.onOrderBurger(order, this.props.token);
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.orderForm) {
            formElementArray.push({
                id: key,
                label: this.state.orderForm[key].elementConfig.label || key,
                type: this.state.orderForm[key].elementType,
                identify: this.state.orderForm[key].identify,
                config: this.state.orderForm[key].elementConfig,
                value: this.state.orderForm[key].value,
                valid: this.state.orderForm[key].valid,
                touched: this.state.orderForm[key].touched,
            })
        }
        let form = (
            <form onSubmit={this.orderHandler}>
                {formElementArray.map(element =>
                    <Form
                        key={element.id}
                        label={element.label}
                        type={element.type}
                        identify={element.identify}
                        config={element.config}
                        value={element.value}
                        valid={element.valid}
                        touched={element.touched}
                        change={this.formChangeHandler.bind(this, element.id)} />
                )}
                <Button
                    btnType={'Success'}
                    disable={!this.state.formValid}>Order</Button>
            </form>
        );
        if (this.props.loading) {
            form = <Spinner />;
        }
        return (
            <div className={Styles['OrderForm']}>
                <h4 className={Styles['Heading']}>Enter your OrderForm information</h4>
                {form}
            </div>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        loading: state.order.loading,
        token: state.auth.token,
        userId: state.auth.userId
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onOrderBurger: (orderData, token) => dispatch(actions.purchaseBurger(orderData, token))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(OrderForm, axios))
