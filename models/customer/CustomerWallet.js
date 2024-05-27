import mongoose from 'mongoose';

const { Schema } = mongoose;

const customerWalletSchema = new Schema({
    customer: {
        type: Schema.Types.ObjectId,
        ref: 'Customers'
    },
    astrologer: {
        type: Schema.Types.ObjectId,
        ref: 'Astrologer'
    },
    wallet_balance: {
        type: Number,
        default: 0
    },
    start_time: {
        type: Date
    },
    end_time: {
        type: Date
    },
    total_chat_duration: {
        type: Number // You can adjust the type according to your requirement (e.g., in minutes, seconds, etc.)
    },
}, { collection: 'CustomerWallet', timestamps: true });

customerWalletSchema.virtual('formatted_wallet_balance').get(function () {
    return this.wallet_balance.toFixed(2);
});

const CustomerWallet = mongoose.model('CustomerWallet', customerWalletSchema);

export default CustomerWallet;
