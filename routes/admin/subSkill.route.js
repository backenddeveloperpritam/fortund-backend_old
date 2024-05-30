import express from 'express';
import validate from "../../middlewares/validate.js";
import * as SubskillValidation from '../../validations/subskill.validation.js';
import * as SubSkillController from '../../controllers/admin/subSkill.controller.js';
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";


const router = express.Router();

router.get("/sub-skill",
    SubSkillController.subSkillsList
);

router.get("/sub-skill/:subSkillId",
    validate(SubskillValidation.getSubSkillById),
    SubSkillController.getSubSkillById
);

router.post("/add-new-sub-skill",
    validate(SubskillValidation.addNewSubSkill),
    SubSkillController.addNewSubSkill
);

router.post("/update-sub-skill/:subSkillId",
    validate(SubskillValidation.updateSubSkill),
    SubSkillController.updateSubSkill
);

router.post("/sub-skill/change-status",
    validate(SubskillValidation.changeStatus),
    SubSkillController.changeStatus
);

router.post("/sub-skill/delete",
    validate(SubskillValidation.deleteSubSkill),
    SubSkillController.deleteSubSkill
);

export default router;
