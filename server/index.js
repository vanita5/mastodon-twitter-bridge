// @flow
import { middleware as sessionMiddleware } from './sessions';
import auth from './auth/routes';
import express from 'express';
import next from 'next';

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

app.prepare().then(() => {
    const server = express();

    server.use(sessionMiddleware);

    server
        .route(['*.*', '/_next*', '/__webpack*', '/', '/index', '/about', '/start'])
        .get((req, res) => handle(req, res));

    server.use('/auth', auth);

    server.listen(3000, err => {
        if (err) {
            throw err;
        }

        console.log('> Ready on http://localhost:3000');
    });
});
