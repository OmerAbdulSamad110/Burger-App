import React, { Fragment, useState, useEffect } from 'react'
import Burger from '../../components/Burger/Burger';
import BuildControls from '../../components/Burger/BuildControls/BuildControls';
import Modal from '../../components/UI/Modal/Modal';
import OrderSummary from '../../components/Burger/OrderSummary/OrderSummary';
import Spinner from '../../components/UI/Spinner/Spinner';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import { connect } from 'react-redux';
import * as actions from '../../store/actions/index';
import axios from '../../axios-order';

function BurgerBuilder(props) {


    const [purchasing, setPurchasing] = useState(false);
    const { onInitIngredients } = props;
    useEffect(() => {
        onInitIngredients();
    }, [onInitIngredients]);

    const updatePurchaseState = (ingredients) => {
        let sum = 0;
        Object.values(ingredients).forEach(val => {
            sum += val;
        });
        return sum > 0;
    }

    const togglePurchasingHandler = () => {
        if (!props.isAuth) {
            props.onSetAuthRedirectPath('/checkout');
            props.history.push('/auth');
        } else {
            setPurchasing(!purchasing);
        }
    }

    const continuePurchaseHandler = () => {
        props.onPurchaseInit();
        props.history.push('/checkout');
    }

    const disabledInfo = { ...props.ingredients };
    Object.keys(disabledInfo).forEach(key => {
        disabledInfo[key] = disabledInfo[key] === 0;
    });

    let burger = <Spinner />;
    if (props.ingredients && props.totalPrice) {
        burger = (
            <Fragment>
                <Burger ingredients={props.ingredients} />
                <BuildControls
                    disabled={disabledInfo}
                    price={props.totalPrice}
                    purchasable={updatePurchaseState(props.ingredients)}
                    add={props.onAddIngredient}
                    remove={props.onRemoveIngredient}
                    togglePurchasing={togglePurchasingHandler} />
            </Fragment>);
    }

    return (
        <Fragment>
            {purchasing ?
                (<Modal
                    show={purchasing}
                    modalClose={togglePurchasingHandler}>
                    <OrderSummary
                        ingredients={props.ingredients}
                        price={props.totalPrice}
                        order={continuePurchaseHandler}
                        togglePurchasing={togglePurchasingHandler} />
                </Modal>) : null}
            {burger}

        </Fragment>
    )
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
