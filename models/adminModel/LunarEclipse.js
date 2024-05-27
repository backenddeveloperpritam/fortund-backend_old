import mongoose from 'mongoose';

const lunarEclipseSchema = new mongoose.Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    lunarEclipse_image: {
        type: String,
        required: false,
    }
}, { collection: 'LunarEclipse', timestamps: true });

const LunarEclipse = mongoose.model('LunarEclipse', lunarEclipseSchema);

export default LunarEclipse;
