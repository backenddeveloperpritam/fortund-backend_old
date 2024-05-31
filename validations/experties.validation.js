import Joi from "joi";
import { sortBy } from '../utils/values.js';
import { objectId } from "./custom.validation.js";

const expertiseSchema = Joi.object().keys({
    title: Joi.string().required(),
    status: Joi.string().valid('Active', 'InActive').required(),
});


const getExpertise = {
    query: Joi.object().keys({
        title: Joi.string().required(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};

const getExpertiseById = {
    params: Joi.object().keys({
        expertiseId: Joi.string().custom(objectId),
    }),
};

const addNewExpertise = {
    body: expertiseSchema,
};

const updateExpertise = {
    body: expertiseSchema,
};

const changeStatus = {
    body: Joi.object().keys({
        expertiseId: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").required(),
    }),
};
const deleteExpertise = {
    body: Joi.object().keys({
        expertiseId: Joi.string().required(),
    }),
};

export {
    getExpertise,
    getExpertiseById,
    addNewExpertise,
    updateExpertise,
    changeStatus,
    deleteExpertise
};
