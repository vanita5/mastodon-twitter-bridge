// @flow
import connectRedis from 'connect-redis';
import session from 'express-session';

const RedisStore = connectRedis(session);

const redisHost = process.env.REDIS_HOST;
const redisPort = process.env.REDIS_PORT || 6379;
const redisDB = process.env.REDIS_DB || 0;

if (!redisHost || !redisPort) {
    console.error('No Redis host provided! Please specify it in .env and load it with \'source .env\'');
    process.exit(1);
}

export const middleware = session({
    store: new RedisStore({
        host: redisHost,
        port: redisPort,
        db: redisDB ? parseInt(redisDB, 10) : undefined,
    }),
    secret: 'keyboard cat', //TODO Does this have to be changed?
    resave: false,
    unset: 'destroy',
    saveUninitialized: true,
    cookie: {
        secure: false,
        maxAge: 1000 * 3600 * 24,
    },
});

export async function logout(req: any, res: any) {
    if (req.session && req.session.user) {
        await new Promise(resolve => req.session.regenerate(() => resolve()));
        await new Promise(resolve => req.session.save(() => resolve()));
    }
    res.redirect(302, '/');
}
