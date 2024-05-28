import ApiError from "../utils/ApiError.js";
import Astrologer from "../models/adminModel/Astrologer.js";
import { uploadOnCloudinary } from "../utils/cloudinary.js"

const getAstrologer = async (title) => {
    const titleMatch = { "displayName": { "$regex": title, "$options": "i" } };

    const astrologers = await Astrologer.find({
        ...titleMatch,
    });

    return astrologers;

};

const getAstrologerById = async (id) => {
    const astrologer = await Astrologer.findOne({ _id: id });
    if (!astrologer) {
        return null;
    }
    return astrologer;

}

const addNewAstrologer = async (body, files) => {
    const {
        displayName,
        name,
        email,
        password,
        phoneCode,
        phoneNumber,
        gender,
        dateOfBirth,
        experience,
        language,
        address,
        currencyType,
        currencyValue,
        country,
        state,
        city,
        zipCode,
        about,
        educationQualification,
        astrologyQualification,
        follower_count,
        rating,
        bankProofImage,
        bankAcountNumber,
        bankName,
        accountType,
        ifscCode,
        accouuntHolderName,
        addharNumber,
        panNumber,
        chatPrice,
        companyChatPrice,
        callPrice,
        companyCallPrice,
        liveVideoPrice,
        companyLiveVideoPrice,
        liveCallPrice,
        companyLiveCallPrice,
        skill,
        expertise,
        remedies,
        astrologerType,
        status,
    } = body;

    const existingAstrologer = await Astrologer.findOne({ $or: [{ phoneNumber }, { email }] });
    if (existingAstrologer) {
        throw new Error("Astrologer with this phone number or email already exists.");
    }

    const skillArray = Array.isArray(skill) ? skill : [];
    const remediesArray = Array.isArray(remedies) ? remedies : [];
    const expertiseArray = Array.isArray(expertise) ? expertise : [];

    // File upload handling
    const profileImagePath = files.profileImage ? files.profileImage[0].path : "";
    const idProofImagePath = files.idProofImage ? files.idProofImage[0].path : "";
    const galleryImages = files.galleryImage ? files.galleryImage.map(file => file.path) : [];
    // console.log(galleryImages);

    // Handle other file uploads similarly...
    const profileImage = await uploadOnCloudinary(profileImagePath);
    const idProofImage = await uploadOnCloudinary(idProofImagePath);
    const galleryImageUrls = await Promise.all(galleryImages.map(uploadOnCloudinary));
    const galleryImg = galleryImageUrls.map((img) => img.url);
    if (!profileImage) {
        throw new ApiError(400, "profileImage file is required")
    }
    if (!idProofImage) {
        throw new ApiError(400, "idProofImage file is required")
    }

    // Check if the astrologer already exists

    // Create a new astrologer entry
    const newAstrologer = new Astrologer({
        displayName,
        name,
        email,
        password,
        phoneCode,
        phoneNumber,
        gender,
        dateOfBirth,
        experience,
        language,
        address,
        currencyType,
        currencyValue,
        country,
        state,
        city,
        zipCode,
        about,
        educationQualification,
        astrologyQualification,
        follower_count,
        rating,
        profileImage: profileImage.url,
        idProofImage: idProofImage.url,
        galleryImage: galleryImg,
        bankProofImage,
        bankAcountNumber,
        bankName,
        accountType,
        ifscCode,
        accouuntHolderName,
        addharNumber,
        panNumber,
        chatPrice,
        companyChatPrice,
        callPrice,
        companyCallPrice,
        liveVideoPrice,
        companyLiveVideoPrice,
        liveCallPrice,
        companyLiveCallPrice,
        skill: skillArray,
        expertise: expertiseArray,
        remedies: remediesArray,
        astrologerType,
        status,
    });

    const astrologer = await newAstrologer.save();

    const createdUser = await Astrologer.findById(astrologer._id).select(
        "-password -refreshToken"
    )

    if (!createdUser) {
        throw new ApiError(500, "Something went wrong while registering the user")
    }
    return createdUser;
};


const updateAstrologer = async (id, updatedFields) => {
    try {
        const astrologer = await Astrologer.findOneAndUpdate(
            { _id: id },
            updatedFields,
            { new: true }
        );

        if (!astrologer) {
            throw new ApiError(404, "Astrologer not found");
        }

        return astrologer;
    } catch (error) {
        throw new ApiError(500, "Internal Server Error - Astrologer Not Updated");
    }
}


const changeCallStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        return null;
    }

    astrologer.callStatus = status;

    await astrologer.save();

    return astrologer;
};

const changeChatStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        return null;
    }

    astrologer.chatStatus = status;

    await astrologer.save();

    return astrologer;
};

const changeStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        return null;
    }

    astrologer.status = status;

    await astrologer.save();

    return astrologer;
};

export { getAstrologer, getAstrologerById, addNewAstrologer, changeCallStatus, changeChatStatus, changeStatus, updateAstrologer };
