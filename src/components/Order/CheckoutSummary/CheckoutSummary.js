import React from 'react';
import Styles from './CheckoutSummary.module.css';
import Burger from '../../Burger/Burger';
import Button from '../../UI/Button/Button';

function CheckoutSummary(props) {
    return (
        <div className={Styles['CheckoutSummary']}>
            <h1>We hope it tastes well!</h1>
            <div className={Styles['Burger']}>
                <Burger ingredients={props.ingredients} />
            </div>
            <div className={Styles['Btn-flex']}>
                <Button
                    btnType="Danger"
                    click={props.back}>Back</Button>
                <Button
                    btnType="Success"
                    click={props.continue}>Continue</Button>
            </div>
        </div>
    )
};

export default CheckoutSummary
