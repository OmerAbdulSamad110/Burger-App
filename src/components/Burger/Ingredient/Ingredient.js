import React from 'react';
import PropTypes from 'prop-types';
import Styles from './Ingredient.module.css';

function Ingredient(props) {
    let ingredient = null;
    switch (props.type) {
        case ('bread-bottom'):
            ingredient = <div className={Styles['BreadBottom']}></div>;
            break;
        case ('bread-top'):
            ingredient = (
                <div className={Styles['BreadTop']}>
                    <div className={Styles['Seeds1']}></div>
                    <div className={Styles['Seeds2']}></div>
                </div>
            );
            break;
        case ('meat'):
            ingredient = <div className={Styles['Meat']}></div>;
            break;
        case ('cheese'):
            ingredient = <div className={Styles['Cheese']}></div>;
            break;
        case ('salad'):
            ingredient = <div className={Styles['Salad']}></div>;
            break;
        case ('strips'):
            ingredient = <div className={Styles['Strips']}></div>;
            break;
        default:
            ingredient = null;
            break;
    }
    return ingredient;
}

Ingredient.propTypes = {
    type: PropTypes.string.isRequired,
};

export default Ingredient
