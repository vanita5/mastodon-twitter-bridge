// @flow
import { Button } from 'reactstrap';

type Props = {
    left?: 'mastodon' | 'twitter',
    right?: 'mastodon' | 'twitter',
    arrow: 'both' | 'target' | 'source',
    switchable?: boolean,
    onSwitch?: () => mixed,
    savable?: boolean,
    onSave?: () => mixed,
};

const ConnectionArrow = ({ left, right, arrow, switchable, onSwitch, savable, onSave }: Props) => (
    <div style={style.settingsCol}>
        <div style={style.arrowWrap}>
            <span style={style.arrow} className={helpers.arrowIcons[arrow]} />
        </div>
        <div style={style.onArrowIcons}>
            {left && left === 'twitter' && <span style={style.twitterIcon} className="fa fa-twitter" />}
            {left && left === 'mastodon' && <span style={style.mastodonIcon} />}
            {!left && <span style={style.twitterIcon} />}
            {switchable
                ? <span
                    style={style.switcher}
                    onClick={onSwitch ? onSwitch : undefined}
                    className="fa fa-exchange"/>
                : <span />}
            {right && right === 'twitter' && <span style={style.twitterIcon} className="fa fa-twitter" />}
            {right && right === 'mastodon' && <span style={style.mastodonIcon} />}
            {!right && <span style={style.twitterIcon} />}
        </div>
        {savable &&
            <div style={style.center}>
                <Button color="primary" onClick={onSave ? onSave : undefined} style={style.saveButton}>
                    {'Save'}
                </Button>
            </div>}
    </div>
);

export default ConnectionArrow;

const helpers = {
    arrowIcons: {
        both: 'fa fa-arrows-h',
        target: 'fa fa-long-arrow-right',
        source: 'fa fa-long-arrow-left',
    },
};

const style = {
    settingsCol: {
        position: 'relative',
        display: 'flex',
        flexDirection: 'column',
        width: 240,
    },
    arrowWrap: {
        height: 104,
        position: 'absolute',
        width: '100%',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
    },
    arrow: {
        zIndex: 0,
        fontSize: '12rem',
        color: 'rgba(255, 255, 255, 0.7)',
    },
    onArrowIcons: {
        zIndex: 1,
        color: '#333',
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'center',
        height: 104,
    },
    switcher: {
        fontSize: '1.5em',
    },
    saveButton: {
        zIndex: 1,
        cursor: 'pointer',
    },
    center: {
        display: 'flex',
        flexDirection: 'row',
        alignItems: 'flex-end',
        justifyContent: 'center',
    },
    twitterIcon: {
        minWidth: 120,
        display: 'flex',
        flexDirection: 'row',
        justifyContent: 'center',
        color: '#1da1f2',
    },
    mastodonIcon: {
        minHeight: 16,
        minWidth: 120,
        backgroundImage: 'url(/static/img/mastodon.svg)',
        backgroundPosition: 'center',
        backgroundRepeat: 'no-repeat',
    },
};
