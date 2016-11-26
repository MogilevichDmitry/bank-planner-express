import express from 'express';
import Bank from './models/bank';
import Currency from './models/currency';
import Deposit from './models/deposit';

const router = express.Router();

router.post('/bank', (req, res) => {
  Bank.create({
    name: req.body.name,
  }, (err, bank) => {
    if(err) {
      console.log(err);
    } else {
      res.send(bank);
    }
  })
})

router.get('/bank/:name', (req, res) => {
  Bank.findOne({ name: req.params.name }).populate('deposits').exec((err, bank) => {
    if(err) {
      console.log(err);
    } else {
      res.render('bank.jade', {
        bankName: bank.name,
        deposits: bank.deposits,
      })
    }
  })
})

router.get('/bank', (req, res) => {
  Bank.find({}, (err, banks) => {
    if(err) {
      console.log(err);
    } else {
      res.render('banks.jade', {
        banks: banks
      })
    }
  })
})

router.post('/deposit', (req, res) => {
  Bank.findOne({ name: req.body.bankName }).populate('deposits').exec((err, bank) => {

    const deposit = new Deposit({
      name: req.body.name,
      percent: req.body.percent,
      minTerm: req.body.minTerm,
      maxTerm: req.body.maxTerm,
      minAmount: req.body.minAmount,
      maxAmount: req.body.maxAmount,
      typeOfPercent: req.body.typeOfPercent,
      currency: req.body.currency,
    })

    bank.deposits.push(deposit);

    bank.save((err) => {
      if(err) console.log(err);

      deposit.save((err) => {
        if(err) console.log(err);

        res.send(deposit);
      })
    })
  })
})

router.get('/deposit/:name', (req, res) => {
  Deposit.findOne({ name: req.params.name }, (err, deposit) => {
    if(err) {
      console.log(err);
    } else {
      res.render('deposit.jade', {
        deposit: deposit
      })
    }
  })
})

router.post('/currency', (req, res) => {
  Currency.create({
    name: req.body.name,
    sell: req.body.sell,
    purchase: req.body.purchase
  }, (err, currency) => {
    if(err) {
      console.log(err);
    } else {
      res.send(currency);
    }
  })
})

router.put('/currency', (req, res) => {
  Currency.update(
    { name: req.body.name },
    { $set: {sell: req.body.sell, purchase: req.body.purchase }
  }, (err, currency) => {
    if(err) {
      console.log(err);
    } else {
      res.send(currency);
    }
  })
})

router.get('/currency', (req, res) => {
  Currency.find({}, (err, currencies) => {
    if(err) {
      console.log(err);
    } else {
      res.render('currency.jade', {
        currencies: currencies
      })
    }
  })
})

export default router;
