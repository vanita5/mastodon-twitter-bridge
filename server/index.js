// @flow
import { logout, middleware as sessionMiddleware } from './sessions';
import api, { apiObject } from './api/routes';
import auth from './auth/routes';
import bodyParser from 'body-parser';
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
global.serversideAPI = apiObject;

const initPromises = [app.prepare(), dbInit];

Promise.all(initPromises).then(() => {
    const server = express();

    server.use(sessionMiddleware);
    server.use(bodyParser.json());

    server.use('/auth', auth);
    server.use('/api', api);

    server.route('/logout').get((req, res) => logout(req, res));

    server.route('*').get((req, res) => handle(req, res));

    server.listen(3000, err => {
        if (err) {
            throw err;
        }

        console.log('> Ready on http://localhost:3000');
    });
});
