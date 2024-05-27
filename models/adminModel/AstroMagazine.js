import mongoose from 'mongoose';

const astroMagazineSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
        unique: true
    },
    description: {
        type: String,
        required: false,
        unique: true
    }
}, { collection: 'AstroMagazine', timestamps: true });

const AstroMagazine = mongoose.model('AstroMagazine', astroMagazineSchema);

export default AstroMagazine;
