import ApiError from "../utils/ApiError.js";
import SubSkill from "../models/adminModel/SubSkills.js";

const getSubSkill = async () => {

    const subskills = await SubSkill.find({}).populate('skill', 'title');
    return subskills;
};

const getSubSkillById = async (id) => {
    const subskill = await SubSkill.findOne({ _id: id });
    if (!subskill) {
        return null;
    }
    return subskill;
}

const addNewSubSkill = async (body) => {
    const { title, description, skill, status } = body;

    const existsubSkill = await SubSkill.findOne({ title: new RegExp('^' + title + '$', 'i') });

    if (existsubSkill) {
        throw new ApiError(400, "Sub-Skill already exist");
    }

    const existSkill = await SubSkill.findById({ _id: skill });

    if (existSkill) {
        throw new ApiError(400, "Skill Not found. !");
    }

    const subskill = await SubSkill.create({
        title, description, skill, status
    });

    return subskill;
}


const updateSubSkill = async (subSkillId, updateData) => {
    const updatedSubSkill = await SubSkill.findByIdAndUpdate(subSkillId, updateData, { new: true });
    return updatedSubSkill;
}



const changeStatus = async (subskillId, status) => {
    const subskill = await SubSkill.findByIdAndUpdate(
        subskillId,
        { status },
        { new: true }
    );

    return subskill;
};

const deleteSubSkill = async (subskillId) => {
    const updatedSubSkill = await SubSkill.findByIdAndUpdate(
        subskillId,
        { isDeleted: 1 },
        { new: true }
    );

    return updatedSubSkill;
};




export { getSubSkill, getSubSkillById, addNewSubSkill, updateSubSkill, changeStatus, deleteSubSkill };
