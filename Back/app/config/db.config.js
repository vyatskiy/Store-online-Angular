module.exports = {
  HOST: 'localhost',
  USER: 'postgres',
  PASSWORD: 'nikita70999',
  DB: 'store',
  dialect: 'postgres',
  pool: {
    max: 5,
    min: 0,
    acquire: 30000,
    idle: 10000
  }
}