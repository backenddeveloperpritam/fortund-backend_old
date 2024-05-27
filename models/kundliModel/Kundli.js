import { ObjectId } from 'mongodb';
import mongoose from 'mongoose';
import Customers from '../customerModel/Customers.js';

const KundliSchema = mongoose.Schema({
    customerId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: "Customers",
    },
    firstName: {
        type: String,
        default: ''
    },
    lastName: {
        type: String,
        default: ''
    },
    gender: {
        type: String,
        default: ''
    },
    timeOfBirth:{
        type: Date,
        default: null
    },
    dateOfBirth:{
        type: Date,
        default: null
    },
    placeOfBirth: {
        type: String,
        default: ''
    },
    latitude: {
        type: Number,
        default: 0
    },
    longitude: {
        type: Number,
        default: 0
    },
    timeZone: {
        type: String,
        default: ''
    }
});

const Kundli = mongoose.model('Kundli', KundliSchema);

export default Kundli;
