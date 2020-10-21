import React, { Fragment } from 'react';
import Modal from '../../components/UI/Modal/Modal';
import useHttpErrorHandler from '../../hooks/http-error-handler';

function withErrorHandler(WrappedComponent, axios) {
    return function (props) {
        const [error, clearError] = useHttpErrorHandler(axios);
        return (
            <Fragment>
                {error ?
                    <Modal
                        show={error != null}
                        modalClose={clearError}>
                        <p>{error.message}</p>
                    </Modal> : null
                }
                <WrappedComponent {...props} />
            </Fragment>
        );
    }
}

export default withErrorHandler
