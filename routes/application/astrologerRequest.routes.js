import express from 'express';
import validate from "../../middlewares/validate.js";
import * as astrologerValidation from '../../validations/astrologer.validation.js';
import * as AstrologerRequests from '../../controllers/application/astrologerRequest.controller.js';
import { verifyJWT } from "../../middlewares/auth.middleware.js";
import { upload } from "../../middlewares/multer.middleware.js";


const router = express.Router();


router.route("/update-profile").post(upload.single("profileImage"), AstrologerRequests.updateAstrologerProfile)
router.route("/update-phone-number").post(AstrologerRequests.updateAstrologerPhoneNumber)
router.route("/update-bank-details").post(AstrologerRequests.updateAstrologerBankDetails)
router.route("/update-gallery").post(AstrologerRequests.updateGalleryRequest)


export default router;
