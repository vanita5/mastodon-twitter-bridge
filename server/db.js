// @flow
import type DataStore from 'nedb';

export default function getPromiseDB<T>(db: DataStore): PromiseDB<T> {
    return new Proxy(db, {
        get: (target, prop) => (...args) =>
            new Promise((resolve, reject) => {
                target[prop](...args, (err?, ...docAndParams: mixed[]) => {
                    if (err) {
                        reject(err);
                    } else {
                        resolve([...docAndParams]);
                    }
                });
            }),
    });
}
