import Customers from "../../models/customer/customer.model.js";
import ApiError from "../../utils/ApiError.js";
class CustomerServices {
    static async getCustomerById(_id) {
        try {
            const customer = await Customers.findById(_id);
            if (!customer) {
                throw new ApiError(404, "Customer not found");
            }
            return customer;
        } catch (e) {
            console.error(e);
            throw e;
        }
    }

    static async getCustomerByData(data) {
        try {
            const customer = await Customers.findOne((data));
            if (!customer) {
                return false
            }
            return customer;
        } catch (e) {
            console.error(e);
            return false
        }
    }

    static async createCustomerByData(data) {
        try {
            const customer = new Customers({ ...data })
            await customer.save()
            return customer;
        } catch (e) {
            console.error(e);
            return false
        }
    }

    static async updateCustomerData(data, _id) {
        try {
            let customer = await Customers.findById(_id);
            if (!customer) {
                throw new ApiError(404, "Customer not found");
            }
            customer.set(data);
            await customer.save()
            return customer;
        } catch (e) {
            console.error(e);
            throw (e)
        }
    }
}

// Export the CustomerServices class
export default CustomerServices;
