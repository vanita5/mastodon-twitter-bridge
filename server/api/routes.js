// @flow
import { deleteAccount } from './account.js';
import { getUser } from './user';
//import { saveConnections } from './connections';
import express from 'express';
const api = express.Router();

export const apiObject = {
    deleteAccount,
    getUser,
    //saveConnections,
};

api.route('/user').get(async (req, res) => {
    const id = req.session.user;
    const user = await getUser(id);
    res.json(user);
});

// api.route('/connections').post(async (req, res) => {
//     const id = req.session.user;
//     const connections = await saveConnections(id);
//     res.json(connections);
// });

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
