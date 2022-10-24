/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PagesService {

    /**
     * Grab the authenticated user
     * @returns any Returns a user
     * @throws ApiError
     */
    public static getPage(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/page/',
            errors: {
                400: `Bad Request`,
                404: `Not Found`,
            },
        });
    }

    /**
     * Update the authenticated user
     * @param body
     * @returns any Returns the updated page
     * @throws ApiError
     */
    public static putPagePageEntries(
        body?: {
            pageEntries?: any;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/page/pageEntries',
            body: body,
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
