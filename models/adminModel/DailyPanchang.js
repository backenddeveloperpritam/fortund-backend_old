import mongoose from 'mongoose';

const dailyPanchangSchema = new mongoose.Schema({
    title: {
        type: String,
        default: '', // Removed the 'required' property and set default value to an empty string
    },
    description: {
        type: String,
        default: '', // Removed the 'required' property and set default value to an empty string
    }
}, { collection: 'DailyPanchang', timestamps: true });

const DailyPanchang = mongoose.model('DailyPanchang', dailyPanchangSchema);

export default DailyPanchang;
