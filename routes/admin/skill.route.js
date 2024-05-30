import express from 'express';
import validate from "../../middlewares/validate.js";
import * as skillValidation from '../../validations/skill.validation.js';
import * as SkillController from '../../controllers/admin/skills.controller.js';
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";


const router = express.Router();

router.get("/skill",
    SkillController.skillsList
);

router.get("/skill/:skillId",
    validate(skillValidation.getSkillsById),
    SkillController.getSkillsById
);

router.post("/add-newSkill",
    validate(skillValidation.addNewSkill),
    upload.single("image"),
    SkillController.addNewSkills
);

router.post("/update-skill",
    validate(skillValidation.updateSkill),
    upload.single("image"),
    SkillController.updateSkill
);
router.post("/update-image",
    validate(skillValidation.updateImage),
    upload.single("image"),
    SkillController.updateImage
);

router.post("/change-status",
    validate(skillValidation.changeStatus),
    SkillController.changeStatus
);

router.post("/skill/delete",
    validate(skillValidation.deleteSkill),
    SkillController.deleteSkill
);


export default router;
