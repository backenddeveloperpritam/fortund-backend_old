import mongoose from 'mongoose';

const grihaRogNivaranSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    grihaRogNivaran_image: {
        type: String,
        required: false,
    }
}, { collection: 'GrihaRogNivaran', timestamps: true });

const GrihaRogNivaran = mongoose.model('GrihaRogNivaran', grihaRogNivaranSchema);

export default GrihaRogNivaran;
