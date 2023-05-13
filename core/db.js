const { Database } = require('quickmongo');

const db = new Database(process.env.MONGO_URI);
db.connect().then(() => console.log('[ MONGO DB ] Connected to Mongo Database!'));

module.exports = db;