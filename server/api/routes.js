// @flow
import { deleteAccount } from './account.js';
import { deleteConnection, saveConnection } from './connection';
import { getUser } from './user';
import express from 'express';
const api = express.Router();

export const apiObject = {
    deleteAccount,
    getUser,
    saveConnection,
    deleteConnection,
};

api.route('/user').get(async (req, res) => {
    const id = req.session.user;
    const user = await getUser(id);
    res.json(user);
});

api
    .route('/connection')
    .post(async (req, res) => {
        if (!req.session.user) {
            res.status(401).end();
        }
        const userId = req.session.user;
        const con = req.body;
        const status = await saveConnection(con, userId);
        res.status(status).end();
    })
    .delete(async (req, res) => {
        if (!req.session.user) {
            res.status(401).end();
        }
        const userId = req.session.user;
        const { id } = req.query;

        const status = await deleteConnection(id, userId);
        res.status(status).end();
    });

api.route('/account').delete(async (req, res) => {
    if (!req.session.user) {
        res.status(401).end();
    }
    const userId = req.session.user;
    const { type, id } = req.query;

    const status = await deleteAccount(id, type, userId);
    res.status(status).end();
});

export default api;
