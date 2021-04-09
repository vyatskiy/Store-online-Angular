const middleware = require('../../middlewares/password.middleware')
const db = require('../../models')
const Customer = db.customer

const validator = require('validator')

module.exports = async (req, res, next) => {
  console.log(req.body)
  if (validator.isEmpty(req.body.customer_name) || validator.isEmpty(req.body.email) || validator.isEmpty(req.body.password)) {
    res.status(403).json({success: false, message: 'Вы не можете оставить это поле пустым'})
    return
  } else if (!validator.isEmail(req.body.email)) {
    res.status(403).json({success: false, message: 'Введен некорректный email'})
    return
  } else if (!validator.isLength(req.body.email, {max: 30, min: 4}) || !validator.isLength(req.body.password, {
    max: 30,
    min: 8
  })) {
    res.status(403).json({success: false, message: 'Email должнен содержать в себе от 4 до 30 символов, password должнен содержать в себе от 8 до 30 символов'})
    return
  }

  const isExist = await Customer.findAll({
    where: {
      email: req.body.email
    }
  })
    .then(response => response)
    .catch(error => error.response)

  // if (!!isExist.length) {
  //   res.status(403).json({success: false, message: 'Данный логин(email) уже зарегистрирован'})
  //   return
  // }

  const saltHash = middleware.genPassword(req.body.password)
  const salt = saltHash.salt
  const hash = saltHash.hash

  Customer.create({
    customer_name: req.body.customer_name,
    email: req.body.email,
    password: hash,
    salt: salt
  })
    .then(user => {
      const jwt = middleware.issueJWT(user)
      res.json({success: true, token: jwt.token, user: { id: user.id, name: user.customer_name }})
    })
    .catch(err => next(err))
}
