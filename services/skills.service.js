import ApiError from "../utils/ApiError.js";
import Skill from "../models/adminModel/Skills.js";
import { uploadOnCloudinary, deleteFromCloudinary } from "../utils/cloudinary.js"

const getSkills = async () => {

    const skills = await Skill.find({});
    return skills;

};
const getSkillById = async (id) => {
    const skill = await Skill.findOne({ _id: id });
    if (!skill) {
        return null;
    }
    return skill;
}

const addNewSkill = async (body, file) => {
    const { title, status } = body;

    if (!file || !file.path) {
        throw new ApiError(400, "Image file is required");
    }

    const existSkill = await Skill.findOne({ title: new RegExp('^' + title + '$', 'i') });

    if (existSkill) {
        throw new ApiError(400, "Skill already exist");
    }

    const skillImage = await uploadOnCloudinary(file.path);
    if (!skillImage || !skillImage.url) {
        throw new ApiError(500, "Failed to upload image");
    }

    const skill = await Skill.create({
        title,
        status,
        image: skillImage.url,
    });

    return skill;
}

const updateSkill = async (body, file) => {
    const { skillId, title, status } = body;

    if (!file || !file.path) {
        throw new ApiError(400, "Image file is required");
    }

    // Find the skill by ID
    const skill = await Skill.findById(skillId);

    if (!skill) {
        throw new ApiError(404, "Skill not found");
    }

    // Upload new image
    const skillImage = await uploadOnCloudinary(file.path);
    if (!skillImage || !skillImage.url) {
        throw new ApiError(500, "Failed to upload image");
    }

    // Update skill properties
    skill.title = title;
    skill.status = status;
    skill.image = skillImage.url;

    // Save the updated skill
    await skill.save();

    return skill;
}


const changeStatus = async (skillId, status) => {
    const skill = await Skill.findById(skillId);
    if (!skill) {
        return null;
    }

    skill.status = status;

    await skill.save();

    return skill;
};

const updateImage = async (body, file) => {
    const { skillId } = body;

    if (!skillId) {
        throw new ApiError(400, "Invalid request. skillId is required.");
    }

    const imageLocalPath = file ? file.path : '';
    if (!imageLocalPath) {
        throw new ApiError(400, "Image file is missing.");
    }

    const existingSkill = await Skill.findById(skillId);
    if (!existingSkill) {
        throw new ApiError(404, "Skill not found.");
    }

    if (existingSkill.image) {
        await deleteFromCloudinary(existingSkill.image);
    }

    const image = await uploadOnCloudinary(imageLocalPath);
    if (!image || !image.url) {
        throw new ApiError(400, "Error while uploading image.");
    }

    const skill = await Skill.findByIdAndUpdate(
        skillId,
        { $set: { image: image.url } },
        { new: true }
    );

    return skill;
}

const deleteSkill = async (skillId) => {
    const updatedSkill = await Skill.findByIdAndUpdate(
        skillId,
        { isDeleted: 1 }, 
        { new: true }
    );

    return updatedSkill;
};

export { getSkills, addNewSkill, getSkillById, changeStatus, updateSkill, updateImage,deleteSkill };
