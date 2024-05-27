import ApiError from "../../utils/ApiError.js";
import AstrologerProfileRequests from "../../models/adminModel/AstrologerProfileRequests.js";
import AstrologerBankRequests from "../../models/adminModel/AstrologerBankRequest.js";
import AstrologerPhoneNumberRequests from "../../models/adminModel/AstrologerPhoneNumberRequest.js";
import AstrologerGalleryRequests from "../../models/adminModel/AstrologerGalleryRequest.js";
import { uploadOnCloudinary } from "../../utils/cloudinary.js"


const addNewProfileRequest = async (body, files) => {

    const {
        astrologerId
    } = body;

    const profileImagePath = files ? files.path : "";
    // Handle other file uploads similarly...
    const profileImage = await uploadOnCloudinary(profileImagePath);

    if (!profileImage) {
        throw new ApiError(400, "profileImage file is required")
    }

    // Create a new astrologer entry
    const newAstrologerRequest = new AstrologerProfileRequests({
        astrologerId,
        profileImage: profileImage.url,
    });

    const astrologerRequest = await newAstrologerRequest.save();

    const createdRequest = await AstrologerProfileRequests.findById(astrologerRequest._id)

    return createdRequest;
};

const addNewPhoneNumberRequest = async (body, files) => {

    const {
        astrologerId, phoneNumber
    } = body;

    const newAstrologerRequest = new AstrologerPhoneNumberRequests({
        astrologerId,
        phoneNumber,
    });

    const astrologerRequest = await newAstrologerRequest.save();

    const createdRequest = await AstrologerPhoneNumberRequests.findById(astrologerRequest._id)

    return createdRequest;
};

const addNewBankRequest = async (body) => {

    const {
        astrologerId, bankAccountNumber, bankName, accountType, ifscCode, accountHolderName
    } = body;


    // Create a new astrologer entry
    const newAstrologerBankRequest = new AstrologerBankRequests({
        astrologerId,
        bankAccountNumber,
        bankName,
        accountType,
        ifscCode,
        accountHolderName,
    });

    const bankRequest = await newAstrologerBankRequest.save();

    const createdRequest = await AstrologerBankRequests.findById(bankRequest._id)

    return createdRequest;
};

const addNewGalleryRequest= async(body , files)=>{
return true;
}

export { addNewProfileRequest, addNewPhoneNumberRequest, addNewBankRequest,addNewGalleryRequest };
