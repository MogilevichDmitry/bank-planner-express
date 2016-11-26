import mongoose from 'mongoose';

const currencySchema = mongoose.Schema({
  name: String,
  sell: Number,
  purchase: Number
})

export default mongoose.model('Currency', currencySchema);
