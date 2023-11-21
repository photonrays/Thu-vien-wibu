/********************
 * IMPORT STATEMENTS
 ********************/

import type { AuthenticationToken } from './authentication';
import type { ErrorResponse } from './schema';

/***********************
 * API REQUEST/RESPONSE
 ***********************/

/** Response from `POST /captcha/solve` */
export type PostCaptchaSolveResponse = {
    result: 'ok' | 'error'
};

/***********************
 * FUNCTION DEFINITIONS
 ***********************/
