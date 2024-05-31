import express from 'express';
import validate from "../../middlewares/validate.js";
import * as ExpertiesValidation from '../../validations/experties.validation.js';
import * as ExpertiesController from '../../controllers/admin/expertise.controller.js';
import { verifyJWT } from '../../middlewares/auth.middleware.js';
const router = express.Router();

router.get("/expertise",
    ExpertiesController.expertiesList
);

router.get("/expertise/:expertiseId",
    validate(ExpertiesValidation.getExpertiseById),
    ExpertiesController.getExpertiesById
);

router.post("/add-new-expertise",
    validate(ExpertiesValidation.addNewExpertise),
    ExpertiesController.addNewExperties
);

router.post("/update-expertise/:expertiseId",
    validate(ExpertiesValidation.updateExpertise),
    ExpertiesController.updateExperties
);

router.post("/expertise/change-status",
    validate(ExpertiesValidation.changeStatus),
    ExpertiesController.changeStatus
);

router.post("/expertise/delete",
    validate(ExpertiesValidation.deleteExpertise),
    ExpertiesController.deleteExperties
);

export default router;
