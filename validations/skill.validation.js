import Joi from "joi";
import { sortBy } from '../utils/values.js';
import { objectId } from "./custom.validation.js";

const getSkills = {
    query: Joi.object().keys({
        astrologerName: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};

const getSkillsById = {
    params: Joi.object().keys({
        skillId: Joi.string().custom(objectId),
    }),
};


const addNewSkill = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().valid("Active", "InActive").required(),
}).options({ allowUnknown: true });


const updateSkill = Joi.object({
    title: Joi.string().required(),
    status: Joi.string().valid("Active", "InActive").required(),
}).options({ allowUnknown: true });

const updateImage = Joi.object({
    skillId: Joi.string().required(),
}).options({ allowUnknown: true });


const changeStatus = {
    body: Joi.object().keys({
        skillId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").required(),
    }),
};

const deleteSkill = {
    body: Joi.object().keys({
        skillId: Joi.string().required(),
    }),
};

export {
    getSkills,
    getSkillsById,
    addNewSkill,
    updateSkill,
    changeStatus,
    updateImage,
    deleteSkill
};
