import mongoose from 'mongoose';

const depositSchema = mongoose.Schema({
  name: String,
  percent: Number,
  minTerm: Number,
  maxTerm: Number,
  minAmount: Number,
  maxAmount: Number,
  typeOfPercent: String,
  currency: String
})

export default mongoose.model('Deposit', depositSchema);
