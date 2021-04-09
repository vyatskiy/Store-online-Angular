const crypto = require('crypto')
const jsonwebtoken = require('jsonwebtoken')
const fs = require('fs')
const path = require('path')

const pathToKey = path.join(__dirname, '../../', 'id_rsa_priv.pem')
const PRIV_KEY = fs.readFileSync(pathToKey, 'utf8')

function validPassword(password, hash, salt) {
  let hashVerify = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')
  return hash === hashVerify
}

function genPassword(password) {
  let salt = crypto.randomBytes(32).toString('hex')
  let genHash = crypto.pbkdf2Sync(password, salt, 10000, 64, 'sha512').toString('hex')

  return {
    salt: salt,
    hash: genHash
  }
}

function issueJWT(user) {
  const id = user.id
  const expiresIn = '1d'

  const payload = {
    sub: id,
    iat: Math.floor(Date.now() / 1000) - 30
  }

  const signedToken = jsonwebtoken.sign(payload, PRIV_KEY, {expiresIn: expiresIn, algorithm: 'RS256'})

  return {
    token: "Bearer " + signedToken,
    expires: expiresIn
  }
}

module.exports.validPassword = validPassword
module.exports.genPassword = genPassword
module.exports.issueJWT = issueJWT