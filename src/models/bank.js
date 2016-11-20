import mongoose from 'mongoose';

const bankSchema = mongoose.Schema({
  name: String,
  percent: Number
})

export default mongoose.model('Bank', bankSchema);
