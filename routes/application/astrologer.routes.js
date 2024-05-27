import express from 'express';
import validate from "../../middlewares/validate.js";
import * as astrologerValidation from '../../validations/astrologer.validation.js';
import * as astrologerController from '../../controllers/application/astrologer.controller.js';
import { verifyJWT } from "../../middlewares/auth.middleware.js";

const router = express.Router();

router.post(
    "/login-astrologer",
    validate(astrologerValidation.loginAstrologer),
    astrologerController.astrologerLogin
);
router.post(
    "/logout-astrologer", verifyJWT,
    astrologerController.logoutAstrologer
);

router.get(
    "/astrologers",
    validate(astrologerValidation.searchAstrologer),
    astrologerController.astrologerList
);


router.post(
    "/astrologer-change-call-status",
    validate(astrologerValidation.changeCallStatus),
    astrologerController.changeCallStatus
);

router.post(
    "/astrologer-change-chat-status",
    validate(astrologerValidation.changeChatStatus),
    astrologerController.changeChatStatus
);


export default router;
