import Datastore from 'nedb'

class DatabaseWrapper {

    constructor() {
        this.db = {}
        this.db.authorization = new Datastore({ filename: '../db/db_token', autoload: true })
        this.db.authorization.ensureIndex({ fieldName: 'service', unique: true}, err => {
            if (err) console.error(err)
        })
    }

    getAuthorization() {
        const self = this
        return new Promise((resolve, reject) => {
            self.db.authorization.find({}, (err, docs) => {
                if (err) reject(err)
                else resolve(docs)
            })
        })
    }
}

export default DatabaseWrapper
