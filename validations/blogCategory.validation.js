import Joi from "joi";

import {
    sortBy
} from '../utils/values.js';
import { objectId, customJoi } from "./custom.validation.js";
import { query } from "express";

const searchBlogCategory = {
    query: Joi.object().keys({
        title: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};


const getblogCategoryId = {
    params: Joi.object().keys({
        blogCategoryId: Joi.string().custom(objectId),
    }),
};

const addNewBlogCategory = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};

const updateBlogCategory = {
    params: Joi.object().keys({
        blogCategoryId: Joi.string().custom(objectId).required(),
    }),
    body: Joi.object().keys({
        title: Joi.string().required(),
        status: Joi.string().valid("Active", "InActive").optional(),
    }),
};


const deleteBlogCategory = {
    body: Joi.object().keys({
        blogCategoryId: Joi.string().required(),
    }),
};

export {
    searchBlogCategory,
    getblogCategoryId,
    addNewBlogCategory,
    updateBlogCategory,
    deleteBlogCategory
};