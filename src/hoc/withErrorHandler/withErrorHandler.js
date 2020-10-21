import React, { Fragment, useEffect, useState, useCallback } from 'react';
import Modal from '../../components/UI/Modal/Modal';

function withErrorHandler(WrappedComponent, axios) {
    return function (props) {
        const [error, setError] = useState(null);

        const reqInterceptor = axios.interceptors.request.use(request => {
            setError(null);
            return request;
        });

        const resInterceptor = axios.interceptors.response.use(
            function (res) {
                return res;
            },
            function (error) {
                console.log(error);
                setError(error);
            });

        useEffect(function () {
            return function () {
                axios.interceptors.request.eject(reqInterceptor);
                axios.interceptors.response.eject(resInterceptor);
            };
        }, [reqInterceptor, resInterceptor]);

        const errorConfirmHandler = useCallback(function () {
            setError(null);
        }, []);
        return (
            <Fragment>
                {error ?
                    <Modal
                        show={error != null}
                        modalClose={errorConfirmHandler}>
                        <p>{error.message}</p>
                    </Modal> : null
                }
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}

export default withErrorHandler
