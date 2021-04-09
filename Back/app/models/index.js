const dbConfig = require('../config/db.config')

const Sequelize = require('sequelize')
const sequelize = new Sequelize(dbConfig.DB, dbConfig.USER, dbConfig.PASSWORD, {
  host: dbConfig.HOST,
  dialect: dbConfig.dialect,

  pool: {
    max: dbConfig.pool.max,
    min: dbConfig.pool.min,
    acquire: dbConfig.pool.acquire,
    idle: dbConfig.pool.idle
  }
})
sequelize
  .authenticate()
  .then(() => {
    console.log('Connection has been established successfully.');
  })
  .catch(err => {
    console.error('Unable to connect to the database:', err);
  });
const db = {}

db.Sequelize = Sequelize
db.sequelize = sequelize

db.category = require('./category.model')(sequelize, Sequelize)
db.manufacturer = require('./manufacturer.model')(sequelize, Sequelize)
db.instrument = require('./instrument.model')(sequelize, Sequelize)
db.item = require('./item.model')(sequelize, Sequelize)
db.customer = require('./customer.model')(sequelize, Sequelize)

module.exports = db