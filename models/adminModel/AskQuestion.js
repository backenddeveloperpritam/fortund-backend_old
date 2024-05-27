import mongoose from 'mongoose';

const askQuestionSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false
    }
}, { collection: 'AskQuestion', timestamps: true });

const AskQuestion = mongoose.model('AskQuestion', askQuestionSchema);

export default AskQuestion;
