/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PagesService {

    /**
     * Grab the authenticated user
     * @param authorization
     * @returns any Returns a user
     * @throws ApiError
     */
    public static getPage(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/page/',
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Grab the user
     * @param username
     * @returns any Returns the user's page
     * @throws ApiError
     */
    public static getPage1(
        username: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/page/{username}',
            path: {
                'username': username,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update the authenticated user\'s page.
     * @param authorization
     * @param body
     * @returns any Returns the updated page
     * @throws ApiError
     */
    public static putPagePageEntries(
        authorization?: string,
        body?: {
            pageEntries?: any;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/page/pageEntries',
            headers: {
                'authorization': authorization,
            },
            body: body,
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

}
