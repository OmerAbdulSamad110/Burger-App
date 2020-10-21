import React, { Fragment, useState, useEffect } from 'react';
import Styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import Form from '../../components/UI/Form/Form';
import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
import axios from '../../axios-auth';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateObject, checkValidation } from '../../shared/utility';

function Auth(props) {

    const [authForm, setAuthForm] = useState({
        email: {
            elementType: 'input',
            elementConfig: {
                type: 'email',
                placeholder: 'Enter your email'
            },
            identify: { name: 'email', id: 'email' },
            validation: {
                required: true,
                isEmail: true,
            },
            valid: false,
            touched: false,
            value: ''
        },
        password: {
            elementType: 'input',
            elementConfig: {
                type: 'password',
                placeholder: 'Enter your password'
            },
            identify: { name: 'password', id: 'password' },
            validation: {
                required: true,
                minLength: 6,
                maxLength: 12
            },
            valid: false,
            touched: false,
            value: ''
        }
    });

    const [formValid, setFormValid] = useState(false);
    const [isSignup, setIsSignup] = useState(true);

    const { buildingBurger, authRedirectPath, onSetAuthRedirectPath } = props;
    useEffect(() => {
        if (!buildingBurger && authRedirectPath !== '/') {
            onSetAuthRedirectPath();
        }
    }, [buildingBurger, authRedirectPath, onSetAuthRedirectPath])


    const formChangeHandler = (event, type) => {
        const newAuthForm = updateObject(
            authForm,
            {
                [type]: updateObject(authForm[type], {
                    value: event.target.value,
                    valid: checkValidation(
                        event.target.value,
                        authForm[type].validation
                    ),
                    touched: true
                })
            }
        )
        checkWholeForm(newAuthForm)
    }

    const checkWholeForm = (form = authForm) => {
        let formValid = true;
        for (let key in form) {
            formValid = form[key].valid && formValid;
        }
        setAuthForm(form);
        setFormValid(formValid);
    }

    const authHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let key in authForm) {
            formData[key] = authForm[key].value;
        }
        formData['isSignup'] = isSignup;
        props.onAuth(formData);
    }

    const authFormChangeHandler = () => {
        setIsSignup(!isSignup);
    }

    let formElementArray = [];
    for (let key in authForm) {
        formElementArray.push({
            id: key,
            label: authForm[key].elementConfig.label || key,
            type: authForm[key].elementType,
            identify: authForm[key].identify,
            config: authForm[key].elementConfig,
            value: authForm[key].value,
            valid: authForm[key].valid,
            touched: authForm[key].touched,
        })
    }
    let errorMessage = null;
    if (props.error) {
        errorMessage = <p>{props.error.message}</p>
    }

    let form = (
        <Fragment>
            <form onSubmit={authHandler}>
                {errorMessage}
                {formElementArray.map(element =>
                    <Form
                        key={element.id}
                        label={element.label}
                        type={element.type}
                        identify={element.identify}
                        config={element.config}
                        value={element.value}
                        valid={element.valid}
                        touched={element.touched}
                        change={event => formChangeHandler(event, element.id)} />
                )}
                <Button
                    btnType={'Success'}
                    disable={!formValid}>Submit</Button>
            </form>
            <Button
                btnType={'Danger'}
                click={authFormChangeHandler}>Switch to {isSignup ? 'SignIn' : 'SignUp'}</Button>
        </Fragment>
    );
    if (props.loading) {
        form = <Spinner />
    }
    return (
        <div className={Styles['Auth']}>
            {!props.isAuth ? form : <Redirect to={authRedirectPath} />}
        </div>
    )
}

const mapStateToProps = state => {
    return {
        loading: state.auth.loading,
        error: state.auth.error,
        isAuth: state.auth.userId !== null,
        buildingBurger: state.burgerBuilder.building,
        authRedirectPath: state.auth.authRedirectPath
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onAuth: (authData) => dispatch(actions.auth(authData)),
        onSetAuthRedirectPath: () => dispatch(actions.setAuthRedirectPath('/'))
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(withErrorHandler(Auth, axios))
