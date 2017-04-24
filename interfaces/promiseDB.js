// @flow

type UpdateOptions = {
    multi?: boolean,
    upsert?: boolean,
    returnUpdatedDocs?: boolean,
};

//query is typing hell, so Object has to suffice

type DBQuery = Object;

declare type PromiseDB<O> = {
    find: (what: DBQuery) => Promise<[O[]]>,
    findOne: (what: DBQuery) => Promise<[?O]>,
    insert: <T: O | O[]>(what: T) => Promise<[T]>,
    count: (what: DBQuery) => Promise<[number]>,
    update: (what: DBQuery, changes: Object, updateOptions: UpdateOptions) => Promise<[number, ?O]>,
};
