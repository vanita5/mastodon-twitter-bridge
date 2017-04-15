// @flow
import { UncontrolledAlert } from 'reactstrap';
import NotificationCodes from '../lib/NotificationCodes';
import type { NotificationCode } from '../lib/NotificationCodes';

type Props = {
    code: NotificationCode,
};

const Notification = ({ code }: Props) => {
    const isError = helpers.isError(code);
    const text = NotificationCodes.all[code];
    if (!text) {
        return null;
    }
    return (
        <UncontrolledAlert color={isError ? 'danger' : 'success'}>
            {text}
        </UncontrolledAlert>
    );
};

export default Notification;

const helpers = {
    isError: (code: NotificationCode) => NotificationCodes.error.hasOwnProperty(code),
};
