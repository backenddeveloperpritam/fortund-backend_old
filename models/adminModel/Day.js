import mongoose from 'mongoose';

const daySchema = new mongoose.Schema({
    day: {
        type: String,
        enum: ['Sun', 'Mon', 'Tues', 'Wed', 'Thurs', 'Fri', 'Sat']
    }
}, { collection: 'Day', timestamps: true });

const Day = mongoose.model('Day', daySchema);

export default Day;
