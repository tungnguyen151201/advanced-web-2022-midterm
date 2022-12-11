const createError = require('http-errors');
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const cors = require('cors');
const logger = require('morgan');
const dotenv = require('dotenv');
const mongoose = require('mongoose');
const config = require('./config');
const passport = require('passport');
const session = require('express-session');
const http = require('http');
const usersRouter = require('./routes/user/users');
const groupRouter = require('./routes/group/groups');
const slideRouter = require('./routes/slides/slides');
const presentationRouter = require('./routes/presentation/');
const authRouter = require('./routes/auth/authGoogle');
const chatServer = require('./routes/chat/createServer');
const app = express();
const server = http.createServer(app);
dotenv.config();

const { verifyToken } = require('./middleware/auth');

chatServer.attach(server);
async function connectDB() {
  try {
    await mongoose.connect(config.mongodb.urls);
    console.log('connect Db success!');
  } catch (error) {
    throw error;
  }
}
connectDB();
//passport config
require('./middleware/passport')(passport);
// view engine setup
app.set('views', path.join(__dirname, 'views'));
app.set('view engine', 'jade');

app.use(logger('dev'));
app.use(express.json());
app.use(cors());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
app.use(
  session({
    secret: 'keyboard cat',
    resave: false,
    saveUninitialized: true,
  })
);
app.use(passport.initialize());
app.use(passport.session());
app.use('/presentation', verifyToken, presentationRouter);
app.use('/groups/', verifyToken, groupRouter);
app.use('/slide/', verifyToken, slideRouter);
app.use('/', usersRouter);
// app.use('/', usersRouter);
app.use('/auth/', authRouter);
app.get('/chat', (__, res) => {
  res.send('box chat');
});

// catch 404 and forward to error handler
app.use(function (req, res, next) {
  next(createError(404));
});

// error handler
app.use(function (err, req, res, next) {
  // set locals, only providing error in development
  res.locals.message = err.message;
  res.locals.error = req.app.get('env') === 'development' ? err : {};

  // render the error page
  res.status(err.status || 500);
  res.render('error');
});

module.exports = app;
