import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import router from './api';

const app = express();

app.set('view engine', 'jade');

mongoose.connect(config.db);
mongoose.Promise = Promise;

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.use('/', router);

app.listen(config.port, () => {
  console.log('Server is up ' + config.port);
})
