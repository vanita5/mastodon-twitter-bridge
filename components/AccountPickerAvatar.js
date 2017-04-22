// @flow

type Props = {
    url: string,
    screenName?: string,
    onClick?: () => mixed,
};

export const AddDummy = ({ onClick }: $Shape<Props>) => (
    <div style={style.dummy} onClick={onClick}>
        <span className="fa fa-plus fa-3x" style={style.plusIcon} />
    </div>
);

const AccountPickerAvatar = ({ url, onClick }: Props) => (
    <div style={styleFX.accountAvatar(url)} onClick={onClick} />
);
export default AccountPickerAvatar;

const style: Style = {
    dummy: {
        backgroundColor: 'grey',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        boxSizing: 'border-box',
        marginBottom: 5,
        minWidth: 100,
        maxWidth: 100,
        minHeight: 100,
        maxHeight: 100,
        cursor: 'pointer',
        position: 'relative',
    },
    plusIcon: {
        color: '#fff',
    },
};

const styleFX: StyleFX = {
    accountAvatar: url => ({
        minWidth: 100,
        maxWidth: 100,
        minHeight: 100,
        maxHeight: 100,
        boxSizing: 'border-box',
        backgroundImage: `url(${url})`,
        backgroundRepeat: 'no-repeat',
        backgroundPosition: 'center',
        backgroundSize: 'cover',
        marginBottom: 5,
        cursor: 'pointer',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'flex-end',
    }),
};
