import ApiError from "../../utils/ApiError.js";
import Astrologer from "../../models/adminModel/Astrologer.js";


const getAstrologer = async (title) => {
    try {
        const titleMatch = { "displayName": { "$regex": title, "$options": "i" } };

        const astrologers = await Astrologer.find({
            ...titleMatch,
        });

        return astrologers;
    } catch (error) {
        throw new ApiError(500, "Internal Server Error - Astrologers Not Fetched");
    }
};

const loginAstrologer = async (email, password) => {

    const astrologer = await Astrologer.findOne({ email });

    return astrologer;

};

const logoutAstrologer = async (astrologerId) => {
    await Astrologer.findByIdAndUpdate(
        astrologerId,
        {
            $unset: {
                refreshToken: 1
            }
        }
    );

    const astrologer = await Astrologer.findByIdAndUpdate(
        astrologerId,
        {
            $set: {
                chat_status: "Offline",
                call_status: "Offline"
            }
        },
        {
            new: true
        }
    );

    return astrologer;
};


const getAstrologerById = async (id) => {
    const astrologer = await Astrologer.findOne({ _id: id }).select("-password -refreshToken");
    return astrologer;
}



export { getAstrologer, loginAstrologer, logoutAstrologer, getAstrologerById };
