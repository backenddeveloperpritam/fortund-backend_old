import mongoose, { Schema } from 'mongoose';

const CustomerSchema = new Schema({
    unique_id: {
        type: String,
        required: true,
        unique: true
    },
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
        default: '',
        unique: true,
        lowercase: true
    },
    image: {
        type: String,
        default: ''
    },
    address: {
        type: {
            city: String,
            state: String,
            country: String,
            zipCode: String,
            birthPlace: String,
            latitude: Number,
            longitude: Number
        },
        default: {
            city: '',
            state: '',
            country: '',
            zipCode: '',
            birthPlace: '',
            latitude: 0,
            longitude: 0
        }
    },
    dateOfBirth: {
        type: Date
    },
    timeOfBirth: {
        type: String,
        default: ''
    },
    status: {
        type: Number,
        default: 0
    },
    isDeleted: {
        type: Boolean,
        default: false
    },
    isBlock: {
        type: Boolean,
        default: false
    },
    otp: {
        type: Number,
        default: null
    },
    fcmToken: {
        type: String,
        default: ''
    },
    isOtpVerified: {
        type: Boolean,
        default: false
    },
    isSignupCompleted: {
        type: Boolean,
        default: false
    },
    referred_by: {
        type: String
    },
    device_type: {
        type: Number
    },
    registration_date: {
        type: Date,
        default: Date.now
    },
    login_date: {
        type: Date
    },
    isOnline: {
        type: Boolean,
        default: false
    },
    chatStatus: {
        type: Boolean,
        default: false
    },
    callStatus: {
        type: Boolean,
        default: false
    },
    new_user: {
        type: Boolean,
        default: true
    },
    first_wallet_recharged: {
        type: Boolean,
        default: false
    },
    device_id: {
        type: String,
        default: ''
    },
    banned_status: {
        type: Boolean,
        default: false
    },
    wallet_balance: {
        type: Number,
        default: 0
    }
}, { timestamps: true });

let Customers;

try {
    // Check if the model already exists before defining it
    Customers = mongoose.model('Customers');
} catch (error) {
    // If the model doesn't exist, define it
    Customers = mongoose.model('Customers', CustomerSchema);
}

export { Customers };
