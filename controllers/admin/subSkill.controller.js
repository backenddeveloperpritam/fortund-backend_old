import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as subSkillService from '../../services/subSkills.service.js';
import httpStatus from 'http-status';


const subSkillsList = asyncHandler(async (req, res) => {

    const result = await subSkillService.getSubSkill();

    return res.status(200).json(new ApiResponse(httpStatus.OK, result, "Sub - Skills fetched successfully"));

});

const getSubSkillById = asyncHandler(async (req, res) => {
    const result = await subSkillService.getSubSkillById(req.params.subSkillId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Sub - Skills found with matching id");
    }
    return res.status(200).json(new ApiResponse(200, result, "Sub - Skills fetched successfully"));

});


const addNewSubSkill = asyncHandler(async (req, res) => {
    console.log(req.body);
    const newSkill = await subSkillService.addNewSubSkill(req.body);
    if (!newSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Sub - Skills Not added !");
    }
    return res.status(200).json(new ApiResponse(200, newSkill, "Sub - Skills added successfully."));

});


const updateSubSkill = asyncHandler(async (req, res) => {
    const { subSkillId } = req.params;
    const updateData = req.body;

    const updatedSkill = await subSkillService.updateSubSkill(subSkillId, updateData);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Sub - Skills Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Sub - Skills Updated successfully."));

});



const changeStatus = asyncHandler(async (req, res) => {
    const { subskillId, status } = req.body;
    const result = await subSkillService.changeStatus(subskillId, status);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Sub - Skills found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Sub - Skills Updated successfully"));
})

const deleteSubSkill = asyncHandler(async (req, res) => {
    const { subskillId } = req.body;
    const result = await subSkillService.deleteSubSkill(subskillId);
   
    return res.status(200).json(new ApiResponse(200, {}, "Sub - Skills delleted successfully"));
})


export { subSkillsList, getSubSkillById, addNewSubSkill, updateSubSkill, changeStatus ,deleteSubSkill};
