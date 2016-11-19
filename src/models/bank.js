import mongoose from 'mongoose';

const BankSchema = mongoose.Schema({
  name: String,
  percent: Number,
});

export default mongoose.model('Bank', BankSchema);
