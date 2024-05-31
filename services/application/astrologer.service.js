import ApiError from "../../utils/ApiError.js";
import Astrologer from "../../models/adminModel/Astrologer.js";


const getAstrologer = async (title) => {
    try {
        const titleMatch = { "displayName": { "$regex": title, "$options": "i" } };

        const astrologers = await Astrologer.find({
            ...titleMatch,
            status: { $ne: 'Blocked' }
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
                chatStatus: "Offline",
                callStatus: "Offline"
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

const changeCallStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        throw new ApiError(500, "Internal Server Error - Astrologers Not found !");
    }

    astrologer.callStatus = status;

    await astrologer.save();

    return astrologer;
};
const changeChatStatus = async (astrologerId, status) => {
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
        throw new ApiError(500, "Internal Server Error - Astrologers Not found !");
    }

    astrologer.chatStatus = status;

    await astrologer.save();

    return astrologer;
};

export { getAstrologer, loginAstrologer, logoutAstrologer, getAstrologerById, changeCallStatus, changeChatStatus };
