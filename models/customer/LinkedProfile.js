import mongoose from 'mongoose';

const LinkedProfileSchema = mongoose.Schema({
    customerId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Customers'
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
    dateOfBirth: {
        type: String,
        default: ''
    },
    timeOfBirth: {
        type: String,
        default: null
    },
    placeOfBirth: {
        type: String,
        default: ''
    },
    maritalStatus: {
        type: String,
        default: ''
    },
    latitude: {
        type: String
    },
    longitude: {
        type: String
    },
    status: {
        type: Number,
        default: 0
    },
    topic_of_concern: {
        type: String
    }
}, { collection: 'LinkedProfile', timestamps: true });

const LinkedProfile = mongoose.model('LinkedProfile', LinkedProfileSchema);

export default LinkedProfile;
