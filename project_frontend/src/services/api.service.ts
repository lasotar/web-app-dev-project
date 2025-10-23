import { throwError, of } from 'rxjs';
import { ajax, type AjaxRequest, AjaxError } from 'rxjs/ajax';
import { switchMap, catchError } from 'rxjs/operators';

const API_BASE_URL = 'http://localhost:8000/api/';

const tryRequest = <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any) => {
    const request: AjaxRequest = {
        url: API_BASE_URL + url,
        method,
        body,
        headers: {
        },
        async: true,
        timeout: 10000,
        crossDomain: true,
        withCredentials: true,
        responseType: 'json'
    };

    return ajax<T>(request).pipe(
        switchMap(response => {
            return of(response.response);
        }),
        catchError((error: AjaxError) => {
            console.error(error);
            return throwError(error);
        })
    )
}
export const createRequest = <T>(method: 'GET' | 'POST' | 'PUT' | 'DELETE', url: string, body?: any) => {
    return tryRequest<T>(method, url, body).pipe(
        catchError((error: AjaxError) => {
            if (error.status === 401) {
                return tryRequest('POST', 'Auth/refresh-token').pipe(
                    switchMap(() => tryRequest<T>(method, url, body))
                );
            }
            return throwError(error);
        })
    );
};

