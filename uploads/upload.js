import configureMulter from "../configureMulter.js";

export const uploadCustomerImage = configureMulter("uploads/customerProfile/", [
    { name: "profileImage", maxCount: 1 },
]);