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
     * @returns any OK
     * @throws ApiError
     */
    public static postMediaAddProfilePicture(
        profilePicture: Blob,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'POST',
            url: '/media/addProfilePicture',
            formData: {
                'profilePicture': profilePicture,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

    /**
     * Delete a file from the user
     * @param filename
     * @returns any OK
     * @throws ApiError
     */
    public static deleteMedia(
        filename: string,
    ): CancelablePromise<any> {
        return __request(OpenAPI, {
            method: 'DELETE',
            url: '/media/{filename}',
            path: {
                'filename': filename,
            },
            errors: {
                400: `Bad Request`,
            },
        });
    }

}
