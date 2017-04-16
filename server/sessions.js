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
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
    cookie: { secure: false },
});
