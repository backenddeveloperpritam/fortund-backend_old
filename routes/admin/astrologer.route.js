import express from 'express';
import validate from "../../middlewares/validate.js";
import * as astrologerValidation from '../../validations/astrologer.validation.js';
import * as astrologerController from '../../controllers/admin/astrologer.controller.js';
import { upload } from "../../middlewares/multer.middleware.js";
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.get("/astrologers",
    validate(astrologerValidation.searchAstrologer),
    astrologerController.astrologerList
);

router.get("/astrologers/:astrologerId",
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


router.post("/astrologer-change-call-status",
    validate(astrologerValidation.changeCallStatus),
    astrologerController.changeCallStatus
);

router.post("/astrologer-change-chat-status",
    validate(astrologerValidation.changeChatStatus),
    astrologerController.changeChatStatus
);

router.post("/astrologer-change-status",
    validate(astrologerValidation.changeStatus),
    astrologerController.changeStatus
);

export default router;
