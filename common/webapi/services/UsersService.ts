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
     * @returns any OK
     * @throws ApiError
     */
    public static getUsers(): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/users/',
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update TakeMe user data through JWT
     * @param body
     * @returns any OK
     * @throws ApiError
     */
    public static putUsers(
        body?: any,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/users/',
            body: body,
            errors: {
                400: `Bad Request`,
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
