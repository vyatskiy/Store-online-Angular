const middleware = require('../../middlewares/password.middleware')
const db = require('../../models')
const Customer = db.customer

const validator = require('validator')

module.exports = (req, res, next) => {
  if (!validator.isEmail(req.body.email)) {
    res.status(403).json({success: false, message: 'Введен некорректный email'})
    return
  }

  Customer.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(data => {
      const [user] = data

      if (!user) {
        res.status(403).json({success: false, message: 'Неправильный email или password. Повторите попытку.'})
      } else {
        const isValid = middleware.validPassword(req.body.password, user.password, user.salt)

        if (isValid) {
          const jwt = middleware.issueJWT(user)
          res.status(200).json({success: true, token: jwt.token, user: { id: user.id, name: user.customer_name }})
        } else {
          res.status(403).json({success: false, message: 'Неправильный email или password. Повторите попытку.'})
        }
      }
    })
    .catch(err => {
      next(err)
    })
}



