import mongoose from 'mongoose';
import Deposit from './deposit';

const bankSchema = mongoose.Schema({
  name: String,
  deposits: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Deposit' }]
})

export default mongoose.model('Bank', bankSchema);
