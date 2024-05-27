import mongoose from 'mongoose';

const auspiciousTimeSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
}, { collection: 'AuspiciousTime', timestamps: true });

const AuspiciousTime = mongoose.model('AuspiciousTime', auspiciousTimeSchema);

export default AuspiciousTime;
