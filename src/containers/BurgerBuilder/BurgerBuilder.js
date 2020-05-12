import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';

// If data came from db table
const ingredientPrice = {
    salad: 30,
    strips: 50,
    cheese: 50,
    meat: 100
};

class BurgerBuilder extends Component {
    state = {
        ingredients: {
            salad: 0,
            strips: 0,
            cheese: 0,
            meat: 0
        },
        totalPrice: 200,
        purchasable: false,
        purchasing: false
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
        alert('Continue');
    }

    render() {
        const disabledInfo = { ...this.state.ingredients };
        Object.keys(disabledInfo).forEach(key => {
            disabledInfo[key] = disabledInfo[key] === 0;
        });
        return (
            <Fragment>
                {this.state.purchasing ?
                    (<Modal
                        purchasing={this.state.purchasing}
                        togglePurchasing={this.togglePurchasingHandler}>
                        <OrderSummary
                            ingredients={this.state.ingredients}
                            price={this.state.totalPrice}
                            togglePurchasing={this.togglePurchasingHandler} />
                    </Modal>) : null}
                <Burger ingredients={this.state.ingredients} />
                <BuildControls
                    disabled={disabledInfo}
                    price={this.state.totalPrice}
                    purchasable={this.state.purchasable}
                    add={this.addIngredientHandler}
                    remove={this.removeIngredientHandler}
                    togglePurchasing={this.togglePurchasingHandler} />
            </Fragment>
        )
    }
}

export default BurgerBuilder;
