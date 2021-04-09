const instrument = require('../controllers/instrument.controller')

module.exports = function (app) {
  const router = require('express').Router()

  router.get('/', instrument.findAll)
  router.get('/mobile', instrument.findMobile)
  router.get('/laptop', instrument.findLaptop)
  router.get('/printer', instrument.findPrinter)

  router.get('/item:id', instrument.findOneInstrument)

  app.use('/api/instrument', router)
}