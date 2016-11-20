import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import Bank from './models/bank';

const app = express();

mongoose.connect(config.db);

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

app.post('/bank', (req, res) => {
  Bank.create({ name: req.body.name, percent: req.body.percent}, (err, bank) => {
    if(err) {
      console.log(err);
    } else {
      res.send(bank);
    }
  })
})

app.get('/bank/:name', (req, res) => {
  Bank.findOne({ name: req.params.name }, (err, bank) => {
    if(err) {
      console.log(err);
    } else {
      res.send(bank);
    }
  })
})

app.listen(config.port, () => {
  console.log('Server is up ' + config.port);
})
