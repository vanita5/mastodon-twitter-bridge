// @flow
import type { NotificationCode } from '../lib/NotificationCodes';

export const notify = (path: string) => (code: NotificationCode): string => `${path}?notify=${code}`;

export default notify('/start');
