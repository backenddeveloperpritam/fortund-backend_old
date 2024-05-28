import Joi from "joi";

import {
    sortBy
} from '../utils/values.js';
import { objectId, customJoi } from "./custom.validation.js";
import { query } from "express";

const searchAstrologer = {
    query: Joi.object().keys({
        astrologerName: Joi.string(),
        sortBy: Joi.string().valid(...sortBy),
    }),
};


const getAstrologerId = {
    params: Joi.object().keys({
        astrologerId: Joi.string().custom(objectId),
    }),
};

const addNewAstrologer = Joi.object({
    displayName: Joi.string().required(),
    name: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().required(),
    phoneCode: Joi.string().required(),
    phoneNumber: Joi.string().required(),
    gender: Joi.string().valid('Male', 'Female', 'Other').required(),
    dateOfBirth: Joi.date().required(),
    experience: Joi.string().required(),
    language: Joi.array().items(Joi.string()).required(),
    address: Joi.string().required(),
    currencyType: Joi.string().valid("INR", "USD").required(),
    currencyValue: Joi.number().required(),
    country: Joi.string().required(),
    state: Joi.string().required(),
    city: Joi.string().required(),
    zipCode: Joi.number().required(),
    about: Joi.string().required(),
    educationQualification: Joi.string().optional(),
    astrologyQualification: Joi.string().optional(),
    follower_count: Joi.number().optional(),
    rating: Joi.number().optional(),
    profileImage: Joi.any().required(),
    idProofImage: Joi.any().required(),
    galleryImage: Joi.array().items(Joi.any()).optional(),
    bankProofImage: Joi.any().required(),
    bankAcountNumber: Joi.string().required(),
    bankName: Joi.string().required(),
    accountType: Joi.string().required(),
    ifscCode: Joi.string().required(),
    accouuntHolderName: Joi.string().required(),
    addharNumber: Joi.number().required(),
    panNumber: Joi.string().required(),
    chatPrice: Joi.number().required(),
    companyChatPrice: Joi.number().required(),
    callPrice: Joi.number().required(),
    companyCallPrice: Joi.number().required(),
    liveVideoPrice: Joi.number().required(),
    companyLiveVideoPrice: Joi.number().required(),
    liveCallPrice: Joi.number().required(),
    companyLiveCallPrice: Joi.number().required(),
    skill: Joi.array().items(Joi.string()).required(),
    expertise: Joi.array().items(Joi.string()).required(),
    remedies: Joi.array().items(Joi.string()).optional(),
    astrologerType: Joi.string().valid("Consultation", "Teaching", "Pandit", "All").required(),
    status: Joi.string().valid("Active", "Blocked").required(),
}).options({ allowUnknown: true });



const updateAstrologer = {
    body: Joi.object().keys({
        title: Joi.string().required(),
        status: Joi.string().valid("Active", "Blocked").optional(),
    }),
};
const changeCallStatus = {
    body: Joi.object().keys({
        astrologerId: Joi.string().required(),
        callStatus: Joi.string().valid("Offline", "Online", "Busy").required(),
    }),
};
const changeChatStatus = {
    body: Joi.object().keys({
        astrologerId: Joi.string().required(),
        chatStatus: Joi.string().valid("Offline", "Online", "Busy").required(),
    }),
};

const changeStatus = {
    body: Joi.object().keys({
        astrologerId: Joi.string().required(),
        status: Joi.string().valid("Active", "Blocked").required(),
    }),
};


const loginAstrologer = {
    body: Joi.object().keys({
        email: Joi.string().email().required(),
        password: Joi.string().required(),
        fcmToken: Joi.string().required()
    })
};






export {
    searchAstrologer,
    getAstrologerId,
    addNewAstrologer,
    updateAstrologer,
    loginAstrologer,
    changeCallStatus,
    changeChatStatus,
    changeStatus
};