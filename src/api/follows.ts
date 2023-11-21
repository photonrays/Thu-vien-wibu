/********************
 * IMPORT STATEMENTS
 ********************/

import { ScanlationGroupList, Response, UserList } from './schema';
import { Includes } from './static';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Request parameters for `GET /user/follows/group` */
export type GetUserFollowsGroupRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 1
     * Maximum: 100
     * ``` */
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
    includes?: Includes[]
};

/** Response from `GET /user/follows/group` */
export type GetUserFollowsGroupResponse = ScanlationGroupList;

/** Response from `GET /user/follows/group/{id}` */
export type GetUserFollowsGroupIdResponse = Response;

/** Request parameters for `GET /user/follows/user` */
export type GetUserFollowsUserRequestOptions = {
    /** ```console
     * Default: 10
     * Minimum: 1
     * Maximum: 100
     * ``` */
    limit?: number
    /** ```console
     * Minimum: 0
     * ``` */
    offset?: number
};

/** Response from `GET /user/follows/user` */
export type GetUserFollowsUserResponse = UserList;

/***********************
 * FUNCTION DEFINITIONS
 ***********************/

