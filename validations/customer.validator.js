import Joi from 'joi';
import { validateRequest } from './custom.validation.js';

// Define the schema using Joi
const customerIdSchema = Joi.object({
    customerId: Joi.string().required().messages({
        'any.required': 'Customer ID is required',
        'string.empty': 'Customer ID cannot be empty',
    })
});

const customerLoginSchema = Joi.object({
    phoneNumber: Joi.string().required(),
});

const customerOtpVerificationSchema = Joi.object({
    phoneNumber: Joi.string().required(),
    fcmToken: Joi.string().required(),
});

const customerGoogleLoginSchema = Joi.object({
    email: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    fcmToken: Joi.string().required(),
});

const customerFacebookLoginSchema = Joi.object({
    facebookId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().optional(),
    fcmToken: Joi.string().required(),
});

const customerRegistrationSchema = Joi.object({
    customerId: Joi.string().required(),
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    gender: Joi.string().required(),
    city: Joi.string().required(),
    birthPlace: Joi.string().required(),
    latitude: Joi.number().required(),
    longitude: Joi.number().required(),
    dateOfBirth: Joi.date().required(),
    timeOfBirth: Joi.date().required(),
    occupation: Joi.string().required(),
    problem: Joi.string().required(),
});

// Middleware to validate customerId
export const validateCustomerId = validateRequest(customerIdSchema);
export const validateCustomerLogin = validateRequest(customerLoginSchema);
export const validateCustomerOtpVerification = validateRequest(customerOtpVerificationSchema);
export const validateCustomerGoogleLogin = validateRequest(customerGoogleLoginSchema);
export const validateCustomerFacebookLogin = validateRequest(customerFacebookLoginSchema);
export const validateCustomerRegistration = validateRequest(customerRegistrationSchema);
