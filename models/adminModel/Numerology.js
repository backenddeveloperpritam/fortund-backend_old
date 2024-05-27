import mongoose from 'mongoose';

const { Schema, model } = mongoose;

const numerologySchema = new Schema({
    title: {
        type: String,
        required: false,
    },
    description: {
        type: String,
        required: false,
    },
    numerology_image: {
        type: String,
        required: false,
    }
}, { collection: 'Numerology ', timestamps: true });

const Numerology  = model('Numerology ', numerologySchema);

export default Numerology ;
