/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class BlogService {

    /**
     * Grab a Blog based on blog id
     * @param blogId
     * @returns any OK
     * @throws ApiError
     */
    public static getBlog(
        blogId: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'GET',
            url: '/blog/{blogId}',
            path: {
                'blogId': blogId,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Update the authenticated user\'s Blog based on blog id
     * @param pageEntryId
     * @param blogId
     * @param authorization
     * @param body
     * @returns any OK
     * @throws ApiError
     */
    public static putBlogUpdateBlog(
        pageEntryId: string,
        blogId: string,
        authorization?: string,
        body?: {
            blog?: any;
        },
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'PUT',
            url: '/blog/update/{pageEntryId}/blog/{blogId}',
            path: {
                'pageEntryId': pageEntryId,
                'blogId': blogId,
            },
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
