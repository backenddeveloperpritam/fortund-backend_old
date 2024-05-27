import mongoose from 'mongoose';

const astroBlogSchema = new mongoose.Schema({
    title: {
        type: String,
        required: true,
    },
    image: {
        type: String,
        required: true
    },
    blogCategory: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'BlogCategory'
    },
    created_by: {
        type: String,
        required: true,
    },
    status: {
        type: Number,
        default: 0
    },
    description: {
        type: String
    }
}, { timestamps: true });

const AstroBlogs = mongoose.model('AstroBlogs', astroBlogSchema);

export default AstroBlogs;
