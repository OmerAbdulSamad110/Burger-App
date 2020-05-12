import React from 'react';
import Styles from './BuildControls.module.css';
import BuildControl from './BuildControl/BuildControl';

// If data came from db table
const controls = [
    { label: 'Salad', type: 'salad' },
    { label: 'Strips', type: 'strips' },
    { label: 'Cheese', type: 'cheese' },
    { label: 'Meat', type: 'meat' }
];

function BuildControls(props) {
    return (
        <div className={Styles['BuildControls']}>
            <h4>
                Current Price: <strong>{props.price.toFixed(2)} Rs</strong>
            </h4>
            {controls.map(control => (
                <BuildControl
                    key={control.type}
                    {...control}
                    add={() => props.add(control.type)}
                    remove={() => props.remove(control.type)}
                    disabled={props.disabled[control.type]} />
            ))}
            <button
                className={Styles['OrderButton']}
                disabled={!props.purchasable}
                onClick={props.togglePurchasing}>Order Now</button>
        </div>
    )
};

export default BuildControls
