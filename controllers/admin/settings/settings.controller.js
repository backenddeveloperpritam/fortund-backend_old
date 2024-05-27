
/**
 * This function is used to createAccount a user
 * @param {Object} req Request object
 * @param {Object} res Response object
 * @returns {Object} Returns created user object
 */

const UpdateAstrologerPhoneNumber = asyncHandler(async (req, res) => {
    res.status(201).json({ success: true, newAstrologer });
})


module.exports = {
    UpdateAstrologerPhoneNumber
};
