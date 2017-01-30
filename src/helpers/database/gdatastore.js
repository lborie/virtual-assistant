const AbstractDAO = require('./abstract-dao'),
    Datastore = require('@google-cloud/datastore'),
    ConfigurationService = require('../configuration-service'),
    debug = require('debug')('virtual-assistant:database-mongodb');

class GDatastoreDao extends AbstractDAO {

    static _getCollection(name, id) {
    	if(!this.db) {
    		this.db = new Datastore();
    	}
        return new Promise((resolve, reject) => {
           resolve(this.db.key([name, id]))
		});
    }

    insertOne(doc) {
    	var args = arguments;
    	return this.constructor._getCollection(this.collection, args.id)
    		.then(function(newKey) {
    			return this.db.save({
    				key: newKey,
					data: args
				});
    		});
    }
}

module.exports = GDatastoreDao;
