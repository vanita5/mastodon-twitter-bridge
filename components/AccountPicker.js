// @flow
import { PureComponent } from 'react';
import AccountPickerAvatar, { AddDummy } from './AccountPickerAvatar';

type Props = {|
    accounts: ClientAccount[],
    onSelect: Function,
    selected?: ClientAccount,
|};

type State = {|
    open: boolean,
|};

export default class AccountPicker extends PureComponent {
    props: Props;
    state: State = {
        open: false,
    };
    toggle = () => {
        this.setState((state: State) => ({ open: !state.open }));
    };
    select = (account?: ClientAccount) => () => {
        const { onSelect } = this.props;
        this.setState({ open: false }, () => onSelect(account));
    };
    render() {
        const { accounts, selected } = this.props;
        const { open } = this.state;
        const size = accounts.length + (selected ? 1 : 0) + 1;
        return (
            <div style={style.wrapper}>
                <div style={styleFX.box(open, size)}>
                    {!selected && <AddDummy onClick={this.toggle} />}
                    {selected &&
                        (open
                            ? <AddDummy onClick={this.select()} />
                            : <AccountPickerAvatar
                                url={selected.profileImage}
                                screenName={selected.screenName}
                                onClick={this.toggle}/>)}
                    {selected &&
                        open &&
                        <AccountPickerAvatar url={selected.profileImage} onClick={this.toggle} />}
                    {accounts.map(a => (
                        <AccountPickerAvatar onClick={this.select(a)} url={a.profileImage} key={a.id} />
                    ))}
                </div>
                {selected &&
                    <div style={style.info}>
                        {selected.type === 'twitter' && <span className="fa fa-twitter" />}
                        {selected.type === 'mastodon' && <span style={style.mastodonIcon} />}
                        <span>
                            {`@${selected.screenName}`}
                            {selected.type === 'mastodon' &&
                                <span style={style.instanceUrl}>
                                    {`@${selected.instanceUrl}`}
                                </span>}
                        </span>

                    </div>}
            </div>
        );
    }
}

type AvatarProps = {
    account: ClientAccount,
};
export const AccountAvatar = ({ account }: AvatarProps) => (
    <div style={style.wrapper}>
        <div style={styleFX.box(false, 1)}>
            <AccountPickerAvatar url={account.profileImage} />
        </div>
        <div style={style.info}>
            {account.type === 'twitter' && <span className="fa fa-twitter" />}
            {account.type === 'mastodon' && <span style={style.mastodonIcon} />}
            <span>
                {`@${account.screenName}`}
                {account.type === 'mastodon' &&
                    <span style={style.instanceUrl}>
                        {`@${account.instanceUrl}`}
                    </span>}
            </span>

        </div>
    </div>
);

const style: Style = {
    wrapper: {
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        maxHeight: 104,
        overflow: 'visible',
    },
    info: {
        marginTop: 10,
        color: '#fff',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    },
    mastodonIcon: {
        minHeight: 16,
        width: 16,
        backgroundImage: 'url(/static/img/mastodon.svg)',
    },
    instanceUrl: {
        color: '#888',
    },
};

const styleFX: StyleFX = {
    box: (open, accs: number) => ({
        minHeight: open ? Math.min(accs * 105, 400) : 100,
        height: open ? Math.min(accs * 105, 400) : 100,
        overflow: 'hidden',
        width: 100,
        boxSizing: 'content-box',
        padding: open ? 20 : 0,
        marginTop: open ? -20 : 0,
        border: '2px solid white',
        borderRadius: 4,
        boxShadow: '0px 0px 20px 0px rgba(0,0,0,0.75)',
        transition: 'all 0.3s',
        backgroundColor: '#222',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
    }),
};
