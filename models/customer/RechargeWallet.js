import mongoose from 'mongoose';

const rechargeWalletSchema = new mongoose.Schema({
    customer: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
    },
    invoiceId: {
        type: String,
        default: ''
    },
    gst:{
        type: Number,
        default: 0
    },
    recieptNumber: {
        type: Number,
        default: 0
    },
    discount:{
        type: Number,
        default: 0
    },
    offer:{
        type: String,
        default: ''
    },
    totalAmount: {
        type: Number,
        default: 0
    },
    amount: {
        type: Number,
        required: true
    },
    paymentMethod: {
        type: String,
        default: ''
    }
}, { collection: 'RechargeWallet', timestamps: true });

const RechargeWallet = mongoose.model('RechargeWallet', rechargeWalletSchema);

export default RechargeWallet;
