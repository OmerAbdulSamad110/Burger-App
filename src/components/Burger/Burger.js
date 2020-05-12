import React from 'react';
import Styles from './Burger.module.css';
import Ingredient from './Ingredient/Ingredient';

function Burger(props) {
    let transFormIngredients = Object.keys(props.ingredients).map(key => {
        return [...Array(props.ingredients[key])].map((_, index) =>
            <Ingredient key={key + index} type={key} />
        );
    })
        // It flatten the Array(1), Array(2) into [{1}, {2}]
        // read about reduce and all array func
        .reduce((arr, el) => {
            return arr.concat(el);
        }, []);
    if (transFormIngredients.length === 0) {
        transFormIngredients = <p>Please add ingredients!</p>
    }
    return (
        <div className={Styles['Burger']}>
            <Ingredient type="bread-top" />
            {transFormIngredients}
            <Ingredient type="bread-bottom" />
        </div>
    )
}

export default Burger
