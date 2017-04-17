// @flow
import type { NotificationCode } from '../lib/NotificationCodes';

//TODO don't have notification in url or at least remove it after notification is cleared.

export const notify = (path: string) => (code: NotificationCode): string => `${path}?notify=${code}`;

export default notify('/accounts');
