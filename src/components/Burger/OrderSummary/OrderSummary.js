import React, { Fragment } from 'react';
import Button from '../../UI/Button/Button';

function OrderSummary(props) {
    const ingredientList = [];
    Object.keys(props.ingredients).forEach((key, index) => {
        if (props.ingredients[key] > 0) {
            ingredientList.push(<li key={index}><span style={{ textTransform: 'capitalize' }}>{key}:</span> {props.ingredients[key]}</li>);
        }
    });
    return (
        <Fragment>
            <h3>Your Order</h3>
            <p>Burger with the following ingredients</p>
            <ul>
                {ingredientList}
            </ul>
            <p>Price: <strong>{props.price.toFixed(2)} Rs</strong></p>
            <p>Continue to checkout?</p>
            <Button
                click={props.continue}
                btnType="Success">Continue</Button>
            <Button
                click={props.togglePurchasing}
                btnType="Danger">Cancel</Button>
        </Fragment>
    );
}

export default OrderSummary
