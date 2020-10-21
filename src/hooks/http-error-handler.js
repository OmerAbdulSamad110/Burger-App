import { useState, useEffect } from 'react';

export default function (httpClient) {
    const [error, setError] = useState(null);

    const reqInterceptor = httpClient.interceptors.request.use(request => {
        setError(null);
        return request;
    });

    const resInterceptor = httpClient.interceptors.response.use(
        function (res) {
            return res;
        },
        function (err) {
            console.log(err);
            setError(err);
        });

    useEffect(function () {
        return function () {
            httpClient.interceptors.request.eject(reqInterceptor);
            httpClient.interceptors.response.eject(resInterceptor);
        };
    }, [httpClient.interceptors.request, httpClient.interceptors.response, reqInterceptor, resInterceptor]);

    const errorConfirmHandler = function () {
        setError(null)
    }

    return [error, errorConfirmHandler]
}
