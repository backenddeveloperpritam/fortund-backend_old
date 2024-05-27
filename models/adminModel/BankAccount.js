import mongoose from 'mongoose';

const bankAccountSchema = new mongoose.Schema({
  panNumber: {
    type: String,
    default: ''
  },
  accountHolderName: {
    type: String,
    default: ''
  },
  accountNumber: {
    type: String,
    default: ''
  },
  ifscCode: {
    type: String,
    default: ''
  },
  accountType: {
    type: String,
    default: ''
  }
}, { collection: 'BankAccount', timestamps: true });

const BankAccount = mongoose.model('BankAccount', bankAccountSchema);

export default BankAccount;
