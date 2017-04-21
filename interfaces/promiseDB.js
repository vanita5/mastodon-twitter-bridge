// @flow
/* eslint-disable */

type UpdateOptions = {
    multi?: boolean,
    upsert?: boolean,
    returnUpdatedDocs?: boolean,
};

declare type PromiseDB = {
    find: (what: Object) => Promise<Object[]>,
    findOne: (what: Object) => Promise<Object>,
    insert: <T: Object | Object[]>(what: T) => Promise<T>,
    count: (what: Object) => Promise<number>,
    update: (
        what: Object,
        changes: Object,
        updateOptions: UpdateOptions
    ) => Promise<number>,
};
