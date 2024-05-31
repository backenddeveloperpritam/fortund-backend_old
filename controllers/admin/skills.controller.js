import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as skillService from '../../services/skills.service.js';
import httpStatus from 'http-status';


const skillsList = asyncHandler(async (req, res) => {

    const title = req.query.title || "";

    const result = await skillService.getSkills(title);

    return res.status(200).json(new ApiResponse(httpStatus.OK, result, "Skills fetched successfully"));

});

const getSkillsById = asyncHandler(async (req, res) => {
    const result = await skillService.getSkillById(req.params.skillId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Skill found with matching id");
    }
    return res.status(200).json(new ApiResponse(200, result, "Skill fetched successfully"));

});


const addNewSkills = asyncHandler(async (req, res) => {
    const newSkill = await skillService.addNewSkill(req.body, req.file);
    if (!newSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Skill Not added !");
    }
    return res.status(200).json(new ApiResponse(200, newSkill, "Skill added successfully."));

});


const updateSkill = asyncHandler(async (req, res) => {
    const updatedSkill = await skillService.updateSkill(req.body, req.file);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Skill Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Skill Updated successfully."));

});


const updateImage = asyncHandler(async (req, res) => {

    const updatedSkill = await skillService.updateImage(req.body, req.file);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Skill Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Skill Updated successfully."));

})



const changeStatus = asyncHandler(async (req, res) => {
    const { skillId, status } = req.body;

    const result = await skillService.changeStatus(skillId, status);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Skill found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Skill Updated successfully"));
})

const deleteSkill = asyncHandler(async (req, res) => {
    const { skillId } = req.body;
    const result = await skillService.deleteSkill(skillId);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Skill found");
    }
    return res.status(200).json(new ApiResponse(200, {}, "Skills delleted successfully"));
})


export { skillsList, getSkillsById, addNewSkills, updateSkill, updateImage, changeStatus, deleteSkill };
