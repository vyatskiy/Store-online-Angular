const express = require("express")
const bodyParser = require("body-parser")
const cors = require("cors")
const path = require('path')

const app = express()

const corsOptions = {
  credentials: true,
  origin: "http://localhost:4200"
}

const passport = require('passport')
require('./config/passport.config')(passport)

app.use(passport.initialize())

app.use(cors(corsOptions))
app.use(bodyParser.json())
app.use(bodyParser.urlencoded({extended: true}))
app.use('/static', express.static(path.join(__dirname, 'public')))

require('./routes/instrument.route')(app)
require('./security/routes/login.route')(app)
require('./security/routes/register.route')(app)

const PORT = process.env.PORT || 8081
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}.`)
})