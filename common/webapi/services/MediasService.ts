/* istanbul ignore file */
/* tslint:disable */
/* eslint-disable */
import type { CancelablePromise } from '../core/CancelablePromise';
import { OpenAPI } from '../core/OpenAPI';
import { request as __request } from '../core/request';

export class MediasService {

    /**
     * Upload a picture to the users folder
     * @param profilePicture Profile Picture
     * @param authorization
     * @returns any OK
     * @throws ApiError
     */
    public static postMediaAddProfilePicture(
        profilePicture: Blob,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/media/addProfilePicture',
            headers: {
                'authorization': authorization,
            },
            formData: {
                'profilePicture': profilePicture,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Upload a picture to review
     * @param reviewId
     * @param media Media to attach to review
     * @param authorization
     * @returns any OK
     * @throws ApiError
     */
    public static postMediaAddToReview(
        reviewId: string,
        media: Blob,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/media/addToReview/{reviewId}',
            path: {
                'reviewId': reviewId,
            },
            headers: {
                'authorization': authorization,
            },
            formData: {
                'media': media,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Upload a picture to link
     * @param linkId
     * @param media Media to attach to link
     * @param authorization
     * @returns any OK
     * @throws ApiError
     */
    public static postMediaAddToLink(
        linkId: string,
        media: Blob,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/media/addToLink/{linkId}',
            path: {
                'linkId': linkId,
            },
            headers: {
                'authorization': authorization,
            },
            formData: {
                'media': media,
            },
            errors: {
                400: `Bad Request`,
                403: `Forbidden`,
            },
        });
    }

    /**
     * Delete a file from the user
     * @param filename
     * @param authorization
     * @returns any OK
     * @throws ApiError
     */
    public static deleteMedia(
        filename: string,
        authorization?: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/media/{filename}',
            path: {
                'filename': filename,
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
