import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as subSkillService from '../../services/subSkills.service.js';
import httpStatus from 'http-status';


const skillsList = asyncHandler(async (req, res) => {

    const title = req.query.title || "";

    const result = await subSkillService.getSkills(title);

    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Skill found");
    }

    return res.status(200).json(new ApiResponse(httpStatus.OK, result, "Skills fetched successfully"));

});

const getSkillsById = asyncHandler(async (req, res) => {
    const result = await subSkillService.getSkillById(req.params.skillId);
    if (!result) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Skill found with matching id");
    }
    return res.status(200).json(new ApiResponse(200, result, "Skill fetched successfully"));

});


const addNewSkills = asyncHandler(async (req, res) => {
    const newSkill = await subSkillService.addNewSkill(req.body, req.file);
    if (!newSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Skill Not added !");
    }
    return res.status(200).json(new ApiResponse(200, newSkill, "Skill added successfully."));

});


const updateSkill = asyncHandler(async (req, res) => {
    const updatedSkill = await subSkillService.updateSkill(req.body, req.file);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Skill Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Skill Updated successfully."));

});


const updateImage = asyncHandler(async (req, res) => {

    const updatedSkill = await subSkillService.updateImage(req.body, req.file);
    if (!updatedSkill) {
        throw new ApiError(httpStatus.NOT_FOUND, "Skill Not Updated !");
    }
    return res.status(200).json(new ApiResponse(200, updatedSkill, "Skill Updated successfully."));

})



const changeStatus = asyncHandler(async (req, res) => {
    const { skillId, status } = req.body;

    const result = await subSkillService.changeStatus(skillId, status);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Skill found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Skill Updated successfully"));
})


export { skillsList, getSkillsById, addNewSkills, updateSkill, updateImage, changeStatus };
