import mongoose from 'mongoose';

const languageSchema = mongoose.Schema({
    languageName: {
        type: String,
        default: ''
    }
}, { collection: 'Language', timestamps: true });

export default mongoose.model('Language', languageSchema);
