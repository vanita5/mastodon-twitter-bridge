// @flow
import type { NotificationCode } from '../lib/NotificationCodes';

//TODO don't have notification in url or at least remove it after notification is cleared.
//better put the success/error code in the response body and handle it in one place

export const notify = (path: string) => (code: NotificationCode): string => `${path}?notify=${code}`;

export default notify('/accounts');
