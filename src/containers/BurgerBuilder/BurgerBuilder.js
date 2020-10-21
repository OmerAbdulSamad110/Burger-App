import React, { Component, Fragment } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

class BurgerBuilder extends Component {
    state = {
        purchasing: false
    }

    componentDidMount() {
        this.props.onInitIngredients();
    }

    updatePurchaseState(ingredients) {
        let sum = 0;
        Object.values(ingredients).forEach(val => {
            sum += val;
        });
        return sum > 0;
    }

    togglePurchasingHandler = () => {
        if (!this.props.isAuth) {
            this.props.onSetAuthRedirectPath('/checkout');
            this.props.history.push('/auth');
        } else {
            this.setState((prevState) => {
                return { purchasing: !prevState.purchasing }
            });
        }
    }

    continuePurchaseHandler = () => {
        this.props.onPurchaseInit();
        this.props.history.push('/checkout');
    }

    render() {
        const disabledInfo = { ...this.props.ingredients };
        Object.keys(disabledInfo).forEach(key => {
            disabledInfo[key] = disabledInfo[key] === 0;
        });

        let burger = <Spinner />;
        if (this.props.ingredients && this.props.totalPrice) {
            burger = (
                <Fragment>
                    <Burger ingredients={this.props.ingredients} />
                    <BuildControls
                        disabled={disabledInfo}
                        price={this.props.totalPrice}
                        purchasable={this.updatePurchaseState(this.props.ingredients)}
                        add={this.props.onAddIngredient}
                        remove={this.props.onRemoveIngredient}
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
                            ingredients={this.props.ingredients}
                            price={this.props.totalPrice}
                            order={this.continuePurchaseHandler}
                            togglePurchasing={this.togglePurchasingHandler} />
                    </Modal>) : null}
                {burger}

            </Fragment>
        )
    }
}

const mapStateToProps = state => {
    return {
        ingredients: state.burgerBuilder.ingredients,
        totalPrice: state.burgerBuilder.totalPrice,
        error: state.burgerBuilder.error,
        isAuth: state.auth.userId !== null
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAddIngredient: (name) => dispatch(actions.addIngredient(name)),
        onRemoveIngredient: (name) => dispatch(actions.removeIngredient(name)),
        onInitIngredients: () => dispatch(actions.initIngredients()),
        onPurchaseInit: () => dispatch(actions.purchaseBurgerInit()),
        onSetAuthRedirectPath: (path) => dispatch(actions.setAuthRedirectPath(path))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(BurgerBuilder, axios));
