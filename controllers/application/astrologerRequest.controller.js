import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as astrologerRequestService from '../../services/application/astrologerRequest.service.js';
import httpStatus from 'http-status';

const updateAstrologerProfile = asyncHandler(async (req, res) => {
    const newAstrologerRequest = await astrologerRequestService.addNewProfileRequest(req.body, req.file);

    if (!newAstrologerRequest) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Profile request failed to send");
    }

    return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newAstrologerRequest, "Profile Request Send successfully."));

});

const updateAstrologerPhoneNumber = asyncHandler(async (req, res) => {
    const newAstrologerRequest = await astrologerRequestService.addNewPhoneNumberRequest(req.body);

    if (!newAstrologerRequest) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "PhoneNumberr request failed to send");
    }

    return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newAstrologerRequest, "PhoneNumberr Request Send successfully."));

});

const updateAstrologerBankDetails = asyncHandler(async (req, res) => {
    const newAstrologerRequest = await astrologerRequestService.addNewBankRequest(req.body);

    if (!newAstrologerRequest) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Bank request failed to send");
    }

    return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newAstrologerRequest, "Bank Request Send successfully."));

});

const updateGalleryRequest = asyncHandler(async (req, res) => {
    const newAstrologerRequest = await astrologerRequestService.addNewGalleryRequest(req.body,req.files);

    if (!newAstrologerRequest) {
        throw new ApiError(httpStatus.INTERNAL_SERVER_ERROR, "Gallery request failed to send");
    }

    return res.status(httpStatus.OK).json(new ApiResponse(httpStatus.OK, newAstrologerRequest, "Gallery Request Send successfully."));

});

export { updateAstrologerProfile, updateAstrologerBankDetails, updateAstrologerPhoneNumber,updateGalleryRequest };
