const register = require('../controllers/register.controller')

module.exports = function (app) {
  const router = require('express').Router()

  router.post('/', register)

  app.use('/api/register', router)
}