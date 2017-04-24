// @flow

type Props = {
    account?: ClientAccount,
    disabled?: boolean,
};

export default ({ account, disabled }: Props) =>
    (disabled
        ? <div style={style.actions} />
        : <div style={style.actions}>
            {account &&
                  account.type === 'mastodon' &&
                  <span className="fa fa-lock" style={style.actionIcon} />}
            {account && <span className="fa fa-filter" style={style.actionIcon} />}
        </div>);

const style = {
    actions: {
        display: 'flex',
        width: 40,
        flexDirection: 'column',
        alignItems: 'center',
    },
    actionIcon: {
        marginBottom: 10,
        fontSize: '1.5rem',
    },
};
