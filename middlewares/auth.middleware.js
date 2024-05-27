import ApiError from "../utils/ApiError.js";
import { asyncHandler } from "../utils/asyncHandler.js";
import jwt from "jsonwebtoken"
import Astrologer from "../models/adminModel/Astrologer.js";

export const verifyJWT = asyncHandler(async (req, _, next) => {
    // try {
        const token = req.cookies?.accessToken || req.header("Authorization")?.replace("Bearer ", "")

        // console.log(token);
        if (!token) {
            throw new ApiError(401, "Unauthorized request")
        }

        const decodedToken = jwt.verify(token, process.env.ACCESS_TOKEN_SECRET)

        const astrologer = await Astrologer.findById(decodedToken?._id).select("-password -refreshToken")

        if (!astrologer) {

            throw new ApiError(401, "Invalid Access Token")
        }

        req.astrologer = astrologer;
        next()
    // } catch (error) {
    //     throw new ApiError(401, error?.message || "Invalid access token")
    // }

})