// @flow
import type DataStore from 'nedb';

export default function getPromiseDB(db: DataStore) {
    return new Proxy(db, {
        get: (target, prop) =>
            (...args) =>
                new Promise((resolve, reject) => {
                    target[prop](...args, (err?, doc?: any) => {
                        if (err) {
                            reject(err);
                        } else {
                            resolve(doc);
                        }
                    });
                }),
    });
}
