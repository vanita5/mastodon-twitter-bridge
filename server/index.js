// @flow
import { getAccounts } from './auth/success';
import { middleware as sessionMiddleware } from './sessions';
import auth from './auth/routes';
import Datastore from 'nedb';
import DB from './db';
import express from 'express';
import next from 'next';

const db = new Datastore({
    filename: 'db/users.db',
});

const dbInit = new Promise((resolve, reject) => {
    db.loadDatabase(err => {
        if (err) {
            reject(err);
        }
        resolve();
    });
});

const dev = process.env.NODE_ENV !== 'production';

const app = next({ dev });
const handle = app.getRequestHandler();

global.db = DB(db);
global.app = app;
global.api = {
    getAccounts,
};

const initPromises = [app.prepare(), dbInit];

Promise.all(initPromises).then(() => {
    const server = express();

    server.use(sessionMiddleware);

    server.use('/auth', auth);

    server.route('*').get((req, res) => handle(req, res));

    server.listen(3000, err => {
        if (err) {
            throw err;
        }

        console.log('> Ready on http://localhost:3000');
    });
});
