import mongoose from 'mongoose';

const learnAstrologerSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    learnAstrologer_image: {
        type: String,
        required: false,
    }
}, { collection: 'LearnAstrologer', timestamps: true });

const LearnAstrologer = mongoose.model('LearnAstrologer', learnAstrologerSchema);

export default LearnAstrologer;
