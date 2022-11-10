/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class AnalyticService {

    /**
     * Submit an analytic entry
     * @returns any OK
     * @throws ApiError
     */
    public static postAnalyticSubmit(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/analytic/submit',
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
