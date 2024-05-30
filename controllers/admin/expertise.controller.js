import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as ExpertiesService from '../../services/experties.service.js';
import httpStatus from 'http-status';


const expertiesList = asyncHandler(async (req, res) => {
   
    const result = await ExpertiesService.getExperties();

    return res.status(200).json(new ApiResponse(httpStatus.OK, result, "Experties fetched successfully"));

});

const getExpertiesById = asyncHandler(async (req, res) => {
    console.log('test');
    const result = await ExpertiesService.getExpertiesById(req.params.expertiseId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Experties found with matching id");
    }
    return res.status(200).json(new ApiResponse(200, result, "Experties fetched successfully"));

});


const addNewExperties = asyncHandler(async (req, res) => {
    const result = await ExpertiesService.addNewExperties(req.body);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "Experties Not added !");
    }
    return res.status(200).json(new ApiResponse(200, result, "Experties added successfully."));

});


const updateExperties = asyncHandler(async (req, res) => {
    const { expertiseId } = req.params;
    const updateData = req.body;

    const updatedSkill = await ExpertiesService.updateExperties(expertiseId, updateData);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Experties Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Experties Updated successfully."));

});



const changeStatus = asyncHandler(async (req, res) => {
    const { expertiseId, status } = req.body;
    const result = await ExpertiesService.changeStatus(expertiseId, status);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Experties found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Experties Updated successfully"));
})

const deleteExperties = asyncHandler(async (req, res) => {
    const { expertiseId } = req.body;
    const result = await ExpertiesService.deleteExperties(expertiseId);

    return res.status(200).json(new ApiResponse(200, {}, "Experties delleted successfully"));
})


export { expertiesList, getExpertiesById, addNewExperties, updateExperties, changeStatus, deleteExperties };
