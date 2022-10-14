require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cookieParser = require('cookie-parser');
const cors = require('./middlewares/cors');
const routes = require('./routes');
const error = require('./middlewares/error');
const { errorLogger, requestLogger } = require('./middlewares/logger');

const { PORT = 3000 } = process.env;
const app = express();
app.use(helmet());
app.use(cookieParser());
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cors);
mongoose.connect('mongodb://localhost:27017/mestodb', {
  useNewUrlParser: true,
});
app.use(requestLogger);
app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(error);
app.listen(PORT, () => {
  console.log(`Executing on ${PORT}`);
});
