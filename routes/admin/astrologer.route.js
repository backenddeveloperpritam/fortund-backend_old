import express from 'express';
import validate from "../../middlewares/validate.js";
import * as astrologerValidation from '../../validations/astrologer.validation.js';
import * as astrologerController from '../../controllers/admin/astrologer.Controller.js';
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get(
    "/astrologers",
    validate(astrologerValidation.searchAstrologer),
    astrologerController.astrologerList
);

router.get(
    "/astrologers/:astrologerId",
    validate(astrologerValidation.getAstrologerId),
    astrologerController.getAstrologerById
);

router.post("/add-astrologers",
    validate(astrologerValidation.addNewAstrologer),
    upload.fields([
        {
            name: "profileImage",
            maxCount: 1
        },
        {
            name: "idProofImage",
            maxCount: 1
        },
        {
            name: "galleryImage",
            maxCount: 5
        }

    ]),
    astrologerController.addNewAstrologer
);

// router.put("/astrologers/:astrologerId",
//     validate(astrologerValidation.updateAstrologer),
//     astrologerController.updateAstrologerById
// );

export default router;
