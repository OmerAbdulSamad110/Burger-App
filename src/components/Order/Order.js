import React from 'react';
import Styles from './Order.module.css';

function Order(props) {
    const ingredients = [];
    for (let key in props.ingredients) {
        if (props.ingredients[key] > 0) {
            ingredients.push({
                name: key,
                amount: props.ingredients[key]
            });
        }
    }
    const ingredientsOutput = ingredients.map(ingredient => {
        return <span key={ingredient.name}>{ingredient.name} ({ingredient.amount})</span>
    });
    return (
        <div className={Styles['Order']}>
            <div className={Styles['Ingredients']}>
                <div>Ingredients:</div>
                <div>{ingredientsOutput}</div>
            </div>
            <p>Price: <strong>{props.totalPrice.toFixed(2)} Rs</strong></p>
        </div>
    )
}

export default Order
