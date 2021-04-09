const JwtStrategy = require('passport-jwt').Strategy
const ExtractJwt = require('passport-jwt').ExtractJwt

const path = require('path')
const fs = require('fs')

const db = require('../models')
const Customer = db.customer

const pathToKey = path.join(__dirname, '../../', 'id_rsa_pub.pem')
const PUB_KEY = fs.readFileSync(pathToKey, 'utf-8')

const options = {
  jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
  secretOrKey: PUB_KEY,
  algorithms: ['RS256']
}

const strategy = new JwtStrategy(options, (payload, done) => {
  Customer.findByPk(payload.sub)
    .then(user => {
      if (user) {
        return done(null, user)
      } else {
        return done(null, false)
      }
    })
    .catch(error => done(error, null))
})

module.exports = (passport) => {
  passport.use(strategy)
}