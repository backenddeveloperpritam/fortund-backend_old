import mongoose from 'mongoose';

const devPrathisthaMuhuratSchema = new mongoose.Schema({
    title: {
        type: String,
    },
    description: {
        type: String,
    },
    devPrathisthaMuhurat_image: {
        type: String,
    }
}, { collection: 'DevPrathisthaMuhurat', timestamps: true });

const DevPrathisthaMuhurat = mongoose.model('DevPrathisthaMuhurat', devPrathisthaMuhuratSchema);

export default DevPrathisthaMuhurat;
