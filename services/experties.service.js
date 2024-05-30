import ApiError from "../utils/ApiError.js";
import Expertise from "../models/adminModel/Expertise.js";

const getExperties = async () => {

    const expertise = await Expertise.find({});
    return expertise;
};

const getExpertiesById = async (id) => {
    const expertise = await Expertise.findOne({ _id: id });
    if (!expertise) {
        return null;
    }
    return expertise;
}

const addNewExperties = async (body) => {
    const { title, status } = body;

    const existsExpertise = await Expertise.findOne({ title: new RegExp('^' + title + '$', 'i') });
    console.log(existsExpertise);
    if (existsExpertise) {
        console.log("test");
        throw new ApiError(400, "Expertise already exists");
    }

    // Create new expertise
    const expertise = await Expertise.create({ title, status });
    console.log(expertise);
    return expertise;
};


const updateExperties = async (expertiseId, updateData) => {
    const expertise = await Expertise.findByIdAndUpdate(expertiseId, updateData, { new: true });
    return expertise;
}



const changeStatus = async (expertiseId, status) => {
    const expertise = await Expertise.findByIdAndUpdate(
        expertiseId,
        { status },
        { new: true }
    );

    return expertise;
};

const deleteExperties = async (expertiseId) => {
    const updatedExpertise = await Expertise.findByIdAndUpdate(
        expertiseId,
        { isDeleted: 1 },
        { new: true }
    );

    return updatedExpertise;
};




export { getExperties, getExpertiesById, addNewExperties, updateExperties, changeStatus, deleteExperties };
