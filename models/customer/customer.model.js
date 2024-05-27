import mongoose from 'mongoose';

const CustomerSchema = mongoose.Schema({
    customerName: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    phoneNumber: {
        type: String,
        default: ''
    },
    alternateNumber: {
        type: String,
        default: ''
    },
    email: {
        type: String,
        default: ''
    },
    facebookId: {
        type: String,
        default: ''
    },
    profileImage: {
        type: String,
        default: ''
    },
    currentAddress:{
        type: Object,
        default: {
            city: ''
        }
    },
    birthPlaceAddress: {
        type: Object,
        default: {
            birthPlace: '',
            latitude: 0,
            longitude: 0
        }
    },
    dateOfBirth: {
        type: Date,
        default: null
    },
    timeOfBirth: {
        type: Date,
        default: null
    },
    isDeleted: {
        type: Number,
        default: 0
    },
    isBlock: {
        type: Number,
        default: 0
    },
    otp: {
        type: Number,
        default: ''
    },
    fcmToken: {
        type: String,
        default: ''
    },
    isOtpVerified: {
        type: Number,
        default: 0
    },
    isRegistered: {
        type: Boolean,
        default: false
    },
    referredBy: {
        type: String
    },
    loginDate: {
        type: Date
    },
    newUser: {
        type: Boolean,
        default: true
    },
    firstWalletRecharged: {
        type: Boolean,
        default: false
    },
    deviceId: {
        type: String,
        default: '',
    },
    bannedStatus: {
        type: Boolean,
        default: false
    },
    occupation:{
        type: String,
        default: ''
    },
    problem:{
        type: String,
        default: ''
    },
    walletBalance: { type: Number, default: 0 }, // Set a default value

}, { collection: 'Customers', timestamps: true });

const Customers = mongoose.model('Customers', CustomerSchema);

export default Customers;
