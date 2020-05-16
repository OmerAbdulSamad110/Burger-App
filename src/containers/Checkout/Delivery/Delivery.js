import React, { Component } from 'react';
import Styles from './Delivery.module.css';
import Button from '../../../components/UI/Button/Button';
import axios from '../../../axios-order';
import Spinner from '../../../components/UI/Spinner/Spinner';
import Form from '../../../components/UI/Form/Form';

class Delivery extends Component {
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
                    required: true
                },
                valid: false,
                touched: false,
                value: ''
            },
            number: {
                elementType: 'input',
                elementConfig: {
                    type: 'text',
                    placeholder: 'Enter your number'
                },
                identify: { name: 'number', id: 'number' },
                validation: {
                    required: true,
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
        loading: false,
        formValid: false
    }

    checkValidation(value, rules) {
        let isValid = true;
        if (!rules) {
            return isValid;
        }
        if (rules.required) {
            isValid = value.trim() !== '' && isValid;
        }
        if (rules.minLength) {
            isValid = value.trim().length >= rules.minLength && isValid;
        }
        if (rules.maxLength) {
            isValid = value.trim().length <= rules.maxLength && isValid;
        }
        return isValid;
    }

    formChangeHandler = (type, event) => {
        const newOrderForm = { ...this.state.orderForm };
        const element = { ...newOrderForm[type] };
        element.value = event.target.value;
        const rules = { ...element.validation };
        element.valid = this.checkValidation(element.value, rules);
        element.touched = true;
        newOrderForm[type] = element;
        let formValid = true;
        for (let key in newOrderForm) {
            formValid = newOrderForm[key].valid && formValid;
        }
        this.setState({ orderForm: newOrderForm, formValid: formValid });
    }

    orderHandler = (event) => {
        event.preventDefault();
        this.setState({ loading: true });
        let formData = {};
        for (let key in this.state.orderForm) {
            formData[key] = this.state.orderForm[key].value;
        }
        const order = {
            ingredients: this.props.ingredients,
            price: this.props.totalPrice,
            orderData: formData
        };
        axios.post('/orders.json', order)
            .then(response => {
                if (response.status === 200) {
                    this.setState({ loading: false });
                    this.props.history.push('/');
                }
            })
            .catch(error => {
                this.setState({ loading: false });
                console.log(error);
            });
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
        if (this.state.loading) {
            form = <Spinner />;
        }
        return (
            <div className={Styles['Delivery']}>
                <h4 className={Styles['Heading']}>Enter your delivery information</h4>
                {form}
            </div>
        )
    }
}

export default Delivery
