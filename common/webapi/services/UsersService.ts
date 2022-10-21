/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class UsersService {

    /**
     * @param username
     * @returns any Some description...
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
        });
    }

}
