// console.log("fix conflicts")
var createError = require('http-errors')
var express = require('express')
const axios = require('axios')
var path = require('path')
var cookieParser = require('cookie-parser')
var logger = require('morgan')
var cors = require('cors')
const { OAuth2Client } = require('google-auth-library')
require('dotenv').config()
const connectMongoose = require('./config/mongoose')
connectMongoose()

var indexRouter = require('./routes/index')
var authRouter = require('./routes/auth')
var paymentRouter = require('./routes/payment')
var userRoutes = require('./routes/user')

var app = express()

// view engine setup
app.set('views', path.join(__dirname, 'views'))
app.set('view engine', 'jade')

// Allow requests from specific domains
// const whitelist = [process.env.FRONTEND_URL];
// const corsOptions = {
//   origin: (origin, callback) => {
//     if (whitelist.indexOf(origin) !== -1 || !origin) {
//       callback(null, true);
//     } else {
//       callback(new Error('Not allowed by CORS'));
//     }
//   }
// };

// app.use(cors(corsOptions));

app.use(logger('dev'))
// app.use(express.json())
app.use(
  express.json({
    limit: '5mb',
    verify: (req, res, buf) => {
      req.rawBody = buf.toString()
    },
  })
)
// app.use(express.urlencoded({ extended: false }))
app.use(express.urlencoded({ extended: true }))
app.use(cookieParser())
app.use(express.static(path.join(__dirname, 'public')))


app.use('/', indexRouter)
app.use('/api/auth', authRouter)
app.use('/api/payment', paymentRouter) 
app.use('/api/user', userRoutes)

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404))
})

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message
  res.locals.error = req.app.get('env') === 'development' ? err : {}

  // render the error page
  res.status(err.status || 500)
  res.render('error')
})

module.exports = app
