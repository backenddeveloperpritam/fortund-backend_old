import httpStatus from 'http-status';
import CustomerServices from '../../services/application/customer.service.js';
import ApiResponse from '../../utils/ApiResponse.js';

class CustomerController {
    static async customerLogin(req, res) {
        try {
            const { phoneNumber } = req.body;
            const otp = Math.floor(1000 + Math.random() * 9000).toString();
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, otp, "Otp Send Successfully"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }

    static async customerOtpVerify(req, res) {
        try {
            const { phoneNumber, fcmToken } = req.body;
            const customer = await CustomerServices.getCustomerByData({ phoneNumber });
            if (customer) {
                const updatedCustomer = await CustomerServices.updateCustomerData({ fcmToken }, customer._id)
                return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, { customer: updatedCustomer, type: 'register' }, "Customer fetched successfully"));
            }
            const newCustomer = await CustomerServices.createCustomerByData({ phoneNumber, fcmToken })
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, { customer: newCustomer, type: 'register' }, "Customer fetched successfully"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }

    static async customerGoogleLogin(req, res) {
        try {
            const { email, firstName, lastName, fcmToken } = req.body;
            const customer = await CustomerServices.getCustomerByData({ email });
            if (customer) {
                const updatedCustomer = await CustomerServices.updateCustomerData({ fcmToken }, customer._id)
                return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, updatedCustomer, "Customer fetched successfully"));
            }
            const customerName = firstName + ' ' + lastName
            const newCustomer = await CustomerServices.createCustomerByData({ email, fcmToken, customerName, firstName, lastName })
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newCustomer, "Customer fetched successfully"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }

    static async customerFacebookLogin(req, res) {
        try {
            const { facebookId, firstName, lastName, fcmToken } = req.body;
            const customer = await CustomerServices.getCustomerByData({ facebookId });
            if (customer) {
                const updatedCustomer = await CustomerServices.updateCustomerData({ fcmToken }, customer._id)
                return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, updatedCustomer, "Customer fetched successfully"));
            }
            const customerName = firstName + ' ' + lastName
            const newCustomer = await CustomerServices.createCustomerByData({ facebookId, fcmToken, customerName, firstName, lastName })
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newCustomer, "Customer fetched successfully"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }

    static async customerFacebookLogin(req, res) {
        try {
            const { facebookId, firstName, lastName, fcmToken } = req.body;
            const customer = await CustomerServices.getCustomerByData({ facebookId });
            if (customer) {
                const updatedCustomer = await CustomerServices.updateCustomerData({ fcmToken }, customer._id)
                return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, updatedCustomer, "Customer fetched successfully"));
            }
            const customerName = firstName + ' ' + lastName
            const newCustomer = await CustomerServices.createCustomerByData({ facebookId, fcmToken, customerName, firstName, lastName })
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newCustomer, "Customer fetched successfully"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }

    static async customerRegistration(req, res) {
        try {
            const { customerId, firstName, lastName, email, gender, city, birthPlace, latitude, longitude, dateOfBirth, timeOfBirth, occupation, problem } = req.body;
            const customer = await CustomerServices.getCustomerById(customerId);
            if (customer) {
                const profileImage = req.files["profileImage"]
                ? req.files["profileImage"][0].path.replace(
                  /^.*profileImage[\\/]/,
                  "profileImage/"
                )
                : "";
                const data = {
                    firstName,
                    lastName,
                    email,
                    gender,
                    dateOfBirth,
                    timeOfBirth,
                    occupation,
                    problem,
                    profileImage,
                    currentAddress: {city},
                    birthPlaceAddress: {birthPlace, latitude, longitude},
                    isRegistered: true,
                }

                const updatedCustomer = await CustomerServices.updateCustomerData(data, customer._id)

                return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, updatedCustomer, "Your Profile Updated"));
            }
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.BAD_REQUEST, null, "Customer not found"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }

    static async getCustomerDetails(req, res) {
        try {
            const { customerId } = req.body;
            if (!customerId) {
                return res.status(httpStatus.BAD_REQUEST).json(new ApiResponse(httpStatus.BAD_REQUEST, null, "Customer ID is required"));
            }

            const customer = await CustomerServices.getCustomerById(customerId);
            return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, customer, "Customer fetched successfully"));
        } catch (e) {
            console.error(e);
            return res.status(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR).json(new ApiResponse(e.statusCode || httpStatus.INTERNAL_SERVER_ERROR, null, e.message || "An error occurred while fetching customer details"));
        }
    }
}

export default CustomerController;
