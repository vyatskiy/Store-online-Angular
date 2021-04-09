const login = require('../controllers/login.controller')

module.exports = function (app) {
  const router = require('express').Router()

  router.post('/', login)

  app.use('/api/login', router)
}