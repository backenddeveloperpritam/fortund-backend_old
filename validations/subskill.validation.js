import Joi from "joi";
import { sortBy } from '../utils/values.js';
import { objectId } from "./custom.validation.js";

const subSkillSchema = Joi.object().keys({
    title: Joi.string().required(),
    description: Joi.string().required(),
    skill: Joi.string().required(),
    status: Joi.string().valid('Active', 'InActive').required(),
});


const getSkills = {
    query: Joi.object().keys({
        astrologerName: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};

const getSubSkillById = {
    params: Joi.object().keys({
        subSkillId: Joi.string().custom(objectId),
    }),
};

const addNewSubSkill = {
    body: subSkillSchema,
};

const updateSubSkill = {
    body: subSkillSchema,
};

const changeStatus = {
    body: Joi.object().keys({
        subskillId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").required(),
    }),
};
const deleteSubSkill = {
    body: Joi.object().keys({
        subskillId: Joi.string().required(),
    }),
};

export {
    getSkills,
    getSubSkillById,
    addNewSubSkill,
    updateSubSkill,
    changeStatus,
    deleteSubSkill
};
