import React, { useState } from 'react';
import Styles from './OrderForm.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Form/Form';
import withErrorHandler from '../../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../../store/actions/index';
import { updateObject, checkValidation } from '../../../shared/utility';

function OrderForm(props) {
    const [orderForm, setOrderForm] = useState({
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
    });
    const [formValid, setformValid] = useState(false);

    const formChangeHandler = (event, type) => {
        const newOrderForm = updateObject(
            orderForm,
            {
                [type]: updateObject(orderForm[type], {
                    value: event.target.value,
                    valid: checkValidation(
                        event.target.value,
                        orderForm[type].validation
                    ),
                    touched: true
                })
            }
        )
        let formValid = true;
        for (let key in newOrderForm) {
            formValid = newOrderForm[key].valid && formValid;
        }
        setOrderForm(newOrderForm);
        setformValid(formValid);
    }

    const orderHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let key in orderForm) {
            formData[key] = orderForm[key].value;
        }
        const order = {
            ingredients: props.ingredients,
            price: props.totalPrice,
            orderData: formData,
            userId: props.userId
        };
        props.onOrderBurger(order, props.token);
    }

    let formElementArray = [];
    for (let key in orderForm) {
        formElementArray.push({
            id: key,
            label: orderForm[key].elementConfig.label || key,
            type: orderForm[key].elementType,
            identify: orderForm[key].identify,
            config: orderForm[key].elementConfig,
            value: orderForm[key].value,
            valid: orderForm[key].valid,
            touched: orderForm[key].touched,
        })
    }
    let form = (
        <form onSubmit={orderHandler}>
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
                    change={event => formChangeHandler(event, element.id)} />
            )}
            <Button
                btnType={'Success'}
                disable={!formValid}>Order</Button>
        </form>
    );
    if (props.loading) {
        form = <Spinner />;
    }
    return (
        <div className={Styles['OrderForm']}>
            <h4 className={Styles['Heading']}>Enter your OrderForm information</h4>
            {form}
        </div>
    )
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
