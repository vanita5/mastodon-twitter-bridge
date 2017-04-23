// @flow
import type DataStore from 'nedb';

export default function getPromiseDB(db: DataStore): PromiseDB {
    return new Proxy(db, {
        get: (target, prop) => (...args) =>
            new Promise((resolve, reject) => {
                target[prop](...args, (err?, doc?: any, ...additional: mixed[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        if (additional.length > 0) {
                            resolve([doc, ...additional]);
                        }
                        resolve(doc);
                    }
                });
            }),
    });
}
