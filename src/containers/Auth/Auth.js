import React, { Component, Fragment } from 'react';
import Styles from './Auth.module.css';
import Button from '../../components/UI/Button/Button';
import Spinner from '../../components/UI/Spinner/Spinner'
import Form from '../../components/UI/Form/Form';
// import withErrorHandler from '../../hoc/withErrorHandler/withErrorHandler';
// import axios from '../../axios-auth';
import * as actions from '../../store/actions/index';
import { connect } from 'react-redux';
import { Redirect } from 'react-router';
import { updateObject, checkValidation } from '../../shared/utility';

class Auth extends Component {
    state = {
        authForm: {
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
        },
        formValid: false,
        isSignup: true
    }

    componentDidMount() {
        this.checkWholeForm()
        if (!this.props.buildingBurger && this.props.authRedirectPath !== '/') {
            this.props.onSetAuthRedirectPath();
        }
    }

    formChangeHandler = (type, event) => {
        const newAuthForm = updateObject(
            this.state.authForm,
            {
                [type]: updateObject(this.state.authForm[type], {
                    value: event.target.value,
                    valid: checkValidation(
                        event.target.value,
                        this.state.authForm[type].validation
                    ),
                    touched: true
                })
            }
        )
        this.checkWholeForm(newAuthForm)
    }

    checkWholeForm = (form = this.state.authForm) => {
        let formValid = true;
        for (let key in form) {
            formValid = form[key].valid && formValid;
        }
        this.setState({ authForm: form, formValid: formValid });
    }

    authHandler = (event) => {
        event.preventDefault();
        let formData = {};
        for (let key in this.state.authForm) {
            formData[key] = this.state.authForm[key].value;
        }
        formData['isSignup'] = this.state.isSignup;
        this.props.onAuth(formData);
    }

    authFormChangeHandler = () => {
        this.setState(preState => {
            return { isSignup: !preState.isSignup }
        })
    }

    render() {
        let formElementArray = [];
        for (let key in this.state.authForm) {
            formElementArray.push({
                id: key,
                label: this.state.authForm[key].elementConfig.label || key,
                type: this.state.authForm[key].elementType,
                identify: this.state.authForm[key].identify,
                config: this.state.authForm[key].elementConfig,
                value: this.state.authForm[key].value,
                valid: this.state.authForm[key].valid,
                touched: this.state.authForm[key].touched,
            })
        }
        let errorMessage = null;
        if (this.props.error) {
            errorMessage = <p>{this.props.error.message}</p>
        }

        let form = (
            <Fragment>
                <form onSubmit={this.authHandler}>
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
                            change={this.formChangeHandler.bind(this, element.id)} />
                    )}
                    <Button
                        btnType={'Success'}
                        disable={!this.state.formValid}>Submit</Button>
                </form>
                <Button
                    btnType={'Danger'}
                    click={this.authFormChangeHandler}>Switch to {this.state.isSignup ? 'SignIn' : 'SignUp'}</Button>
            </Fragment>
        );
        if (this.props.loading) {
            form = <Spinner />
        }
        return (
            <div className={Styles['Auth']}>
                {!this.props.isAuth ? form : <Redirect to={this.props.authRedirectPath} />}
            </div>
        )
    }
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

export default connect(mapStateToProps, mapDispatchToProps)(Auth)
