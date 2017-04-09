// @flow
import Datastore from 'nedb';

type DB = {
    authorization: Datastore,
};

class DatabaseWrapper {
    db: DB;
    constructor() {
        const db = {};
        db.authorization = new Datastore({
            filename: '../db/db_token',
            autoload: true,
        });
        db.authorization.ensureIndex(
            { fieldName: 'service', unique: true },
            err => {
                if (err) {
                    console.error(err);
                }
            },
        );
        this.db = db;
    }

    getAuthorization() {
        return new Promise((resolve, reject) => {
            this.db.authorization.find({}, (err, docs) => {
                if (err) {
                    reject(err);
                } else {
                    resolve(docs);
                }
            });
        });
    }
}

export default DatabaseWrapper;
