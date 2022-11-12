/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class PagesService {

    /**
     * Grab the authenticated user
     * @param pageId
     * @param authorization
     * @param page How many page entries to skip (page * pageSize)
     * @param pageSize How many page entries to take
     * @returns any Returns
     * @throws ApiError
     */
    public static getPageEntries(
        pageId: string,
        authorization?: string,
        page?: string,
        pageSize?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/page/{pageId}/entries',
            path: {
                'pageId': pageId,
            },
            headers: {
                'authorization': authorization,
            },
            query: {
                'page': page,
                'pageSize': pageSize,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Get the authenticated user\'s page (without entries)
     * @param authorization
     * @returns any Returns the user's page
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
    public static getPagePage(
        username: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/page/{username}/page',
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

    /**
     * Delete one of the authenticated user\'s pageEntry
     * @param pageId
     * @param entryId
     * @param authorization
     * @returns any Returns the updated page
     * @throws ApiError
     */
    public static deletePagePageEntry(
        pageId: string,
        entryId: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/page/page/{pageId}/entry/{entryId}',
            path: {
                'pageId': pageId,
                'entryId': entryId,
            },
            headers: {
                'authorization': authorization,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

}
