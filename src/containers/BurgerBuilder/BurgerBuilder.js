import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import axios from '../../axios-order';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';

// If data came from db table
const ingredientPrice = {
    salad: 30,
    strips: 50,
    cheese: 50,
    meat: 100
};

class BurgerBuilder extends Component {
    state = {
        ingredients: null,
        totalPrice: 200,
        purchasable: false,
        purchasing: false
    }

    componentDidMount() {
        axios.get('/ingredients.json')
            .then(response => {
                if (response.status === 200) {
                    this.setState({ ingredients: response.data });
                }
            })
            .catch(error => {
                console.log(error.message);
            });
    }

    updatePurchaseState(ingredients) {
        let sum = 0;
        Object.values(ingredients).forEach(val => {
            sum += val;
        });
        this.setState({ purchasable: sum > 0 });
    }

    addIngredientHandler = (type) => {
        const updatedCount = this.state.ingredients[type] + 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice + ingredientPrice[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    removeIngredientHandler = (type) => {
        const oldCount = this.state.ingredients[type];
        if (oldCount === 0) {
            return;
        }
        const updatedCount = oldCount - 1;
        const updatedIngredients = { ...this.state.ingredients };
        updatedIngredients[type] = updatedCount;
        const newPrice = this.state.totalPrice - ingredientPrice[type];
        this.setState({
            totalPrice: newPrice,
            ingredients: updatedIngredients
        });
        this.updatePurchaseState(updatedIngredients);
    }

    togglePurchasingHandler = () => {
        this.setState((prevState) => {
            return { purchasing: !prevState.purchasing }
        });
    }

    continuePurchaseHandler = () => {
        this.props.history.push({
            pathname: '/checkout',
            ingredients: this.state.ingredients,
            totalPrice: this.state.totalPrice
        });
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        Object.keys(disabledInfo).forEach(key => {
            disabledInfo[key] = disabledInfo[key] === 0;
        });

        let burger = <Spinner />;
        if (this.state.ingredients) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.state.ingredients} />
                    <BuildControls
                        disabled={disabledInfo}
                        price={this.state.totalPrice}
                        purchasable={this.state.purchasable}
                        add={this.addIngredientHandler}
                        remove={this.removeIngredientHandler}
                        togglePurchasing={this.togglePurchasingHandler} />
                </Fragment>);
        }

        return (
            <Fragment>
                {this.state.purchasing ?
                    (<Modal
                        show={this.state.purchasing}
                        modalClose={this.togglePurchasingHandler}>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            order={this.continuePurchaseHandler}
                            togglePurchasing={this.togglePurchasingHandler} />
                    </Modal>) : null}
                {burger}

            </Fragment>
        )
    }
}

export default withErrorHandler(BurgerBuilder, axios);
