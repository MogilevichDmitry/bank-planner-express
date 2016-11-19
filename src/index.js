import express from 'express';
import mongoose from 'mongoose';
import bodyParser from 'body-parser';
import config from './config';
import Bank from './models/bank';

const app = express();

app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());

mongoose.connect(config.db);
mongoose.Promise = Promise;

app.post('/bank', (req, res) => {
  Bank.create({
    name: req.body.name,
    depositPeriod: req.body.depositPeriod,
    percent: req.body.percent,
    frequencyOfPayments: req.body.frequencyOfPayments,
    currency: req.body.currency,
    minAmount: req.body.minAmount,
    minTerm: req.body.minTerm
  }, (err, bank) => {
    if(err) {
      console.log(err);
    } else {
      res.send(bank.name);
    }
  });
});

app.post('/getBank', (req, res) => {
  Bank.findOne({ name: req.body.name }, (err, bank) => {
    if(err) {
      return res.send(err);
    } else {
      return res.send(bank);
    }
  });
});

app.listen(3000, () => {
  console.log('Server is up');
});
