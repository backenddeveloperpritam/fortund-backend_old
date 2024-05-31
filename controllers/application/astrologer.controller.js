import ApiResponse from "../../utils/ApiResponse.js";
import { asyncHandler } from "../../utils/asyncHandler.js";
import ApiError from "../../utils/ApiError.js";
import * as astrologerService from '../../services/application/astrologer.service.js';
import httpStatus from 'http-status';


const generateAccessAndRefereshTokens = async (astrologerId, fcmToken) => {
    try {
        const astrologer = await astrologerService.getAstrologerById(astrologerId)
        const accessToken = astrologer.generateAccessToken()
        const refreshToken = astrologer.generateRefreshToken()
        astrologer.refreshToken = refreshToken
        astrologer.fcmToken = fcmToken
        await astrologer.save({ validateBeforeSave: false })

        return { accessToken, refreshToken }


    } catch (error) {
        throw new ApiError(500, "Something went wrong while generating referesh and access token")
    }
}

const astrologerLogin = asyncHandler(async (req, res) => {
    const { email, password, fcmToken } = req.body;

    const astrologer = await astrologerService.loginAstrologer(email);

    if (!astrologer || astrologer.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "Astrologer does not exist");
    }
    const isPasswordValid = await astrologer.isPasswordCorrect(password);

    if (!isPasswordValid) {
        throw new ApiError(401, "Invalid Astrologer credentials")
    }

    if (astrologer.isDeleted === 1) {
        throw new ApiError(400, "Your account Not Found !");
    }

    if (astrologer.status == "Blocked") {
        throw new ApiError(400, "Your account has been Blocked, please contact admin support.");
    }

    const { accessToken, refreshToken } = await generateAccessAndRefereshTokens(astrologer._id, fcmToken)

    const loggedInAstrologer = await astrologerService.getAstrologerById(astrologer._id);

    loggedInAstrologer.fcmToken = fcmToken;


    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .cookie("accessToken", accessToken, options)
        .cookie("refreshToken", refreshToken, options)
        .json(
            new ApiResponse(
                200,
                {
                    astrologer: loggedInAstrologer, accessToken, refreshToken
                },
                "Astrologer logged In Successfully"
            )
        )

});


const logoutAstrologer = asyncHandler(async (req, res) => {

    const astrologer = await astrologerService.logoutAstrologer(req.astrologer._id);
    const options = {
        httpOnly: true,
        secure: true
    }

    return res
        .status(200)
        .clearCookie("accessToken", options)
        .clearCookie("refreshToken", options)
        .json(new ApiResponse(200, {}, "Astrologer logged Out"))
})


const astrologerList = asyncHandler(async (req, res) => {
    const title = req.query.title || "";
    const result = await astrologerService.getAstrologer(title);

    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));
});

const changeCallStatus = asyncHandler(async (req, res) => {
    const { astrologerId, callStatus } = req.body;

    const result = await astrologerService.changeCallStatus(astrologerId,callStatus);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));
})

const changeChatStatus = asyncHandler(async (req, res) => {
    const { astrologerId, chatStatus } = req.body;

    const result = await astrologerService.changeChatStatus(astrologerId,chatStatus);
    if (!result || result.length === 0) {
        throw new ApiError(httpStatus.NOT_FOUND, "No Astrologer found");
    }

    return res.status(200).json(new ApiResponse(200, result, "Astrologers fetched successfully"));
})

export { astrologerLogin, logoutAstrologer, astrologerList,changeCallStatus,changeChatStatus };
