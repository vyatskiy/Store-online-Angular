const db = require('../models')
const Instrument = db.instrument

exports.findAll = (req, res) => {
  Instrument.findAll()
    .then(response => res.json(response))
    .catch(error => error)
}

exports.findOneInstrument = (req, res) => {
  Instrument.findAll({
    where: {
      id: req.params.id
    }
  })
    .then(response => {
      const [instrument] = response
      res.json(instrument)
    })
    .catch(error => error)
}

exports.findMobile = (req, res) => {
  Instrument.findAll({
    where: {
      category_id: 1
    }
  })
    .then(response => res.json(response))
    .catch(error => error)
}

exports.findLaptop = (req, res) => {
  Instrument.findAll({
    where: {
      category_id: 2
    }
  })
    .then(response => res.json(response))
    .catch(error => error)
}

exports.findPrinter = (req, res) => {
  Instrument.findAll({
    where: {
      category_id: 3
    }
  })
    .then(response => res.json(response))
    .catch(error => error)
}