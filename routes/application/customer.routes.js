import { Router } from 'express';
import CustomerController from '../../controllers/application/customer.controller.js';
import * as validation from '../../validations/customer.validator.js'
import * as uploads from '../../uploads/upload.js'

const router = Router()

router.post('/customer_login', validation.validateCustomerLogin, CustomerController.customerLogin)
router.post('/customer_otp_verify', validation.validateCustomerOtpVerification, CustomerController.customerOtpVerify)
router.post('/customer_google_login', validation.validateCustomerGoogleLogin, CustomerController.customerGoogleLogin)
router.post('/customer_facebook_login', validation.validateCustomerFacebookLogin, CustomerController.customerFacebookLogin)
router.post('/customer_registration', uploads.uploadCustomerImage, validation.validateCustomerRegistration, CustomerController.customerRegistration)
router.post('/get_customer_details', validation.validateCustomerId, CustomerController.getCustomerDetails)

export default router;