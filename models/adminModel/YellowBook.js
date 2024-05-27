import mongoose from 'mongoose';

const yellowBookSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    }
}, { collection: 'YellowBook', timestamps: true });

const YellowBook = mongoose.model('YellowBook', yellowBookSchema);

export default YellowBook;
