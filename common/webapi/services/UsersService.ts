/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * Retrieve email based on a given username
     * @param username
     * @returns any OK
     * @throws ApiError
     */
    public static getUsersEmail(
        username: string,
    ): CancelablePromise<{
        email?: string;
    }> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/email/{username}',
            path: {
                'username': username,
            },
            errors: {
                404: `Not Found`,
            },
        });
    }

    /**
     * Get User data (without page) through JWT
     * @param username
     * @returns any OK
     * @throws ApiError
     */
    public static getUsersPage(
        username: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/{username}/page',
            path: {
                'username': username,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Get User data (without page) through JWT
     * @param authorization
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers(
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
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
     * Update TakeMe user data through JWT
     * @param authorization
     * @param body
     * @returns any OK
     * @throws ApiError
     */
    public static putUsers(
        authorization?: string,
        body?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/',
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

    /**
     * Create a new user. Returns 404 if user already exists
     * @param body
     * @returns any Returns a user
     * @throws ApiError
     */
    public static postUsersCreate(
        body?: {
            username: string;
            email: string;
            password?: string;
        },
    ): CancelablePromise<{
        id?: string;
        email?: string;
        username?: string;
    }> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/users/create',
            body: body,
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
