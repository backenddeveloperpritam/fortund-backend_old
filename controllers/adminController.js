import multer from "multer";
import fs from "fs";
import { v4 as uuidv4 } from "uuid";
import configureMulter from "../configureMulter.js";
import Skills from "../models/adminModel/Skills.js";
import SubSkills from "../models/adminModel/SubSkills.js";
import RechargePlan from "../models/adminModel/RechargePlan.js";
import mongoose from "mongoose";
import Expertise from "../models/adminModel/Expertise.js";
import MainExpertise from "../models/adminModel/MainExpertise.js";
import Gift from "../models/adminModel/Gift.js";
import Review from "../models/adminModel/Review.js";
import Faq from "../models/adminModel/Faq.js";
import Day from "../models/adminModel/Day.js";
import AstroBlogs from "../models/adminModel/AstroBlogs.js";
import BlogsCategory from "../models/adminModel/BlogsCategory.js";
import HowToUseScreenshots from "../models/adminModel/HowToUseScreenshots.js";
import HowToUseVideo from "../models/adminModel/HowToUseVideo.js";
import PrivacyPolicy from "../models/adminModel/PrivacyPolicy.js";
import TandC from "../models/adminModel/TandC.js";
import VivahMuhurat from "../models/adminModel/VivahMuhurat.js";
import Annaprashan from "../models/adminModel/Annaprashan.js";
import AskAstrologer from "../models/adminModel/AskAstrologer.js";
import AskQuestion from "../models/adminModel/AskQuestion.js";
import ReligionSpirituality from "../models/adminModel/ReligionSpirituality.js";
import AstroMagazine from "../models/adminModel/AstroMagazine.js";
import BirhatHoroscope from "../models/adminModel/BirhatHoroscope.js";
import MundanMuhurat from "../models/adminModel/MundanMuhurat.js";
import DailyPanchang from "../models/adminModel/DailyPanchang.js";
import Remedies from "../models/adminModel/Remedies.js";
import YellowBook from "../models/adminModel/YellowBook.js";
import AuspiciousTime from "../models/adminModel/AuspiciousTime.js";
import ListOfQuestion from "../models/adminModel/ListOfQuestion.js";
import Astrologer from "../models/adminModel/Astrologer.js";
import Numerology from "../models/adminModel/Numerology.js";
import Testimonial from "../models/adminModel/Testimonal.js";
import Customers from "../models/customerModel/Customers.js";
import Users from "../models/adminModel/Users.js";
import Announcement from "../models/adminModel/Announcement.js";
import Message from "../models/adminModel/Message.js";
import BankAccount from "../models/astrologerModel/BankAccount.js";
import Banners from "../models/adminModel/Banners.js";
import Notification from "../models/adminModel/Notification.js";
import notificationService from "../notificationService.js";
import FirstRechargeOffer from "../models/adminModel/FirstRechargeOffer.js";
import RechargeWallet from "../models/customerModel/RechargeWallet.js";
import ChatHistory from "../models/adminModel/ChatHistory.js";
import CallHistory from "../models/adminModel/CallHistory.js";
import AppReview from "../models/adminModel/AppReview.js";
import CustomerNotification from "../models/adminModel/CustomerNotification.js";
import AstrologerNotification from "../models/adminModel/AstrologerNotification.js";
import { ObjectId } from "mongodb";
import AdminEarning from "../models/adminModel/AdminEarning.js";
import Language from "../models/adminModel/Language.js";
import Qualifications from "../models/adminModel/Qualifications.js";
import LiveStreaming from "../models/adminModel/LiveStreaming.js";
import AstrologerRequests from "../models/adminModel/AstrologerRequests.js";
import Blogs from "../models/adminModel/Blogs.js";
import PoojaCategory from "../models/adminModel/PoojaCategory.js";
import Pooja from "../models/adminModel/Pooja.js";
import ProductCategory from "../models/adminModel/ProductCategory.js";
import Product from "../models/adminModel/Product.js";
import { title } from "process";

// add Skill
const uploadSkill = configureMulter("uploads/skillsImage/", [
  { name: "image", maxCount: 1 },
]);

const uploadRemedy = configureMulter("uploads/remedyImage/", [
  { name: "remedyIcon", maxCount: 1 },
]);

const uploadGifts = configureMulter("uploads/gifts/", [
  { name: "image", maxCount: 1 },
]);

const uploadQualificationImage = configureMulter(
  "uploads/qualificationImage/",
  [{ name: "documents", maxCount: 1 }]
);

//ecommerce banner image
const uploadEcommerceBanner = configureMulter("uploads/ecommerceBannerImage/", [
  { name: "banner_img", maxCount: 1 },
]);

const uploadAstrologerImages = configureMulter("uploads/profileImage/", [
  { name: "profileImage", maxCount: 1 },
  { name: "id_proof_image", maxCount: 1 },
  { name: "bank_proof_image", maxCount: 1 },
]);

const uploadCustomerImage = configureMulter("uploads/customerImage/", [
  { name: "image", maxCount: 1 },
]);

const uploadTestimonial = configureMulter("uploads/testimonialImage/", [
  { name: "image", maxCount: 1 },
]);

const uploadBanners = configureMulter("uploads/bannersImage/", [
  { name: "bannerImage", maxCount: 1 },
]);

const uploadNotificationImages = configureMulter("uploads/notificationImage/", [
  { name: "image", maxCount: 1 },
]);

// add User by Admin
const addUser = async function (req, res) {
  try {
    const {
      username,
      email,
      password,
      phoneNumber,
      permissions, // Permissions to be added
    } = req.body;

    // Check if the user already exists
    const existingUser = await Users.findOne({
      $or: [{ username }, { email }, { phoneNumber }],
    });

    if (existingUser) {
      return res
        .status(400)
        .json({ success: false, message: "User already exists" });
    }

    const newUser = new Users({
      username,
      email,
      password,
      phoneNumber,
      permissions, // Assign the permissions array
    });

    await newUser.save();

    res.status(201).json({
      success: true,
      message: "User added successfully",
      user: newUser,
    });
  } catch (error) {
    console.error("Error adding user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add user",
      error: error.message,
    });
  }
};

// get all user
const getAllUser = async function (req, res) {
  try {
    // Fetch all skills from the database
    const users = await Users.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, users });
  } catch (error) {
    console.error("Error fetching Users:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Users",
      error: error.message,
    });
  }
};

// block user
const blockUser = async function (req, res) {
  try {
    const { userId } = req.params;
    const { block } = req.body; // block: true or false

    // Find the user by ID
    const user = await Users.findById(userId);

    if (!user) {
      return res
        .status(404)
        .json({ success: false, message: "User not found" });
    }

    // Update the isBlock field based on the provided value
    user.isBlock = block;

    // Save the updated user
    await user.save();

    res.status(200).json({
      success: true,
      message: `User ${block ? "blocked" : "unblocked"} successfully`,
    });
  } catch (error) {
    console.error("Error blocking/unblocking user:", error);
    res.status(500).json({
      success: false,
      message: "Failed to block/unblock user",
      error: error.message,
    });
  }
};

// delete user
const deleteUser = async function (req, res) {
  try {
    const userId = req.body.userId;

    if (!mongoose.Types.ObjectId.isValid(userId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid User ID" });
    }

    const deletedUser = await Users.findByIdAndDelete(userId);

    if (!deletedUser) {
      return res
        .status(404)
        .json({ success: false, message: "User not found." });
    }

    res.status(200).json({
      success: true,
      message: "User deleted successfully",
      deletedUser,
    });
  } catch (error) {
    console.error("Error deleting User:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete User",
      error: error.message,
    });
  }
};

// const skill = function (req, res) {
  console.log("test", req.files);
  uploadSkill(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { skill } = req.body;
      console.log("skill", skill);
      // Validate required fields
      if (!skill) {
        return res.status(400).json({
          success: false,
          message: "Please provide a Skill.",
        });
      }

      const image = req.files["image"]
        ? req.files["image"][0].path.replace(
          /^.*skillsImage[\\/]/,
          "skillsImage/"
        )
        : "";

      // Create a new file entry in the Customers collection
      const newSkill = new Skills({ skill, image });
      await newSkill.save();

      res.status(201).json({
        success: true,
        message: "Skill uploaded successfully.",
        data: newSkill,
      });
    } catch (error) {
      console.error("Error uploading Skill:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload Skill.",
        error: error.message,
      });
    }
  });
// };

// get skills
// const getAllSkills = async function (req, res) {
//   try {
//     // Fetch all skills from the database
//     const skills = await Skills.find();

//     // Return the list of skills as a JSON response
//     res.status(200).json({ success: true, skills });
//   } catch (error) {
//     console.error("Error fetching skills:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch skills",
//       error: error.message,
//     });
//   }
// };

// const updateSkill = function (req, res) {
//   uploadSkill(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { skillId, skill } = req.body;

//       // Validate required fields
//       if (!skill) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a Skill.",
//         });
//       }

//       const existingSkill = await Skills.findById(skillId);

//       if (!existingSkill) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Skill not found." });
//       }

//       existingSkill.skill = skill;

//       // Update image path if a new image is uploaded
//       if (req.files["image"]) {
//         const imagePath = req.files["image"][0].path.replace(
//           /^.*skillsImage[\\/]/,
//           "skillsImage/"
//         );
//         existingSkill.image = imagePath;
//       }

//       // Update the skill without checking for uniqueness
//       await existingSkill.save({ validateBeforeSave: false });

//       res.status(200).json({
//         success: true,
//         message: "Skill updated successfully.",
//         data: existingSkill,
//       });
//     } catch (error) {
//       console.error("Error updating Skill:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Skill.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteSkill = async function (req, res) {
//   try {
//     const skillId = req.body.skillId;

//     if (!skillId || !mongoose.Types.ObjectId.isValid(skillId)) {
//       return res
//         .status(400)
//         .json({ success: false, message: "Invalid Skill ID" });
//     }

//     const deletedSkill = await Skills.findByIdAndDelete(skillId);
//     const astrologerData = await Astrologer.find({ skill: { $in: [skillId] } });

//     if (astrologerData) {
//       for (const doc of astrologerData) {
//         await Astrologer.updateOne(
//           { _id: doc._id },
//           { $pull: { skill: skillId } }
//         );
//       }
//     }

//     if (!deletedSkill) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Skill not found." });
//     }

//     console.log(`Skill with ID ${skillId} deleted successfully`);

//     res.status(200).json({
//       success: true,
//       message: "Skill deleted successfully",
//       deletedSkill,
//     });
//   } catch (error) {
//     console.error("Error deleting skill:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete skill",
//       error: error.message,
//     });
//   }
// };

// add sub skills
const subSkill = async function (req, res) {
  try {
    const { subskill, skillId } = req.body; // Assuming you receive question and titleId from the request

    const existingSkill = await Skills.findById(skillId);

    if (!existingSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Selected skill not found." });
    }

    const newSubSKill = new SubSkills({ subskill, skill: skillId });
    await newSubSKill.save();

    res
      .status(201)
      .json({ success: true, message: "Sub Skill added successfully" });
  } catch (error) {
    console.error("Error adding sub skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add sub skill",
      error: error.message,
    });
  }
};

const getAllSubSkills = async function (req, res) {
  try {
    const allSubSkill = await SubSkills.find().populate("skill", "skill");

    if (!allSubSkill) {
      return res
        .status(404)
        .json({ success: false, message: "No subskill found." });
    }

    res.status(200).json({ success: true, subSkill: allSubSkill });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

// update sub skill

const updateSubSkill = async function (req, res) {
  try {
    const { subSkillId, subskill, newSkillId } = req.body;

    // Find the sub-skill by ID
    const existingSubSkill = await SubSkills.findById(subSkillId);

    if (!existingSubSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Sub-skill not found." });
    }

    // Update the sub-skill name
    existingSubSkill.subskill = subskill;

    // Initialize a variable to hold the skill name
    let skillName = "";

    // Check if the provided newSkillId exists in the Skills schema
    const skillExists = await Skills.findById(newSkillId);

    if (newSkillId && !skillExists) {
      return res
        .status(404)
        .json({ success: false, message: "New Skill ID not found." });
    }

    // Update the skill ID if a newSkillId is provided and it exists
    if (newSkillId) {
      existingSubSkill.skill = newSkillId;
      skillName = skillExists.skill; // Fetch the name of the skill from the skillExists object
    }

    // Save the updated sub-skill
    const updatedSubSkill = await existingSubSkill.save();

    // Return success response with the updated sub-skill details and skill name
    res.status(200).json({
      success: true,
      message: "Sub-skill updated successfully",
      updatedSubSkill,
      subSkillId,
      skillName,
    });
  } catch (error) {
    console.error("Error updating sub-skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update sub-skill as Skill id is not correct",
      error: error.message,
    });
  }
};

// delete sub skill
const deleteSubSkill = async function (req, res) {
  try {
    const subSkillId = req.body.subSkillId; // Assuming the ID is passed as a parameter

    // Find the sub-skill by ID and delete it
    const deletedSubSkill = await SubSkills.findByIdAndDelete(subSkillId);

    if (!deletedSubSkill) {
      return res
        .status(404)
        .json({ success: false, message: "Sub-skill not found." });
    }

    // Return success response with the deleted sub-skill
    res.status(200).json({
      success: true,
      message: "Sub-skill deleted successfully",
      deletedSubSkill,
    });
  } catch (error) {
    console.error("Error deleting sub-skill:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete sub-skill",
      error: error.message,
    });
  }
};

// add recherge plan

const createRechargePlan = async function (req, res) {
  try {
    const { amount, percentage, startDate, endDate, status } = req.body;

    const newRechargePlan = new RechargePlan({
      amount,
      percentage,
      startDate,
      endDate,
      status,
    });

    await newRechargePlan.save();

    res.status(201).json({
      success: true,
      message: "Recharge plan added successfully",
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add recharge plan", details: error });
  }
};

// update recharge update plan
const updateRechargePlan = async function (req, res) {
  try {
    const { amount, percentage, startDate, endDate, status } = req.body;

    const rechargePlanId = req.body.rechargePlanId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID
    const rechargePlan = await RechargePlan.findById(rechargePlanId);

    if (!rechargePlan) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    // Update the recharge plan fields
    rechargePlan.amount = amount;
    rechargePlan.percentage = percentage;
    rechargePlan.startDate = startDate;
    rechargePlan.endDate = endDate;
    rechargePlan.status = status;

    const updatedRechargePlan = await rechargePlan.save();

    res.status(200).json({
      success: true,
      message: "Recharge plan updated successfully",
      rechargePlan: updatedRechargePlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update recharge plan",
      details: error,
    });
  }
};

const updateRechargePlanStatus = async function (req, res) {
  try {
    const { rechargePlanId, status } = req.body; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID
    const rechargePlan = await RechargePlan.findById(rechargePlanId);

    if (!rechargePlan) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    // Update the recharge plan fields
    rechargePlan.recharge_status = status;

    await rechargePlan.save();

    res.status(200).json({
      success: true,
      message: "Recharge plan status updated successfully",
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update recharge plan",
      details: error,
    });
  }
};

const getAllRechargePlan = async function (req, res) {
  try {
    const allRechargePlan = await RechargePlan.find();

    if (!allRechargePlan) {
      return res
        .status(404)
        .json({ success: false, message: "No subskill found." });
    }

    res.status(200).json({ success: true, allRechargePlan: allRechargePlan });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

// delete recharge plan
const deleteRechargePlan = async function (req, res) {
  try {
    const rechargePlanId = req.body.rechargePlanId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID and remove it
    const deletedRechargePlan = await RechargePlan.findByIdAndDelete(
      rechargePlanId
    );

    if (!deletedRechargePlan) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "Recharge plan deleted successfully",
      // rechargePlan: deletedRechargePlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not delete recharge plan",
      details: error,
    });
  }
};

// Remedy

const addRemedy = function (req, res) {
  uploadRemedy(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { remedy, description } = req.body;

      // Validate required fields
      if (!remedy) {
        return res.status(400).json({
          success: false,
          message: "Please provide a Remedy.",
        });
      }

      const remedyIcon = req.files["remedyIcon"]
        ? req.files["remedyIcon"][0].path.replace(
          /^.*remedyImage[\\/]/,
          "remedyImage/"
        )
        : "";

      // Create a new file entry in the Customers collection
      const newRemedy = new Remedies({ remedy, remedyIcon, description });
      await newRemedy.save();

      res.status(201).json({
        success: true,
        message: "Remedy uploaded successfully.",
        data: newRemedy,
      });
    } catch (error) {
      console.error("Error uploading Remedy:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload Remedy.",
        error: error.message,
      });
    }
  });
};

const viewRemedy = async function (req, res) {
  try {
    // Fetch all skills from the database
    const remedies = await Remedies.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, remedies });
  } catch (error) {
    console.error("Error fetching remedies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch skills",
      error: error.message,
    });
  }
};

// const updateRemedy = function (req, res) {
//   uploadRemedy(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ success: false, message: 'Multer error', error: err });
//     } else if (err) {
//       return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
//     }

//     try {
//       const { remedyId } = req.params;
//       const { remedy } = req.body;
//       const { description } = req.body;

//       // Validate required fields
//       if (!remedy) {
//         return res.status(400).json({
//           success: false,
//           message: 'Please provide a remedy.'
//         });
//       }

//       if (!description) {
//         return res.status(400).json({
//           success: false,
//           message: 'Please provide a description.'
//         });
//       }

//       const existingRemedy = await Remedies.findById(remedyId);

//       if (!existingRemedy) {
//         return res.status(404).json({ success: false, message: 'Remedy not found.' });
//       }

//       existingRemedy.remedy = remedy;
//       existingRemedy.description = description;

//       // Update image path if a new image is uploaded
//       // if (req.files['remedyIcon']) {
//       //   const imagePath = req.files['remedyIcon'][0].path.replace(/^.*remedyImage[\\/]/, 'remedyImage/');
//       //   existingRemedy.image = imagePath;
//       // }

//       if (req.files && req.files['remedyIcon']) { // Check if files exist in request and if 'remedyIcon' exists
//         const imagePath = req.files['remedyIcon'][0].path.replace(/^.*remedyImage[\\/]/, 'remedyImage/');
//         existingRemedy.remedyIcon = imagePath; // Update 'remedyIcon' instead of 'image'
//       }

//       await existingRemedy.save();

//       res.status(200).json({ success: true, message: 'Remedy updated successfully.', data: existingRemedy });
//     } catch (error) {
//       console.error('Error updating Remedy:', error);
//       res.status(500).json({ success: false, message: 'Failed to update Remedy.', error: error.message });
//     }
//   });
// };

const updateRemedy = function (req, res) {
  uploadRemedy(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { remedyId, remedy, description } = req.body;

      // Validate required fields
      if (!remedy || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a remedy and a description.",
        });
      }

      const existingRemedy = await Remedies.findById(remedyId);
      if (!existingRemedy) {
        return res
          .status(404)
          .json({ success: false, message: "Remedy not found." });
      }

      existingRemedy.remedy = remedy;
      existingRemedy.description = description;

      // Update image path if a new image is uploaded
      if (
        req.files &&
        req.files["remedyIcon"] &&
        req.files["remedyIcon"][0] &&
        req.files["remedyIcon"][0].path
      ) {
        const imagePath = req.files["remedyIcon"][0].path.replace(
          /^.*remedyImage[\\/]/,
          "remedyImage/"
        );
        existingRemedy.remedyIcon = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingRemedy.save();

      res.status(200).json({
        success: true,
        message: "Remedy updated successfully.",
        data: existingRemedy,
      });
    } catch (error) {
      console.error("Error updating Remedy:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Remedy.",
        error: error.message,
      });
    }
  });
};

const deleteRemedy = async function (req, res) {
  try {
    const remedyId = req.body.remedyId; // Assuming the ID is passed as a parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(remedyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Remedy ID" });
    }

    // Find the remedy by ID and delete it
    const deletedRemedy = await Remedies.findByIdAndDelete(remedyId);
    const astrologerData = await Astrologer.find({
      remedies: { $in: [remedyId] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { remedies: remedyId } }
        );
      }
    }

    if (!deletedRemedy) {
      return res
        .status(404)
        .json({ success: false, message: "Remedy not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Remedy deleted successfully",
      deletedRemedy,
    });
  } catch (error) {
    console.error("Error deleting remedy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete remedy",
      error: error.message,
    });
  }
};

// Expertise

const addExpertise = async function (req, res) {
  try {
    const { expertise } = req.body;

    // Check if the skill already exists
    if (!expertise) {
      return res
        .status(400)
        .json({ success: false, message: "expertise is required." });
    }
    const existingExpertise = await Expertise.findOne({ expertise });

    if (existingExpertise) {
      return res
        .status(400)
        .json({ success: false, message: "expertise already exists." });
    }

    // Create a new skill with the image buffer
    const newExpertise = new Expertise({ expertise });
    await newExpertise.save();

    // Return success response
    res.status(201).json({
      success: true,
      message: "expertise added successfully",
      expertise: newExpertise,
    });
  } catch (error) {
    console.error("Error adding expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add expertise",
      error: error.message,
    });
  }
};

const getExpertise = async function (req, res) {
  try {
    // Fetch all skills from the database
    const expertise = await Expertise.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, expertise });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expertise",
      error: error.message,
    });
  }
};

const updateExpertise = async function (req, res) {
  try {
    const { expertiseId, expertise } = req.body;

    // Find the expertise by ID
    const expertiseToUpdate = await Expertise.findById(expertiseId);

    if (!expertiseToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Expertise not found." });
    }

    // Update the expertise if provided
    if (expertise) {
      expertiseToUpdate.expertise = expertise;
    }

    // Save the updated expertise
    await expertiseToUpdate.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Expertise updated successfully",
      expertise: expertiseToUpdate,
    });
  } catch (error) {
    console.error("Error updating expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update expertise",
      error: error.message,
    });
  }
};

const deleteExpertise = async function (req, res) {
  try {
    const expertiseId = req.body.expertiseId; // Assuming the ID is passed as a parameter

    // Check if the provided ID is a valid ObjectId
    if (!mongoose.Types.ObjectId.isValid(expertiseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Expertise ID" });
    }

    // Find the Expertise by ID and delete it
    const deletedExpertise = await Expertise.findByIdAndDelete(expertiseId);

    const astrologerData = await Astrologer.find({
      expertise: { $in: [expertiseId] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { expertise: expertiseId } }
        );
      }
    }

    if (!deletedExpertise) {
      return res
        .status(404)
        .json({ success: false, message: "Expertise not found." });
    }

    res.status(200).json({
      success: true,
      message: "Expertise deleted successfully",
      deletedExpertise,
    });
  } catch (error) {
    console.error("Error deleting Expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Expertise",
      error: error.message,
    });
  }
};

const addMainExpertise = async function (req, res) {
  try {
    const { mainExpertise } = req.body;

    const existingmainExpertise = await MainExpertise.findOne({
      mainExpertise,
    });

    if (existingmainExpertise) {
      return res
        .status(400)
        .json({ success: false, message: "Main Expertise already exists." });
    }

    const newMainExpertise = new MainExpertise({ mainExpertise });
    await newMainExpertise.save();

    res.status(201).json({
      success: true,
      message: "Main Expertise added successfully",
      mainExpertise: newMainExpertise,
    });
  } catch (error) {
    console.error("Error adding Main Expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Main Expertise",
      error: error.message,
    });
  }
};

const updateMainExpertise = async function (req, res) {
  try {
    const { mainExpertiseId, mainExpertise } = req.body;

    const mainExpertiseToUpdate = await MainExpertise.findById(mainExpertiseId);

    if (!mainExpertiseToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Expertise not found." });
    }

    if (mainExpertise) {
      mainExpertiseToUpdate.mainExpertise = mainExpertise;
    }

    await mainExpertiseToUpdate.save();

    res.status(200).json({
      success: true,
      message: "main Expertise updated successfully",
      mainExpertise: mainExpertiseToUpdate,
    });
  } catch (error) {
    console.error("Error updating expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update expertise",
      error: error.message,
    });
  }
};

const deleteMainExpertise = async function (req, res) {
  try {
    const { mainExpertiseId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(mainExpertiseId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Main Expertise ID" });
    }

    const deletedMainExpertise = await MainExpertise.findByIdAndDelete(
      mainExpertiseId
    );

    const astrologerData = await Astrologer.find({
      mainExpertise: { $in: [mainExpertiseId] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { mainExpertise: mainExpertiseId } }
        );
      }
    }

    if (!deletedMainExpertise) {
      return res
        .status(404)
        .json({ success: false, message: "Main Expertise not found." });
    }

    res.status(200).json({
      success: true,
      message: "Main Expertise deleted successfully",
      deletedMainExpertise,
    });
  } catch (error) {
    console.error("Error deleting main Expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete main Expertise",
      error: error.message,
    });
  }
};

const getMainExpertise = async function (req, res) {
  try {
    // Fetch all skills from the database
    const mainExpertise = await MainExpertise.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, mainExpertise });
  } catch (error) {
    console.error("Error fetching expertise:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch expertise",
      error: error.message,
    });
  }
};

// Gift

const addGift = async function (req, res) {
  uploadGifts(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }
    try {
      const { gift, amount, description } = req.body;
      if (
        !gift ||
        !amount ||
        !description ||
        !req.files ||
        !req.files["image"] ||
        req.files["image"].length === 0
      ) {
        return res.status(200).json({
          success: false,
          message: "All fields are required to create a skill",
        });
      }

      let imagePath = "";

      if (req.files["image"]) {
        imagePath = req.files["image"][0].path.replace(
          /^.*gifts[\\/]/,
          "uploads/gifts/"
        );
      }

      const newGift = new Gift({
        gift,
        giftIcon: imagePath,
        amount,
        description,
      });
      await newGift.save();

      res.status(200).json({
        success: true,
        message: "Gift added successfully",
        gift: newGift,
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create gifts.",
        error: error.message,
      });
    }
  });
};

const viewGift = async function (req, res) {
  try {
    // Fetch all skills from the database
    const gift = await Gift.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, gift });
  } catch (error) {
    console.error("Error fetching Gift:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Gift",
      error: error.message,
    });
  }
};

const updateGift = async function (req, res) {
  uploadGifts(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }
    try {
      const { giftId, gift, amount, description } = req.body;

      const giftToUpdate = await Gift.findById(giftId);

      if (!giftToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Gift not found." });
      }

      let imagePath = "";

      if (req.files["image"]) {
        imagePath = req.files["image"][0].path.replace(
          /^.*gifts[\\/]/,
          "uploads/gifts/"
        );
        giftToUpdate.giftIcon = imagePath;
      }

      if (gift) {
        giftToUpdate.gift = gift;
      }

      if (amount) {
        giftToUpdate.amount = amount;
      }
      if (description) {
        giftToUpdate.description = description;
      }

      await giftToUpdate.save();

      res.status(200).json({
        success: true,
        message: "Gift updated successfully",
        gift: giftToUpdate,
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update gifts.",
        error: error.message,
      });
    }
  });
};

const deleteGift = async function (req, res) {
  try {
    const giftId = req.body.giftId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(giftId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Gift ID" });
    }

    const deletedGift = await Gift.findByIdAndDelete(giftId);

    if (!deletedGift) {
      return res
        .status(404)
        .json({ success: false, message: "Gift not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Gift deleted successfully",
      deletedGift,
    });
  } catch (error) {
    console.error("Error deleting Gift:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Gift",
      error: error.message,
    });
  }
};

// Review

// const addReview = async function(req, res) {
//   try {
//     const { customerId, astrologerId, ratings, comments } = req.body;

//     const existingCustomer = await Customers.findById(customerId);
//     if (!existingCustomer) {
//       return res.status(404).json({ success: false, message: 'Selected Customer not found.' });
//     }

//     const existingAstrologer = await Astrologer.findById(astrologerId);
//     if (!existingAstrologer) {
//       return res.status(404).json({ success: false, message: 'Selected Astrologer not found.' });
//     }

//     // Check if the review already exists for the customer and astrologer
//     let existingReview = await Review.findOne({ customer: customerId, astrologer: astrologerId });

//     if (existingReview) {
//       // Update existing review
//       existingReview.ratings = ratings;
//       existingReview.comments = comments;
//       await existingReview.save();
//       res.status(200).json({ success: true, message: 'Review updated successfully', data: existingReview });
//     } else {
//       // Create a new review
//       const newReview = new Review({ customer: customerId, astrologer: astrologerId, ratings, comments });
//       await newReview.save();
//       res.status(201).json({ success: true, message: 'Review added successfully', data: newReview });
//     }
//   } catch (error) {
//     console.error('Error adding/updating Review:', error);
//     res.status(500).json({ success: false, message: 'Failed to add/update Review', error: error.message });
//   }
// };

const addReview = async function (req, res) {
  try {
    const { customerId, astrologerId, ratings, comments } = req.body;

    const existingCustomer = await Customers.findOne({ _id: customerId });

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    const astrologerReviews = await Review.find({
      astrologer: astrologerId,
      is_verified: true,
    }).populate("customer", ["image", "customerName"]);

    let oneRating = 0;
    let twoRating = 0;
    let threeRating = 0;
    let fourRating = 0;
    let fiveRating = 0;
    let length = astrologerReviews.length;

    let users = new Set();

    for (let i = 0; i < length; i++) {
      users.add(astrologerReviews[i]?.customer?._id);
      if (astrologerReviews[i]?.ratings == 1) {
        oneRating++;
      } else if (astrologerReviews[i]?.ratings == 2) {
        twoRating++;
      } else if (astrologerReviews[i]?.ratings == 3) {
        threeRating++;
      } else if (astrologerReviews[i]?.ratings == 4) {
        fourRating++;
      } else {
        fiveRating++;
      }
    }

    const averageRating =
      (oneRating * 1 +
        twoRating * 2 +
        threeRating * 3 +
        fourRating * 4 +
        fiveRating * 5) /
      (oneRating + twoRating + threeRating + fourRating + fiveRating);

    const existingAstrologer = await Astrologer.findOne({ _id: astrologerId });

    if (!existingAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const newReview = new Review({
      customer: customerId,
      astrologer: astrologerId,
      ratings,
      comments,
    });
    await newReview.save();

    res.status(201).json({
      success: true,
      message: "Review added successfully",
      Review: Review,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

const verifyReview = async function (req, res) {
  try {
    const { review_id } = req.body;

    const existingReview = await Review.findOne({ _id: review_id });

    if (!existingReview) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    if (existingReview.is_verified) {
      existingReview.is_verified = false;
    } else {
      existingReview.is_verified = true;
    }
    await existingReview.save();

    const astrologerId = existingReview?.astrologer;

    const astrologerReviews = await Review.find({
      astrologer: astrologerId,
      is_verified: true,
    });

    if (!astrologerReviews || astrologerReviews.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No reviews found for this astrologer.",
      });
    }

    let oneRating = 0;
    let twoRating = 0;
    let threeRating = 0;
    let fourRating = 0;
    let fiveRating = 0;
    let length = astrologerReviews.length;

    let users = new Set();

    for (let i = 0; i < length; i++) {
      users.add(astrologerReviews[i]?.customer?._id);
      if (astrologerReviews[i]?.ratings == 1) {
        oneRating++;
      } else if (astrologerReviews[i]?.ratings == 2) {
        twoRating++;
      } else if (astrologerReviews[i]?.ratings == 3) {
        threeRating++;
      } else if (astrologerReviews[i]?.ratings == 4) {
        fourRating++;
      } else {
        fiveRating++;
      }
    }

    const averageRating =
      (oneRating * 1 +
        twoRating * 2 +
        threeRating * 3 +
        fourRating * 4 +
        fiveRating * 5) /
      (oneRating + twoRating + threeRating + fourRating + fiveRating);

    const astrologer = await Astrologer.findById(astrologerId);

    astrologer.rating = averageRating;

    await astrologer.save();

    res.status(200).json({
      success: true,
      message: "Review verification updated successfully",
      review: existingReview,
    });
  } catch (error) {
    console.error("Error updating review verification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update review verification",
      error: error.message,
    });
  }
};

const getAllReview = async function (req, res) {
  try {
    const review = await Review.find()
      .populate("astrologer", "astrologerName")
      .populate("customer", "customerName"); // Populate the astrologer field with astrologerName

    res.status(200).json({ success: true, review });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};

const updateReview = async function (req, res) {
  try {
    const { reviewId, ratings, comments } = req.body;

    const reviewToUpdate = await Review.findById(reviewId);

    if (!reviewToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Review not found." });
    }

    if (ratings) {
      reviewToUpdate.ratings = ratings;
    }
    if (comments) {
      reviewToUpdate.comments = comments;
    }

    await reviewToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Review updated successfully",
      review: reviewToUpdate,
    });
  } catch (error) {
    console.error("Error updating Review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Review",
      error: error.message,
    });
  }
};

const getAstrologersReviews = async function (req, res) {
  try {
    const { astrologer_id } = req.body;

    const astrologerReviews = await Review.find({ astrologer: astrologer_id });

    if (!astrologerReviews || astrologerReviews.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No reviews found for this astrologer.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: astrologerReviews,
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

const astrologersVerifiedReviews = async function (req, res) {
  try {
    const { astrologer_id } = req.body;

    const astrologerReviews = await Review.find({
      astrologer: astrologer_id,
      is_verified: true,
    }).populate("customer", ["image", "customerName"]);

    if (!astrologerReviews || astrologerReviews.length === 0) {
      return res.status(200).json({
        success: false,
        message: "No reviews found for this astrologer.",
      });
    }

    let oneRating = 0;
    let twoRating = 0;
    let threeRating = 0;
    let fourRating = 0;
    let fiveRating = 0;
    let length = astrologerReviews.length;

    let users = new Set();

    for (let i = 0; i < length; i++) {
      users.add(astrologerReviews[i]?.customer?._id);
      if (astrologerReviews[i]?.ratings == 1) {
        oneRating++;
      } else if (astrologerReviews[i]?.ratings == 2) {
        twoRating++;
      } else if (astrologerReviews[i]?.ratings == 3) {
        threeRating++;
      } else if (astrologerReviews[i]?.ratings == 4) {
        fourRating++;
      } else {
        fiveRating++;
      }
    }

    const onePercentage = (oneRating / length) * 100;
    const twoPercentage = (twoRating / length) * 100;
    const threePrecentage = (threeRating / length) * 100;
    const fourPercentage = (fourRating / length) * 100;
    const fivePercentage = (fiveRating / length) * 100;

    const averageRating =
      (oneRating * 1 +
        twoRating * 2 +
        threeRating * 3 +
        fourRating * 4 +
        fiveRating * 5) /
      (oneRating + twoRating + threeRating + fourRating + fiveRating);

    res.status(200).json({
      success: true,
      message: "Reviews fetched successfully",
      reviews: astrologerReviews,
      summary: {
        oneRating,
        twoRating,
        threeRating,
        fourRating,
        fiveRating,
        onePercentage,
        twoPercentage,
        threePrecentage,
        fourPercentage,
        fivePercentage,
        totalReview: length,
        totalUsers: users.size,
        averageRating,
      },
    });
  } catch (error) {
    console.error("Error fetching reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch reviews",
      error: error.message,
    });
  }
};

const deleteReview = async function (req, res) {
  try {
    const reviewId = req.body.reviewId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(reviewId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Review ID" });
    }

    const deletedReview = await Review.findByIdAndDelete(reviewId);

    if (!deletedReview) {
      return res
        .status(404)
        .json({ success: false, message: "review not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Review deleted successfully",
      deletedReview,
    });
  } catch (error) {
    console.error("Error deleting Review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Review",
      error: error.message,
    });
  }
};

// Pages (FAQ's)
const addFaq = async function (req, res) {
  try {
    const { question, description } = req.body;

    const newFaq = new Faq({ question, description });
    await newFaq.save();

    res.status(200).json({ success: true, message: "Faq added successfully" });
  } catch (error) {
    console.error("Error adding Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Faq",
      error: error.message,
    });
  }
};

const getAllFaq = async function (req, res) {
  try {
    const faq = await Faq.find();

    res.status(200).json({ success: true, faq });
  } catch (error) {
    console.error("Error fetching Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Faq",
      error: error.message,
    });
  }
};

const updateFaq = async function (req, res) {
  try {
    const { faqId, question, description } = req.body;

    const faqToUpdate = await Faq.findById(faqId);

    if (!faqToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Faq not found." });
    }

    if (question) {
      faqToUpdate.question = question;
    }
    if (description) {
      faqToUpdate.description = description;
    }

    await faqToUpdate.save();

    res.status(200).json({
      success: true,
      message: "faq updated successfully",
      faq: faqToUpdate,
    });
  } catch (error) {
    console.error("Error updating faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update faq",
      error: error.message,
    });
  }
};

const deleteFaq = async function (req, res) {
  try {
    const faqId = req.body.faqId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(faqId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Faq ID" });
    }

    const deletedFaq = await Faq.findByIdAndDelete(faqId);

    if (!deletedFaq) {
      return res
        .status(404)
        .json({ success: false, message: "Faq not found." });
    }

    // Return success response
    res
      .status(200)
      .json({ success: true, message: "Faq deleted successfully", deletedFaq });
  } catch (error) {
    console.error("Error deleting Faq:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Faq.",
      error: error.message,
    });
  }
};

const addTandC = async function (req, res) {
  try {
    const { description } = req.body;

    const newTandC = new TandC({ description });
    await newTandC.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "TandC added successfully",
      TandC: newTandC,
    });
  } catch (error) {
    console.error("Error adding TandC:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add TandC",
      error: error.message,
    });
  }
};

const deleteTandC = async function (req, res) {
  try {
    const TandCId = req.body.TandCId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(TandCId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid TandC ID" });
    }

    const deletedTandC = await TandC.findByIdAndDelete(TandCId);

    if (!deletedTandC) {
      return res
        .status(404)
        .json({ success: false, message: "TandC not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Terms and Condition deleted successfully",
      deletedTandC,
    });
  } catch (error) {
    console.error("Error deleting Terms and Condition:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Terms and Condition.",
      error: error.message,
    });
  }
};

const viewTandC = async function (req, res) {
  try {
    const termsAndCondition = await TandC.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, termsAndCondition });
  } catch (error) {
    console.error("Error fetching Terms And Condition:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Terms And Condition",
      error: error.message,
    });
  }
};

const addPrivacyPolicy = async function (req, res) {
  try {
    const { description } = req.body;

    const newPrivacyPolicy = new PrivacyPolicy({ description });
    await newPrivacyPolicy.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Privacy Policy added successfully",
      PrivacyPolicy: newPrivacyPolicy,
    });
  } catch (error) {
    console.error("Error adding PrivacyPolicy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add PrivacyPolicy",
      error: error.message,
    });
  }
};

const deletePrivacyPolicy = async function (req, res) {
  try {
    const privacyPolicyId = req.body.privacyPolicyId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(privacyPolicyId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Privacy Policy ID" });
    }

    const deletedPrivacyPolicy = await PrivacyPolicy.findByIdAndDelete(
      privacyPolicyId
    );

    if (!deletedPrivacyPolicy) {
      return res
        .status(404)
        .json({ success: false, message: "Privacy Policy not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Privacy Policy deleted successfully",
      deletedPrivacyPolicy,
    });
  } catch (error) {
    console.error("Error deleting Privacy Policy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Privacy Policy.",
      error: error.message,
    });
  }
};

const viewPrivacyPolicy = async function (req, res) {
  try {
    // Fetch all skills from the database
    const privacyPolicy = await PrivacyPolicy.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, privacyPolicy });
  } catch (error) {
    console.error("Error fetching Privacy Policy:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch privacy policy",
      error: error.message,
    });
  }
};

const addVideoUrl = async function (req, res) {
  try {
    const { videoUrl } = req.body;

    const newHowToUseVideo = new HowToUseVideo({ videoUrl });
    await newHowToUseVideo.save();

    // Return success response
    res.status(200).json({
      success: true,
      message: "Video Url added successfully",
      videoUrl: newHowToUseVideo,
    });
  } catch (error) {
    console.error("Error adding Video Url:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Video Url",
      error: error.message,
    });
  }
};

const deleteVideoUrl = async function (req, res) {
  try {
    const videoUrlId = req.body.videoUrlId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(videoUrlId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid video url ID" });
    }

    const deletedVideoUrl = await HowToUseVideo.findByIdAndDelete(videoUrlId);

    if (!deletedVideoUrl) {
      return res
        .status(404)
        .json({ success: false, message: "video url not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Video url deleted successfully",
      deletedVideoUrl,
    });
  } catch (error) {
    console.error("Error deleting Video url:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Video url.",
      error: error.message,
    });
  }
};

const viewVideoUrl = async function (req, res) {
  try {
    // Fetch all skills from the database
    const videoUrl = await HowToUseVideo.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, videoUrl });
  } catch (error) {
    console.error("Error fetching video url:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch video url",
      error: error.message,
    });
  }
};

// Ask question
const addAskQuestion = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newAskQuestion = new AskQuestion({ title, description });
    await newAskQuestion.save();

    res.status(200).json({
      success: true,
      message: "title to Ask Question added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getAskQuestion = async function (req, res) {
  try {
    const askQuestion = await AskQuestion.find();

    res.status(200).json({ success: true, askQuestion });
  } catch (error) {
    console.error("Error fetching Title to  Ask Question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Ask Question",
      error: error.message,
    });
  }
};

const updateAskQuestion = async function (req, res) {
  try {
    const { askQuestionId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const askQuestion = await AskQuestion.findById(askQuestionId);

    if (!askQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "AskQuestion entry not found." });
    }

    // Update the title field
    askQuestion.title = title;
    askQuestion.description = description;
    await askQuestion.save();

    res.status(200).json({
      success: true,
      message: "Ask Question entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteAskQuestion = async function (req, res) {
  try {
    const questionId = req.body.questionId;

    const deletedAskQuestion = await AskQuestion.findByIdAndDelete(questionId);

    if (!deletedAskQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};
// Ask Question

// Religion & Sprituality
const addReligionSpirituality = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newReligionSpirituality = new ReligionSpirituality({
      title,
      description,
    });
    await newReligionSpirituality.save();

    res.status(200).json({
      success: true,
      message: "title to Religion Spirituality added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getReligionSpirituality = async function (req, res) {
  try {
    const religionSpirituality = await ReligionSpirituality.find();

    res.status(200).json({ success: true, religionSpirituality });
  } catch (error) {
    console.error("Error fetching Title to  Ask Question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Ask Question",
      error: error.message,
    });
  }
};

const updateReligionSpirituality = async function (req, res) {
  try {
    const { religionSpiritualityId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const religionSpirituality = await ReligionSpirituality.findById(
      religionSpiritualityId
    );

    if (!religionSpirituality) {
      return res.status(404).json({
        success: false,
        message: "ReligionSpirituality entry not found.",
      });
    }

    // Update the title field
    religionSpirituality.title = title;
    religionSpirituality.description = description;
    await religionSpirituality.save();

    res.status(200).json({
      success: true,
      message: "Religion Spirituality entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteReligionSpirituality = async function (req, res) {
  try {
    const religionSpiritualityId = req.body.religionSpiritualityId;

    const deletedReligionSpirituality =
      await ReligionSpirituality.findByIdAndDelete(religionSpiritualityId);

    if (!deletedReligionSpirituality) {
      return res
        .status(404)
        .json({ success: false, message: "Religion Spirituality not found." });
    }

    res.status(200).json({
      success: true,
      message: "Religion Spirituality deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Religion Spirituality:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Religion Spirituality",
      error: error.message,
    });
  }
};
// Religion & Sprituality

// Astro magazine
const addAstroMagazine = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newAstroMagazine = new AstroMagazine({ title, description });
    await newAstroMagazine.save();

    res.status(200).json({
      success: true,
      message: "title to AstroMagazine added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getAstroMagazine = async function (req, res) {
  try {
    const astroMagazine = await AstroMagazine.find();

    res.status(200).json({ success: true, astroMagazine });
  } catch (error) {
    console.error("Error fetching Title to  AstroMagazine:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to AstroMagazine",
      error: error.message,
    });
  }
};

const updateAstroMagazine = async function (req, res) {
  try {
    const { astroMagazineId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const astroMagazine = await AstroMagazine.findById(astroMagazineId);

    if (!astroMagazine) {
      return res
        .status(404)
        .json({ success: false, message: "AstroMagazine entry not found." });
    }

    // Update the title field
    astroMagazine.title = title;
    astroMagazine.description = description;
    await astroMagazine.save();

    res.status(200).json({
      success: true,
      message: "AstroMagazine entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteAstroMagazine = async function (req, res) {
  try {
    const astroMagazineId = req.body.astroMagazineId;

    const deletedAstroMagazine = await AstroMagazine.findByIdAndDelete(
      astroMagazineId
    );

    if (!deletedAstroMagazine) {
      return res
        .status(404)
        .json({ success: false, message: "AstroMagazine not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "AstroMagazine deleted successfully" });
  } catch (error) {
    console.error("Error deleting AstroMagazine:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete AstroMagazine",
      error: error.message,
    });
  }
};
// Astro magazine

//Birhat horoscope

const addBirhatHoroscope = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newBirhatHoroscope = new BirhatHoroscope({ title, description });
    await newBirhatHoroscope.save();

    res.status(200).json({
      success: true,
      message: "title and Description to Birhat Horoscope added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getBirhatHoroscope = async function (req, res) {
  try {
    const birhatHoroscope = await BirhatHoroscope.find();

    res.status(200).json({ success: true, birhatHoroscope });
  } catch (error) {
    console.error(
      "Error fetching Title and description of Birhat Horoscope:",
      error
    );
    res.status(500).json({
      success: false,
      message: "Failed to fetch Birhat Horoscope",
      error: error.message,
    });
  }
};

const updateBirhatHoroscope = async function (req, res) {
  try {
    const { birhatHoroscopeId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const birhatHoroscope = await BirhatHoroscope.findById(birhatHoroscopeId);

    if (!birhatHoroscope) {
      return res
        .status(404)
        .json({ success: false, message: "Birhat Horoscope entry not found." });
    }

    // Update the title field
    birhatHoroscope.title = title;
    birhatHoroscope.description = description;
    await birhatHoroscope.save();

    res.status(200).json({
      success: true,
      message: "Birhat Horoscope updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteBirhatHoroscope = async function (req, res) {
  try {
    const birhatHoroscopeId = req.body.birhatHoroscopeId;

    const deleteBirhatHoroscope = await BirhatHoroscope.findByIdAndDelete(
      birhatHoroscopeId
    );

    if (!deleteBirhatHoroscope) {
      return res
        .status(404)
        .json({ success: false, message: "Birhat Horoscope not found." });
    }

    res.status(200).json({
      success: true,
      message: "Birhat Horoscope deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting Birhat Horoscope:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Birhat Horoscope",
      error: error.message,
    });
  }
};

// Birhat horoscope

// Daily panchang
const addDailyPanchang = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newReligionSpirituality = new DailyPanchang({ title, description });
    await newReligionSpirituality.save();

    res.status(200).json({
      success: true,
      message: "title to Religion Spirituality added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getDailyPanchang = async function (req, res) {
  try {
    const dailyPanchang = await DailyPanchang.find();

    res.status(200).json({ success: true, dailyPanchang });
  } catch (error) {
    console.error("Error fetching Title to Daily Panchang:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Daily Panchang",
      error: error.message,
    });
  }
};

const updateDailyPanchang = async function (req, res) {
  try {
    const { dailyPanchangId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const dailyPanchang = await DailyPanchang.findById(dailyPanchangId);

    if (!dailyPanchang) {
      return res
        .status(404)
        .json({ success: false, message: "DailyPanchang entry not found." });
    }

    // Update the title field
    dailyPanchang.title = title;
    dailyPanchang.description = description;
    await dailyPanchang.save();

    res.status(200).json({
      success: true,
      message: "Daily Panchang entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteDailyPanchang = async function (req, res) {
  try {
    const dailyPanchangId = req.body.dailyPanchangId;

    const deletedDailyPanchang = await DailyPanchang.findByIdAndDelete(
      dailyPanchangId
    );

    if (!deletedDailyPanchang) {
      return res
        .status(404)
        .json({ success: false, message: "Daily Panchang not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Daily Panchang deleted successfully" });
  } catch (error) {
    console.error("Error deleting Daily Panchang:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Daily Panchang",
      error: error.message,
    });
  }
};

// Daily panchang

// Remedies
const addRemedies = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newRemedies = new Remedies({ title, description });
    await newRemedies.save();

    res.status(200).json({
      success: true,
      message: "title to Remedies added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getRemedies = async function (req, res) {
  try {
    const remedies = await Remedies.find();

    res.status(200).json({ success: true, remedies });
  } catch (error) {
    console.error("Error fetching Title to remedies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to remedies",
      error: error.message,
    });
  }
};

const updateRemedies = async function (req, res) {
  try {
    const { remediesId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const remedies = await Remedies.findById(remediesId);

    if (!remedies) {
      return res
        .status(404)
        .json({ success: false, message: "remedies entry not found." });
    }

    // Update the title field
    remedies.title = title;
    remedies.description = description;
    await remedies.save();

    res.status(200).json({
      success: true,
      message: "remedies entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteRemedies = async function (req, res) {
  try {
    const remediesId = req.body.remediesId;

    const remedies = await Remedies.findByIdAndDelete(remediesId);

    if (!remedies) {
      return res
        .status(404)
        .json({ success: false, message: "remedies not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "remedies deleted successfully" });
  } catch (error) {
    console.error("Error deleting remedies:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete remedies",
      error: error.message,
    });
  }
};

// Remedies

// yellow book
const addYellowBook = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newYellowBook = new YellowBook({ title, description });
    await newYellowBook.save();

    res.status(200).json({
      success: true,
      message: "title to YellowBook added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getYellowBook = async function (req, res) {
  try {
    const yellowBook = await YellowBook.find();

    res.status(200).json({ success: true, yellowBook });
  } catch (error) {
    console.error("Error fetching Title to yellowBook:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to yellowBook",
      error: error.message,
    });
  }
};

const updateYellowBook = async function (req, res) {
  try {
    const { yellowBookId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const yellowBook = await YellowBook.findById(yellowBookId);

    if (!yellowBook) {
      return res
        .status(404)
        .json({ success: false, message: "yellowBook entry not found." });
    }

    // Update the title field
    yellowBook.title = title;
    yellowBook.description = description;
    await yellowBook.save();

    res.status(200).json({
      success: true,
      message: "yellowBook entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteYellowBook = async function (req, res) {
  try {
    const yellowBookId = req.body.yellowBookId;

    const deletedYellowBook = await YellowBook.findByIdAndDelete(yellowBookId);

    if (!deletedYellowBook) {
      return res
        .status(404)
        .json({ success: false, message: "YellowBook not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "YellowBook deleted successfully" });
  } catch (error) {
    console.error("Error deleting YellowBook:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete YellowBook",
      error: error.message,
    });
  }
};
// yellow book

// Numerology

const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
  { name: "numerology_image", maxCount: 1 },
]);

const addNumerology = async function (req, res) {
  try {
    uploadNumerologyImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const numerology_image = req.files["numerology_image"]
          ? req.files["numerology_image"][0].path.replace(
            /^.*NumerologyImage[\\/]/,
            "NumerologyImage/"
          )
          : "";

        // Create a new entry in the Numerology collection
        const newNumerology = new Numerology({
          title,
          description,
          numerology_image,
        });
        await newNumerology.save();

        res.status(201).json({
          success: true,
          message: "Numerology uploaded successfully.",
          data: newNumerology,
        });
      } catch (error) {
        console.error("Error uploading Numerology:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload Numerology.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};

const getAllNumerology = async function (req, res) {
  try {
    const numerology = await Numerology.find();

    res.status(200).json({ success: true, numerology });
  } catch (error) {
    console.error("Error fetching Numerology:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Numerology",
      error: error.message,
    });
  }
};

const updateNumerology = function (req, res) {
  uploadNumerologyImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { numerologyId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingNumerology = await Numerology.findById(numerologyId);
      if (!existingNumerology) {
        return res
          .status(404)
          .json({ success: false, message: "Numerology not found." });
      }

      existingNumerology.title = title;
      existingNumerology.description = description;

      if (
        req.files &&
        req.files["numerology_image"] &&
        req.files["numerology_image"][0] &&
        req.files["numerology_image"][0].path
      ) {
        const imagePath = req.files["numerology_image"][0].path.replace(
          /^.*NumerologyImage[\\/]/,
          "NumerologyImage/"
        );
        existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingNumerology.save();

      res.status(200).json({
        success: true,
        message: "Numerology updated successfully.",
        data: existingNumerology,
      });
    } catch (error) {
      console.error("Error updating Numerology:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Numerology.",
        error: error.message,
      });
    }
  });
};

const deleteNumerology = async function (req, res) {
  try {
    const numerologyId = req.body.numerologyId;

    const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

    if (!deletedNumerology) {
      return res
        .status(404)
        .json({ success: false, message: "Numerology not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Numerology deleted successfully" });
  } catch (error) {
    console.error("Error deleting Numerology:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Numerology",
      error: error.message,
    });
  }
};
// Numerology

// Vivah Muhurat
const uploadVivahMuhuratImage = configureMulter("uploads/VivahMuhuratImage/", [
  { name: "vivahMuhurat_image", maxCount: 1 },
]);

const addVivahMuhurat = async function (req, res) {
  try {
    uploadVivahMuhuratImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const vivahMuhurat_image = req.files["vivahMuhurat_image"]
          ? req.files["vivahMuhurat_image"][0].path.replace(
            /^.*VivahMuhuratImage[\\/]/,
            "VivahMuhuratImage/"
          )
          : "";

        // Create a new entry in the Numerology collection
        const newVivahMuhurat = new VivahMuhurat({
          title,
          description,
          vivahMuhurat_image,
        });
        await newVivahMuhurat.save();

        res.status(201).json({
          success: true,
          message: "VivahMuhurat uploaded successfully.",
          data: newVivahMuhurat,
        });
      } catch (error) {
        console.error("Error uploading VivahMuhurat:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload VivahMuhurat.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};

const getAllVivahMuhurat = async function (req, res) {
  try {
    const vivahMuhurat = await VivahMuhurat.find();

    res.status(200).json({ success: true, vivahMuhurat });
  } catch (error) {
    console.error("Error fetching vivahMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch vivahMuhurat",
      error: error.message,
    });
  }
};

const updateVivahMuhurat = function (req, res) {
  uploadVivahMuhuratImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { vivahMuhuratId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingVivahMuhurat = await VivahMuhurat.findById(vivahMuhuratId);
      if (!existingVivahMuhurat) {
        return res
          .status(404)
          .json({ success: false, message: "VivahMuhurat not found." });
      }

      existingVivahMuhurat.title = title;
      existingVivahMuhurat.description = description;

      if (
        req.files &&
        req.files["vivahMuhurat_image"] &&
        req.files["vivahMuhurat_image"][0] &&
        req.files["vivahMuhurat_image"][0].path
      ) {
        const imagePath = req.files["vivahMuhurat_image"][0].path.replace(
          /^.*VivahMuhuratImage[\\/]/,
          "VivahMuhuratImage/"
        );
        existingVivahMuhurat.vivahMuhurat_image = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingVivahMuhurat.save();

      res.status(200).json({
        success: true,
        message: "VivahMuhurat updated successfully.",
        data: existingVivahMuhurat,
      });
    } catch (error) {
      console.error("Error updating VivahMuhurat:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update VivahMuhurat.",
        error: error.message,
      });
    }
  });
};

const deleteVivahMuhurat = async function (req, res) {
  try {
    const vivahMuhuratId = req.body.vivahMuhuratId;

    const deletedVivahMuhurat = await VivahMuhurat.findByIdAndDelete(
      vivahMuhuratId
    );

    if (!deletedVivahMuhurat) {
      return res
        .status(404)
        .json({ success: false, message: "VivahMuhurat not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "VivahMuhurat deleted successfully" });
  } catch (error) {
    console.error("Error deleting VivahMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete VivahMuhurat",
      error: error.message,
    });
  }
};
// Vivah Muhurat

// Mundan Muhurat
const uploadMundanMuhuratImage = configureMulter(
  "uploads/MundanMuhuratImage/",
  [{ name: "mundanMuhurat_image", maxCount: 1 }]
);

const addMundanMuhurat = async function (req, res) {
  try {
    uploadMundanMuhuratImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const mundanMuhurat_image = req.files["mundanMuhurat_image"]
          ? req.files["mundanMuhurat_image"][0].path.replace(
            /^.*MundanMuhuratImage[\\/]/,
            "MundanMuhuratImage/"
          )
          : "";

        const newMundanMuhurat = new MundanMuhurat({
          title,
          description,
          mundanMuhurat_image,
        });
        await newMundanMuhurat.save();

        res.status(201).json({
          success: true,
          message: "MundanMuhurat uploaded successfully.",
          data: newMundanMuhurat,
        });
      } catch (error) {
        console.error("Error uploading MundanMuhurat:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload MundanMuhurat.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};

const getAllMundanMuhurat = async function (req, res) {
  try {
    const mundanMuhurat = await MundanMuhurat.find();

    res.status(200).json({ success: true, mundanMuhurat });
  } catch (error) {
    console.error("Error fetching MundanMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch MundanMuhurat",
      error: error.message,
    });
  }
};

const updateMundanMuhurat = function (req, res) {
  uploadMundanMuhuratImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { mundanMuhuratId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingMundanMuhurat = await MundanMuhurat.findById(
        mundanMuhuratId
      );
      if (!existingMundanMuhurat) {
        return res
          .status(404)
          .json({ success: false, message: "MundanMuhurat not found." });
      }

      existingMundanMuhurat.title = title;
      existingMundanMuhurat.description = description;

      if (
        req.files &&
        req.files["mundanMuhurat_image"] &&
        req.files["mundanMuhurat_image"][0] &&
        req.files["mundanMuhurat_image"][0].path
      ) {
        const imagePath = req.files["mundanMuhurat_image"][0].path.replace(
          /^.*MundanMuhuratImage[\\/]/,
          "MundanMuhuratImage/"
        );
        existingMundanMuhurat.mundanMuhurat_image = imagePath;
      }

      await existingMundanMuhurat.save();

      res.status(200).json({
        success: true,
        message: "MundanMuhurat updated successfully.",
        data: existingMundanMuhurat,
      });
    } catch (error) {
      console.error("Error updating MundanMuhurat:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update MundanMuhurat.",
        error: error.message,
      });
    }
  });
};

const deleteMundanMuhurat = async function (req, res) {
  try {
    const mundanMuhuratId = req.body.mundanMuhuratId;

    const deletedMundanMuhurat = await MundanMuhurat.findByIdAndDelete(
      mundanMuhuratId
    );

    if (!deletedMundanMuhurat) {
      return res
        .status(200)
        .json({ success: false, message: "mundanMuhurat not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "mundanMuhurat deleted successfully" });
  } catch (error) {
    console.error("Error deleting mundanMuhurat:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete mundanMuhurat",
      error: error.message,
    });
  }
};
// // Mundan Muhurat

// // Annaprashan
const uploadAnnaprashanImage = configureMulter("uploads/AnnaprashanImage/", [
  { name: "annaprashan_image", maxCount: 1 },
]);

const addAnnaprashan = async function (req, res) {
  try {
    uploadAnnaprashanImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const { title, description } = req.body;

        // Validate required fields
        if (!title) {
          return res.status(400).json({
            success: false,
            message: "Please provide a Title.",
          });
        }

        const annaprashan_image = req.files["annaprashan_image"]
          ? req.files["annaprashan_image"][0].path.replace(
            /^.*AnnaprashanImage[\\/]/,
            "AnnaprashanImage/"
          )
          : "";

        // Create a new entry in the Numerology collection
        const newAnnaprashan = new Annaprashan({
          title,
          description,
          annaprashan_image,
        });
        await newAnnaprashan.save();

        res.status(201).json({
          success: true,
          message: "Annaprashan uploaded successfully.",
          data: newAnnaprashan,
        });
      } catch (error) {
        console.error("Error uploading Annaprashan:", error);
        res.status(500).json({
          success: false,
          message: "Failed to upload Annaprashan.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Failed to handle file upload.",
      error: error.message,
    });
  }
};

const getAllAnnaprashan = async function (req, res) {
  try {
    const annaprashan = await Annaprashan.find();

    res.status(200).json({ success: true, annaprashan });
  } catch (error) {
    console.error("Error fetching Annaprashan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Annaprashan",
      error: error.message,
    });
  }
};

const updateAnnaprashan = function (req, res) {
  uploadAnnaprashanImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { annaprashanId, title, description } = req.body;

      // Validate required fields
      if (!title || !description) {
        return res.status(400).json({
          success: false,
          message: "Please provide a title and a description.",
        });
      }

      const existingAnnaprashan = await Annaprashan.findById(annaprashanId);
      if (!existingAnnaprashan) {
        return res
          .status(404)
          .json({ success: false, message: "Annaprashan not found." });
      }

      existingAnnaprashan.title = title;
      existingAnnaprashan.description = description;

      if (
        req.files &&
        req.files["annaprashan_image"] &&
        req.files["annaprashan_image"][0] &&
        req.files["annaprashan_image"][0].path
      ) {
        const imagePath = req.files["annaprashan_image"][0].path.replace(
          /^.*AnnaprashanImage[\\/]/,
          "AnnaprashanImage/"
        );
        existingAnnaprashan.annaprashan_image = imagePath; // Update 'remedyIcon' with the new image path
      }

      await existingAnnaprashan.save();

      res.status(200).json({
        success: true,
        message: "Annaprashan updated successfully.",
        data: existingAnnaprashan,
      });
    } catch (error) {
      console.error("Error updating Annaprashan:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Annaprashan.",
        error: error.message,
      });
    }
  });
};

const deleteAnnaprashan = async function (req, res) {
  try {
    const annaprashanId = req.body.annaprashanId;

    const deletedAnnaprashan = await Annaprashan.findByIdAndDelete(
      annaprashanId
    );

    if (!deletedAnnaprashan) {
      return res
        .status(404)
        .json({ success: false, message: "Annaprashan not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Annaprashan deleted successfully" });
  } catch (error) {
    console.error("Error deleting Annaprashan:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Annaprashan",
      error: error.message,
    });
  }
};
// // Annaprashan

// // Vidyarambh Muhurat
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Vidyarambh Muhurat

// // Dev Prathistha Muhurat
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Dev Prathistha Muhurat

// // GrihaPravesh Muhurat
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // GrihaPravesh Muhurat

// // GrihaRog Nivaran
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // GrihaRog Nivaran

// // SolarEclipse
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // SolarEclipse

// // Lunar Eclipse
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Lunar Eclipse

// // Rahukaal
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Rahukaal

// // Kaalsarp Dosha
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Kaalsarp Dosha

// // Learn Astrologer
// const uploadNumerologyImage = configureMulter("uploads/NumerologyImage/", [
//   { name: "numerology_image", maxCount: 1 },
// ]);

// const addNumerology = async function (req, res) {
//   try {
//     uploadNumerologyImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         return res.status(500).json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         return res.status(500).json({ success: false, message: "Error uploading file", error: err });
//       }

//       try {
//         const { title, description } = req.body;

//         // Validate required fields
//         if (!title) {
//           return res.status(400).json({
//             success: false,
//             message: "Please provide a Title.",
//           });
//         }

//         const numerology_image = req.files["numerology_image"]
//           ? req.files["numerology_image"][0].path.replace(
//               /^.*NumerologyImage[\\/]/,
//               "NumerologyImage/"
//             )
//           : "";

//         // Create a new entry in the Numerology collection
//         const newNumerology = new Numerology({ title, description, numerology_image });
//         await newNumerology.save();

//         res.status(201).json({
//           success: true,
//           message: "Numerology uploaded successfully.",
//           data: newNumerology,
//         });
//       } catch (error) {
//         console.error("Error uploading Numerology:", error);
//         res.status(500).json({
//           success: false,
//           message: "Failed to upload Numerology.",
//           error: error.message,
//         });
//       }
//     });
//   } catch (error) {
//     console.error("Error handling file upload:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to handle file upload.",
//       error: error.message,
//     });
//   }
// };

// const getAllNumerology = async function (req, res) {
//   try {
//     const numerology = await Numerology.find();

//     res.status(200).json({ success: true, numerology });
//   } catch (error) {
//     console.error("Error fetching Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to fetch Numerology",
//       error: error.message,
//     });
//   }
// };

// const updateNumerology = function (req, res) {
//   uploadNumerologyImage(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Multer error", error: err });
//     } else if (err) {
//       return res
//         .status(500)
//         .json({ success: false, message: "Error uploading file", error: err });
//     }

//     try {
//       const { numerologyId, title, description } = req.body;

//       // Validate required fields
//       if (!title || !description) {
//         return res.status(400).json({
//           success: false,
//           message: "Please provide a title and a description.",
//         });
//       }

//       const existingNumerology = await Numerology.findById(numerologyId);
//       if (!existingNumerology) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Numerology not found." });
//       }

//       existingNumerology.title = title;
//       existingNumerology.description = description;

//       if (
//         req.files &&
//         req.files["numerology_image"] &&
//         req.files["numerology_image"][0] &&
//         req.files["numerology_image"][0].path
//       ) {
//         const imagePath = req.files["numerology_image"][0].path.replace(
//           /^.*NumerologyImage[\\/]/,
//           "NumerologyImage/"
//         );
//         existingNumerology.numerology_image = imagePath; // Update 'remedyIcon' with the new image path
//       }

//       await existingNumerology.save();

//       res.status(200).json({
//         success: true,
//         message: "Numerology updated successfully.",
//         data: existingNumerology,
//       });
//     } catch (error) {
//       console.error("Error updating Numerology:", error);
//       res.status(500).json({
//         success: false,
//         message: "Failed to update Numerology.",
//         error: error.message,
//       });
//     }
//   });
// };

// const deleteNumerology = async function (req, res) {
//   try {
//     const numerologyId = req.body.numerologyId;

//     const deletedNumerology = await Numerology.findByIdAndDelete(numerologyId);

//     if (!deletedNumerology) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Numerology not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Numerology deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting Numerology:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to delete Numerology",
//       error: error.message,
//     });
//   }
// };
// // Learn Astrologer

// auspicious time
const addAuspiciousTime = async function (req, res) {
  try {
    const { title, description } = req.body;

    const newAuspiciousTime = new AuspiciousTime({ title, description });
    await newAuspiciousTime.save();

    res.status(200).json({
      success: true,
      message: "title to Auspicious Time added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getAuspiciousTime = async function (req, res) {
  try {
    const auspiciousTime = await AuspiciousTime.find();

    res.status(200).json({ success: true, auspiciousTime });
  } catch (error) {
    console.error("Error fetching Title to AuspiciousTime:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch AuspiciousTime",
      error: error.message,
    });
  }
};

const updateAuspiciousTime = async function (req, res) {
  try {
    const { auspiciousTimeId, title, description } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const auspiciousTime = await AuspiciousTime.findById(auspiciousTimeId);

    if (!auspiciousTime) {
      return res
        .status(404)
        .json({ success: false, message: "AuspiciousTime entry not found." });
    }

    // Update the title field
    auspiciousTime.title = title;
    auspiciousTime.description = description;
    await auspiciousTime.save();

    res.status(200).json({
      success: true,
      message: "AuspiciousTime entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title and description:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteAuspiciousTime = async function (req, res) {
  try {
    const auspiciousTimeId = req.body.auspiciousTimeId;

    const deletedAuspiciousTime = await AuspiciousTime.findByIdAndDelete(
      auspiciousTimeId
    );

    if (!deletedAuspiciousTime) {
      return res
        .status(404)
        .json({ success: false, message: "AuspiciousTime not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "AuspiciousTime deleted successfully" });
  } catch (error) {
    console.error("Error deleting AuspiciousTime:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete AuspiciousTime",
      error: error.message,
    });
  }
};
// auspicious time

// Ask Astrologer
const addAskAstrologer = async function (req, res) {
  try {
    const { title } = req.body;

    const newAskAstrologer = new AskAstrologer({ title });
    await newAskAstrologer.save();

    res.status(200).json({
      success: true,
      message: "title to Ask Astrologer added successfully",
    });
  } catch (error) {
    console.error("Error adding title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add title",
      error: error.message,
    });
  }
};

const getAskAstrologer = async function (req, res) {
  try {
    const askAstrologer = await AskAstrologer.find();

    res.status(200).json({ success: true, askAstrologer });
  } catch (error) {
    console.error("Error fetching Title to ask astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to ask astrologer",
      error: error.message,
    });
  }
};

const updateAskAstrologer = async function (req, res) {
  try {
    const { askAstrologerId, title } = req.body; // Assuming you'll also receive the ID of the entry to update

    // Find the AskAstrologer entry by ID
    const askAstrologer = await AskAstrologer.findById(askAstrologerId);

    if (!askAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "AskAstrologer entry not found." });
    }

    // Update the title field
    askAstrologer.title = title;
    await askAstrologer.save();

    res.status(200).json({
      success: true,
      message: "AskAstrologer entry updated successfully",
    });
  } catch (error) {
    console.error("Error updating title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update title",
      error: error.message,
    });
  }
};

const deleteAskAstrologer = async function (req, res) {
  try {
    const askAstrologerId = req.body.askAstrologerId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(askAstrologerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Ask Astrologer ID" });
    }

    const deletedAskAstrologer = await AskAstrologer.findByIdAndDelete(
      askAstrologerId
    );

    if (!deletedAskAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "title not found." });
    }

    // Return success response
    res.status(200).json({
      success: true,
      message: "Faq deleted successfully",
      deletedAskAstrologer,
    });
  } catch (error) {
    console.error("Error deleting title:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete title.",
      error: error.message,
    });
  }
};

const addAskAstrologerQuestion = async function (req, res) {
  try {
    const { question, titleId } = req.body; // Assuming you receive question and titleId from the request

    const existingTitle = await AskAstrologer.findById(titleId);

    if (!existingTitle) {
      return res.status(404).json({
        success: false,
        message: "Selected title not found in AskAstrologer.",
      });
    }

    const newQuestion = new ListOfQuestion({ question, title: titleId });
    await newQuestion.save();

    res
      .status(201)
      .json({ success: true, message: "Question added successfully" });
  } catch (error) {
    console.error("Error adding question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add question",
      error: error.message,
    });
  }
};

const getAllQuestions = async function (req, res) {
  try {
    const allQuestions = await ListOfQuestion.find().populate("title", "title");

    if (!allQuestions) {
      return res
        .status(404)
        .json({ success: false, message: "No questions found." });
    }

    res.status(200).json({ success: true, questions: allQuestions });
  } catch (error) {
    console.error("Error fetching questions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch questions",
      error: error.message,
    });
  }
};

const updateAskAstrologerQuestion = async function (req, res) {
  try {
    const { questionId, titleId, question } = req.body;

    const existingTitle = await AskAstrologer.findById(titleId);

    if (!existingTitle) {
      return res.status(404).json({
        success: false,
        message: "Selected title not found in AskAstrologer.",
      });
    }

    const updatedQuestion = await ListOfQuestion.findByIdAndUpdate(
      questionId,
      { title: titleId, question },
      { new: true }
    );

    if (!updatedQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    res.status(200).json({
      success: true,
      message: "Question updated successfully",
      updatedQuestion,
    });
  } catch (error) {
    console.error("Error updating question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update question",
      error: error.message,
    });
  }
};

const deleteQuestion = async function (req, res) {
  try {
    const questionId = req.body.questionId;

    const deletedQuestion = await ListOfQuestion.findByIdAndDelete(questionId);

    if (!deletedQuestion) {
      return res
        .status(404)
        .json({ success: false, message: "Question not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Question deleted successfully" });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete question",
      error: error.message,
    });
  }
};

const addAstrologer = function (req, res) {
  try {
    uploadAstrologerImages(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const {
          astrologerName,
          phoneNumber,
          alternateNumber,
          gender,
          email,
          chat_price,
          call_price,
          experience,
          about,
          city,
          state,
          country,
          zipCode,
          dateOfBirth,
          password,
          preferredDays,
          language,
          rating,
          youtubeLink,
          free_min,
          account_type,
          short_bio,
          long_bio,
          workingOnOtherApps,
          startTime,
          endTime,
          skill,
          // subSkill,
          remedies,
          expertise,
          mainExpertise,
          panCard,
          aadharNumber,
          account_holder_name,
          account_number,
          IFSC_code,
          country_phone_code,
          currency,
          commission_remark,
          address,
          account_name,
          consultation_price,
          commission_call_price,
          commission_chat_price,
        } = req.body;

        // Validate required fields
        if (
          !astrologerName ||
          !phoneNumber /* Add other required fields validation */
        ) {
          return res.status(400).json({
            success: false,
            message: "Please provide all required fields.",
          });
        }

        // File upload handling for profile, id proof, and bank proof images
        const profileImage = req.files["profileImage"]
          ? req.files["profileImage"][0].path
          : "";
        const id_proof_image = req.files["id_proof_image"]
          ? req.files["id_proof_image"][0].path
          : "";
        const bank_proof_image = req.files["bank_proof_image"]
          ? req.files["bank_proof_image"][0].path
          : "";

        const skillArray = Array.isArray(skill) ? skill : [];
        // const subSkillArray = Array.isArray(subSkill) ? subSkill : [];
        const remediesArray = Array.isArray(remedies) ? remedies : [];
        const expertiseArray = Array.isArray(expertise) ? expertise : [];
        const mainExpertiseArray = Array.isArray(mainExpertise)
          ? mainExpertise
          : [];
        const languageArray = Array.isArray(language) ? language : [];
        const preferredDaysArray = Array.isArray(preferredDays)
          ? preferredDays
          : [];

        // Check if the astrologer already exists
        const existingAstrologer = await Astrologer.findOne({ phoneNumber });
        if (existingAstrologer) {
          return res.status(400).json({
            success: false,
            message: "Astrologer with this phone number already exists.",
          });
        }

        // Create a new astrologer entry
        const newAstrologer = new Astrologer({
          astrologerName,
          phoneNumber,
          alternateNumber,
          gender,
          email,
          profileImage,
          id_proof_image,
          bank_proof_image,
          chat_price,
          call_price,
          experience,
          about,
          account_name,
          city,
          state,
          country,
          zipCode,
          dateOfBirth,
          aadharNumber,
          password,
          remedies: remediesArray,
          preferredDays: preferredDaysArray,
          language: languageArray,
          rating,
          youtubeLink,
          free_min,
          account_type,
          short_bio,
          long_bio,
          workingOnOtherApps,
          startTime,
          endTime,
          skill: skillArray,
          // subSkill: subSkillArray,
          expertise: expertiseArray,
          mainExpertise: mainExpertiseArray,
          panCard,
          account_holder_name,
          account_number,
          IFSC_code,
          country_phone_code,
          currency,
          commission_remark,
          address,
          consultation_price,
          commission_call_price,
          commission_chat_price,
          enquiry: false,
          isVerified: true,
        });

        await newAstrologer.save();

        // console.log(newAstrologer);

        res.status(201).json({
          success: true,
          message: "Astrologer added successfully.",
          data: newAstrologer,
        });
      } catch (error) {
        console.error("Error adding Astrologer:", error);
        res.status(500).json({
          success: false,
          message: "Failed to add Astrologer.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading images.",
      error: error.message,
    });
  }
};

// update astrologer details

// const updateAstrologer = function (req, res) {
//   uploadAstrologerImages(req, res, async function (err) {
//     if (err instanceof multer.MulterError) {
//       return res.status(500).json({ success: false, message: 'Multer error', error: err });
//     } else if (err) {
//       return res.status(500).json({ success: false, message: 'Error uploading file', error: err });
//     }

//     try {
//       const {
//         astrologerId,
//         astrologerName,
//           phoneNumber,
//           alternateNumber,
//           gender,
//           email,
//           chat_price,
//           call_price,
//           experience,
//           about,
//           city,
//           state,
//           country,
//           zipCode,
//           dateOfBirth,
//           password,
//           preferredDays,
//           language,
//           rating,
//           youtubeLink,
//           free_min,
//           account_type,
//           short_bio,
//           long_bio,
//           workingOnOtherApps,
//           startTime,
//           endTime,
//           skill,
//           // subSkill,
//           remedies,
//           expertise,
//           mainExpertise,
//           panCard,
//           aadharNumber,
//           account_holder_name,
//           account_number,
//           IFSC_code,
//           country_phone_code,
//           currency,
//           commission_remark,
//           address,
//           account_name,
//           consultation_price,
//           commission_call_price,
//           commission_chat_price
//       } = req.body;

//       // Fetch the existing astrologer by ID
//       let existingAstrologer = await Astrologer.findById(astrologerId);

//       if (!existingAstrologer) {
//         return res.status(404).json({
//           success: false,
//           message: 'Astrologer not found.'
//         });
//       }

//       existingAstrologer.astrologerName = astrologerName;
//       existingAstrologer.phoneNumber = phoneNumber;
//       existingAstrologer.alternateNumber = alternateNumber;
//       existingAstrologer.gender = gender;
//       existingAstrologer.email = email;
//       existingAstrologer.chat_price = chat_price;
//       existingAstrologer.call_price = call_price;
//       existingAstrologer.experience = experience;
//       existingAstrologer.about = about;
//       existingAstrologer.city = city;
//       existingAstrologer.state = state;
//       existingAstrologer.country = country;
//       existingAstrologer.zipCode = zipCode;
//       existingAstrologer.dateOfBirth = dateOfBirth;
//       existingAstrologer.password = password;
//       existingAstrologer.language = language;
//       existingAstrologer.preferredDays = preferredDays;
//       existingAstrologer.account_holder_name = account_holder_name;
//       existingAstrologer.free_min = free_min,
//       existingAstrologer.workingOnOtherApps = workingOnOtherApps
//       existingAstrologer.short_bio = short_bio,
//       existingAstrologer.long_bio = long_bio,
//       existingAstrologer.account_type = account_type,
//       existingAstrologer.startTime = startTime;
//       existingAstrologer.endTime = endTime;
//       existingAstrologer.skill = skill;
//       existingAstrologer.remedies = remedies;
//       existingAstrologer.expertise = expertise;
//       existingAstrologer.mainExpertise = mainExpertise;
//       existingAstrologer.panCard = panCard;
//       existingAstrologer.account_number = account_number;
//       existingAstrologer.IFSC_code = IFSC_code;
//       existingAstrologer.country_phone_code = country_phone_code;
//       existingAstrologer.currency = currency;
//       existingAstrologer.youtubeLink = youtubeLink;
//       existingAstrologer.commission_remark = commission_remark;
//       existingAstrologer.address = address;
//       existingAstrologer.consultation_price = consultation_price;
//       existingAstrologer.commission_call_price = commission_call_price;
//       existingAstrologer.commission_chat_price = commission_chat_price;
//       existingAstrologer.rating = rating;
//       existingAstrologer.account_name = account_name;
//       existingAstrologer.aadharNumber = aadharNumber;

//       existingAstrologer.preferredDays = Array(preferredDays) ? preferredDays : [];
//       existingAstrologer.language = Array.isArray(language) ? language : [];
//       existingAstrologer.remedies = Array.isArray(remedies) ? remedies : [];
//       existingAstrologer.skill = Array.isArray(skill) ? skill : [];
//       existingAstrologer.expertise = Array.isArray(expertise) ? expertise : [];
//       existingAstrologer.mainExpertise = Array.isArray(mainExpertise) ? mainExpertise : [];

//       // Update image path if a new image is uploaded
//       if (req.files['profileImage']) {
//         existingAstrologer.profileImage = req.files['profileImage'][0].path.replace(/^.*profileImage[\\/]/, 'profileImage/');
//       }
//       if (req.files['id_proof_image']) {
//         existingAstrologer.id_proof_image = req.files['id_proof_image'][0].path.replace(/^.*profileImage[\\/]/, 'profileImage/');
//       }
//       if (req.files['bank_proof_image']) {
//         existingAstrologer.bank_proof_image = req.files['bank_proof_image'][0].path.replace(/^.*profileImage[\\/]/, 'profileImage/');
//       }

//       await existingAstrologer.save();

//       res.status(200).json({
//         success: true,
//         message: 'Astrologer details updated successfully.',
//         data: existingAstrologer
//       });
//     } catch (error) {
//       console.error('Error updating Astrologer:', error);
//       res.status(500).json({
//         success: false,
//         message: 'Failed to update Astrologer.',
//         error: error.message
//       });
//     }
//   });
// };

const updateAstrologer = function (req, res) {
  try {
    uploadAstrologerImages(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const astrologerId = req.body.astrologerId; // Assuming astrologerId is in the URL
        const existingAstrologer = await Astrologer.findById(astrologerId);

        if (!existingAstrologer) {
          return res.status(404).json({
            success: false,
            message: "Astrologer not found.",
          });
        }
        // Update astrologer's information
        const {
          astrologerName,
          // phoneNumber,
          alternateNumber,
          gender,
          email,
          chat_price,
          call_price,
          experience,
          about,
          city,
          state,
          country,
          zipCode,
          dateOfBirth,
          password,
          preferredDays,
          language,
          rating,
          youtubeLink,
          free_min,
          account_type,
          short_bio,
          long_bio,
          workingOnOtherApps,
          startTime,
          endTime,
          skill,
          // subSkill,
          remedies,
          expertise,
          mainExpertise,
          panCard,
          aadharNumber,
          account_holder_name,
          account_number,
          IFSC_code,
          country_phone_code,
          currency,
          commission_remark,
          address,
          account_name,
          consultation_price,
          commission_call_price,
          commission_chat_price,
        } = req.body;

        existingAstrologer.astrologerName = astrologerName;
        // existingAstrologer.phoneNumber = phoneNumber;
        existingAstrologer.alternateNumber = alternateNumber;
        existingAstrologer.gender = gender;
        existingAstrologer.email = email;
        existingAstrologer.chat_price = chat_price;
        existingAstrologer.call_price = call_price;
        existingAstrologer.experience = experience;
        existingAstrologer.about = about;
        existingAstrologer.city = city;
        existingAstrologer.state = state;
        existingAstrologer.country = country;
        existingAstrologer.zipCode = zipCode;
        existingAstrologer.dateOfBirth = dateOfBirth;
        existingAstrologer.password = password;
        existingAstrologer.language = language;
        existingAstrologer.account_holder_name = account_holder_name;
        (existingAstrologer.free_min = free_min),
          (existingAstrologer.workingOnOtherApps = workingOnOtherApps);
        (existingAstrologer.short_bio = short_bio),
          (existingAstrologer.long_bio = long_bio),
          (existingAstrologer.account_type = account_type),
          (existingAstrologer.startTime = startTime);
        existingAstrologer.endTime = endTime;
        existingAstrologer.panCard = panCard;
        existingAstrologer.account_number = account_number;
        existingAstrologer.IFSC_code = IFSC_code;
        existingAstrologer.country_phone_code = country_phone_code;
        existingAstrologer.currency = currency;
        existingAstrologer.youtubeLink = youtubeLink;
        existingAstrologer.commission_remark = commission_remark;
        existingAstrologer.address = address;
        existingAstrologer.consultation_price = consultation_price;
        existingAstrologer.commission_call_price = commission_call_price;
        existingAstrologer.commission_chat_price = commission_chat_price;
        existingAstrologer.rating = rating;
        existingAstrologer.account_name = account_name;
        existingAstrologer.aadharNumber = aadharNumber;
        // File upload handling for profile, id proof, and bank proof images (similar to your addAstrologer API)
        existingAstrologer.preferredDays = Array.isArray(preferredDays)
          ? preferredDays
          : [preferredDays];
        existingAstrologer.skill = Array.isArray(skill) ? skill : [skill];
        existingAstrologer.remedies = Array.isArray(remedies)
          ? remedies
          : [remedies];
        existingAstrologer.expertise = Array.isArray(expertise)
          ? expertise
          : [expertise];
        existingAstrologer.mainExpertise = Array.isArray(mainExpertise)
          ? mainExpertise
          : [mainExpertise];

        if (req.files) {
          if (req.files["profileImage"]) {
            existingAstrologer.profileImage = req.files["profileImage"][0].path;
          }
          if (req.files["id_proof_image"]) {
            existingAstrologer.id_proof_image =
              req.files["id_proof_image"][0].path;
          }
          if (req.files["bank_proof_image"]) {
            existingAstrologer.bank_proof_image =
              req.files["bank_proof_image"][0].path;
          }
        }

        await existingAstrologer.save();

        res.status(200).json({
          success: true,
          message: "Astrologer updated successfully.",
          data: existingAstrologer,
        });
      } catch (error) {
        console.error("Error updating Astrologer:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update Astrologer.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    console.error("Error uploading images:", error);
    res.status(500).json({
      success: false,
      message: "Error uploading images.",
      error: error.message,
    });
  }
};

// list of all Atrologers
const getAllAstrologers = async function (req, res) {
  try {
    const astrologers = await Astrologer.find({ isDeleted: 0, enquiry: false })
      .populate("skill", "skill") // Populate the 'skill' field and include only the 'skill' field from the referenced model
      .populate("expertise", "expertise")
      .populate("remedies", "remedy") // Populate the 'expertise' field and include only the 'expertise' field from the referenced model
      .populate("mainExpertise", "mainExpertise");

    res.status(200).json({ success: true, astrologers });
  } catch (error) {
    console.error("Error fetching Astrologers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologers",
      error: error.message,
    });
  }
};

const getAstrologerRequests = async function (req, res) {
  try {
    const requests = await AstrologerRequests.find().populate("astrologerId", [
      "astrologerName",
    ]);

    res.status(200).json({
      success: true,
      requests,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const updateServiceCharges = async function (req, res) {
  try {
    const { requestId } = req.body;
    const requestsData = await AstrologerRequests.findByIdAndDelete(requestId);

    const astrologer = await Astrologer.findById(requestsData?.astrologerId);

    if (!astrologer && !requestsData) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { chat_price, call_price, startTime, endTime, preferredDays } =
      requestsData;

    if (!!startTime) {
      astrologer.startTime = startTime;
    }
    if (!!endTime) {
      astrologer.endTime = endTime;
    }
    if (!!preferredDays) {
      astrologer.preferredDays = preferredDays;
    }
    if (!!chat_price) {
      astrologer.chat_price = chat_price;
    }
    if (!!call_price) {
      astrologer.call_price = call_price;
    }

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer enquiry status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer enquiry status.",
      error: error.message,
    });
  }
};

// delete astrologer
const deleteAstrologerAccount = async function (req, res) {
  try {
    const astrologerId = req.body.astrologerId;

    const deletedAstrologer = await Astrologer.findOne({ _id: astrologerId });

    if (!deletedAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer account not found." });
    }

    deletedAstrologer.isDeleted = 1;
    await deletedAstrologer.save();

    res.status(200).json({
      success: true,
      message: "Astrologers account deleted successfully",
    });
  } catch (error) {
    console.error("Error deleting question:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Testimonial",
      error: error.message,
    });
  }
};

//======================== Blogs ============================

const blogStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/blogsImage/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
    cb(null, uniqueFilename); // Set unique filename with original extension
  },
});

function getFileExtension(filename) {
  return filename.slice(((filename.lastIndexOf(".") - 1) >>> 0) + 1);
}

const uploadBlog = multer({ storage: blogStorage }).single("image");

const addBlog = async function (req, res) {
  try {
    uploadBlog(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { title, blogCategoryId, created_by, description } = req.body;
      const imagePath = req.file ? req.file.path : ""; // If image uploaded, get its path
      // console.log("blogCategoryId", blogCategoryId)
      const existingCategory = await BlogsCategory.findById(blogCategoryId);

      if (!existingCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Blog category not found." });
      }

      const newAstroBlog = new Blogs({
        title,
        image: imagePath, // Assign the image path to the 'image' field
        blogCategory: blogCategoryId,
        created_by,
        description,
      });

      await newAstroBlog.save();

      return res.status(200).json({
        success: true,
        message: "Astroblog added successfully",
        newAstroBlog,
      });
    });
  } catch (error) {
    console.error("Error adding astroblog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add astroblog",
      error: error.message,
    });
  }
};

const blogList = async function (req, res) {
  try {
    const Blog = await Blogs.find();

    res.status(200).json({ success: true, Blog });
  } catch (error) {
    console.error("Error fetching  Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch  Blog",
      error: error.message,
    });
  }
};

const updateBlog = async function (req, res) {
  try {
    uploadBlog(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { blogId, title, blogCategoryId, created_by, description } =
        req.body;
      const imagePath = req.file ? req.file.path : ""; // If image uploaded, get its path

      const existingCategory = await BlogsCategory.findById(blogCategoryId);

      if (!existingCategory) {
        return res
          .status(404)
          .json({ success: false, message: "Blog category not found." });
      }

      const blogToUpdate = await Blogs.findById(blogId);

      if (!blogToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Blog not found." });
      }

      // Update blog properties
      blogToUpdate.title = title;
      blogToUpdate.image = imagePath;
      blogToUpdate.blogCategory = blogCategoryId;
      blogToUpdate.created_by = created_by;
      blogToUpdate.description = description;

      await blogToUpdate.save();

      return res.status(200).json({
        success: true,
        message: "Astroblog updated successfully",
        updatedAstroBlog: blogToUpdate,
      });
    });
  } catch (error) {
    console.error("Error updating astroblog:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update astroblog",
      error: error.message,
    });
  }
};

const deleteBlog = async function (req, res) {
  try {
    const blogId = req.body.blogId;
    const deletedBlog = await Blogs.findByIdAndUpdate(
      blogId,
      { $set: { deleted: true } },
      { new: true } // Return the updated document
    );

    if (!deletedBlog) {
      return res
        .status(404)
        .json({ success: false, message: "Blog not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Blog soft deleted successfully" });
  } catch (error) {
    console.error("Error soft deleting blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to soft delete blog",
      error: error.message,
    });
  }
};

//====================== add blog category  =====================================================
const addBlogCategory = async function (req, res) {
  try {
    const { blog_category } = req.body;

    // Ensure that the blog category is provided
    if (!blog_category) {
      return res
        .status(400)
        .json({ success: false, message: "Blog category is required" });
    }

    // Create a new instance of the BlogsCategory model with the provided blog category
    const newBlogCategory = new BlogsCategory({ title: blog_category, status: "Active" });

    // Save the new blog category to the database
    await newBlogCategory.save();

    // Respond with a success message
    return res
      .status(200)
      .json({ success: true, message: "Blog category added successfully" });
  } catch (error) {
    // Handle any errors that occur during the process
    console.error("Error adding Blog Category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add Blog Category",
      error: error.message,
    });
  }
};

const categoryBlogList = async function (req, res) {
  try {
    const categoryBlog = await BlogsCategory.find();

    res.status(200).json({ success: true, categoryBlog });
  } catch (error) {
    console.error("Error fetching Category Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Category Blog",
      error: error.message,
    });
  }
};

//================================ Testimonial =================================================

const addTestimonial = function (req, res) {
  uploadTestimonial(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { name, description, youtubeLink, rating, astrologerId } = req.body;

      // Validate required fields
      if (!name || !description || !rating || !astrologerId) {
        return res.status(400).json({
          success: false,
          message: "Please provide all required fields.",
        });
      }

      // Check if the provided astrologerId exists in the Astrologer schema
      const existingAstrologer = await Astrologer.findById(astrologerId);
      if (!existingAstrologer) {
        return res.status(400).json({
          success: false,
          message: "Invalid astrologerId. Please provide a valid astrologerId.",
        });
      }

      const image = req.files["image"]
        ? req.files["image"][0].path.replace(
          /^.*testimonialImage[\\/]/,
          "testimonialImage/"
        )
        : "";

      // Create a new testimonial entry in the Testimonial collection
      const newTestimonial = new Testimonial({
        name,
        image,
        astrologerId,
        youtubeLink,
        description,
        rating,
      });
      await newTestimonial.save();

      res.status(201).json({
        success: true,
        message: "Testimonial uploaded successfully.",
        data: newTestimonial,
      });
    } catch (error) {
      console.error("Error uploading Testimonial:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload Testimonial.",
        error: error.message,
      });
    }
  });
};

const updateTestimonial = function (req, res) {
  uploadTestimonial(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { testimonialId } = req.params;
      const { name, image, astrologerId, rating, description, youtubeLink } =
        req.body;

      // Validate required fields
      const requiredFields = [
        "name",
        "astrologerId",
        "youtubeLink",
        "description",
        "rating",
      ];
      const missingFields = requiredFields.filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        const missingFieldsMessage = missingFields
          .map((field) => `${field} is required`)
          .join(", ");
        return res.status(400).json({
          success: false,
          message: `${missingFieldsMessage}`,
        });
      }

      const existingTestimonial = await Testimonial.findById(testimonialId);

      if (!existingTestimonial) {
        return res
          .status(404)
          .json({ success: false, message: "Testimonial not found." });
      }

      // Check if the provided astrologerId exists in the Astrologer schema
      const existingAstrologer = await Astrologer.findById(astrologerId);
      if (!existingAstrologer) {
        return res.status(400).json({
          success: false,
          message: "Invalid astrologerId. Please provide a valid astrologerId.",
        });
      }

      existingTestimonial.name = name;
      existingTestimonial.description = description;
      existingTestimonial.image = image;
      existingTestimonial.youtubeLink = youtubeLink;
      existingTestimonial.astrologer = astrologerId;
      existingTestimonial.rating = rating;

      // Update image path if a new image is uploaded
      if (req.files["image"]) {
        const imagePath = req.files["image"][0].path.replace(
          /^.*testimonialImage[\\/]/,
          "testimonialImage/"
        );
        existingTestimonial.image = imagePath;
      }

      await existingTestimonial.save();

      res.status(200).json({
        success: true,
        message: "Testimonial updated successfully.",
        data: existingTestimonial,
      });
    } catch (error) {
      console.error("Error updating Testimonial:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Testimonial.",
        error: error.message,
      });
    }
  });
};

const deleteTestimonial = async function (req, res) {
  try {
    const testimonialId = req.body.testimonialId;

    // Find the testimonial by ID and update the 'deleted' field to true
    const deletedTestimonial = await Testimonial.findByIdAndUpdate(
      testimonialId,
      { $set: { deleted: true } },
      { new: true } // Return the updated document
    );

    if (!deletedTestimonial) {
      return res
        .status(404)
        .json({ success: false, message: "Testimonial not found." });
    }

    res.status(200).json({
      success: true,
      message: "Testimonial soft deleted successfully",
    });
  } catch (error) {
    console.error("Error soft deleting testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Failed to soft delete testimonial",
      error: error.message,
    });
  }
};

const getAllTestimonial = async function (req, res) {
  try {
    // Fetch all Testimonial from the database
    const testimonial = await Testimonial.find();

    // Return the list of Testimonial as a JSON response
    res.status(200).json({ success: true, result: testimonial });
  } catch (error) {
    console.error("Error fetching Testimonial:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Testimonial",
      error: error.message,
    });
  }
};

// get astrologer id
const checkAstrologer = async function (req, res) {
  try {
    const { email, password } = req.body;

    // Find the astrologer by email
    let astrologer = await Astrologer.findOne({ email });

    if (astrologer && astrologer.password === password) {
      // If email and password match, return the astrologer ID
      return res.status(200).json({
        success: true,
        message: "Login successful.",
        astrologerId: astrologer._id,
      });
    } else {
      return res.status(400).json({
        success: false,
        message: "Login failed. Invalid credentials.",
      });
    }
  } catch (error) {
    console.error("Error during astrologer login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

//===================================== add customer =========================================
const addCustomer = async function (req, res) {
  try {
    const { customerName, phoneNumber } = req.body;

    // Check if the customer already exists based on customerName and phoneNumber
    const existingCustomer = await Customers.findOne({
      customerName,
      phoneNumber,
    });

    if (existingCustomer) {
      return res
        .status(400)
        .json({ success: false, message: "Customer already exists." });
    }

    const newCustomer = new Customers({ customerName, phoneNumber });
    await newCustomer.save();

    res
      .status(201)
      .json({ success: true, message: "Customer added successfully" });
  } catch (error) {
    console.error("Error adding Customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Customer",
      error: error.message,
    });
  }
};

// show all-customer list
const getAllCustomers = async function (req, res) {
  try {
    // Fetch all skills from the database
    const customer = await Customers.find();

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, customer });
  } catch (error) {
    console.error("Error fetching Customers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Customers",
      error: error.message,
    });
  }
};



//add Announcement
const addAnnouncement = async function (req, res) {
  try {
    const { description } = req.body;

    const newAnnouncement = new Announcement({ description });
    await newAnnouncement.save();

    res
      .status(201)
      .json({ success: true, message: "Announcement added successfully" });
  } catch (error) {
    console.error("Error adding Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Announcement",
      error: error.message,
    });
  }
};

const getAnnouncement = async function (req, res) {
  try {
    const announcement = await Announcement.find();

    res.status(200).json({ success: true, announcement });
  } catch (error) {
    console.error("Error fetching Title to Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Title to Announcement",
      error: error.message,
    });
  }
};

// update announcement
const updateAnnouncement = async function (req, res) {
  try {
    const { announcementId, description } = req.body;

    const announcementToUpdate = await Announcement.findById(announcementId);

    if (!announcementToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found." });
    }

    if (description) {
      announcementToUpdate.description = description;
    }

    await announcementToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Announcement updated successfully",
      announcement: announcementToUpdate,
    });
  } catch (error) {
    console.error("Error updating Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Announcement",
      error: error.message,
    });
  }
};

// delete anouncement
const deleteAnnouncement = async function (req, res) {
  try {
    const announcementId = req.body.announcementId;

    const deletedAnnouncement = await Announcement.findByIdAndDelete(
      announcementId
    );

    if (!deletedAnnouncement) {
      return res
        .status(404)
        .json({ success: false, message: "Announcement not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Announcement deleted successfully" });
  } catch (error) {
    console.error("Error deleting Announcement:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Announcement",
      error: error.message,
    });
  }
};

// add message
const addMessage = async function (req, res) {
  try {
    const { astrologerId, description } = req.body;

    const newMessage = new Message({ astrologerId, description });
    await newMessage.save();

    res
      .status(201)
      .json({ success: true, message: "Message added successfully" });
  } catch (error) {
    console.error("Error adding Message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Message",
      error: error.message,
    });
  }
};

// update message
const updateMessage = async function (req, res) {
  try {
    const { messageId, description, astrologerId } = req.body;

    const messageToUpdate = await Message.findById(messageId);

    if (!messageToUpdate) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    if (description) {
      messageToUpdate.description = description;
    }
    if (astrologerId) {
      messageToUpdate.astrologer = astrologerId;
    }

    await messageToUpdate.save();

    res.status(200).json({
      success: true,
      message: "Message updated successfully",
      remessage: messageToUpdate,
    });
  } catch (error) {
    console.error("Error updating Message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update Message",
      error: error.message,
    });
  }
};

// delete message
const deleteMessage = async function (req, res) {
  try {
    const messageId = req.body.messageId;

    if (!mongoose.Types.ObjectId.isValid(messageId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Message ID" });
    }

    const deletedMessage = await Message.findByIdAndDelete(messageId);

    if (!deletedMessage) {
      return res
        .status(404)
        .json({ success: false, message: "Message not found." });
    }

    res.status(200).json({
      success: true,
      message: "Message deleted successfully",
      deletedMessage,
    });
  } catch (error) {
    console.error("Error deleting Message:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Message",
      error: error.message,
    });
  }
};

// how to use screen shot

const addScreenshot = async function (req, res) {
  try {
    upload(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      // const { skill } = req.body;
      const imagePath = req.file.path.replace(
        /^.*uploadImage[\\/]/,
        "uploadImage/"
      );
      const fileName = req.file.filename;

      const newScreenshot = new HowToUseScreenshots({ image: imagePath }); // Assuming 'image' field in Skills schema stores the image path

      // Save the new skill to the database
      await newScreenshot.save();

      res.status(201).json({
        success: true,
        message: "Screenshot added successfully",
        imagePath,
        fileName,
      });
    });
  } catch (error) {
    console.error("Error adding Screenshot:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Screenshot",
      error: error.message,
    });
  }
};

// chat history

// const getChatHistory = async function(req,res) {
//   try {
//     // Fetch all Customer from the database
//     const chatHistory = await ChatHistory.find();

//     // Return the list of Customer as a JSON response
//     res.status(200).json({ success: true, chatHistory });
//   } catch (error) {
//     console.error('Error fetching Chat History:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch Chat History', error: error.message });
//   }
// };

// Banners

const addBanners = function (req, res) {
  uploadBanners(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { redirectionUrl, title, redirectTo } = req.body;

      // Validate required fields
      // if (!redirectionUrl) {
      //   return res.status(400).json({
      //     success: false,
      //     message: 'Please provide a Skill.'
      //   });
      // }

      const bannerImage = req.files["bannerImage"]
        ? req.files["bannerImage"][0].path.replace(
          /^.*bannersImage[\\/]/,
          "bannersImage/"
        )
        : "";

      // Create a new file entry in the Customers collection
      const newBanner = new Banners({
        redirectionUrl,
        bannerImage,
        title,
        redirectTo,
      });
      await newBanner.save();

      res.status(201).json({
        success: true,
        message: "Banners uploaded successfully.",
        data: newBanner,
      });
    } catch (error) {
      console.error("Error uploading Banner:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload Baners.",
        error: error.message,
      });
    }
  });
};

// get Banners
const getAllBanners = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find();

    // Return the list of Banners as a JSON response
    res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Banners",
      error: error.message,
    });
  }
};

const getAppBanners = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find({ bannerFor: "app" });

    // Return the list of Banners as a JSON response
    res.status(200).json({ success: true, banners });
  } catch (error) {
    console.error("Error fetching banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Banners",
      error: error.message,
    });
  }
};

// update Banners
const updateBanners = function (req, res) {
  uploadBanners(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      // const { bannersId } = req.body;
      const { bannersId, redirectionUrl, title, redirectTo } = req.body;

      // Validate required fields
      if (!redirectionUrl) {
        return res.status(400).json({
          success: false,
          message: "Please provide a banners.",
        });
      }

      const existingBanners = await Banners.findById(bannersId);

      if (!existingBanners) {
        return res
          .status(404)
          .json({ success: false, message: "Banners not found." });
      }

      existingBanners.redirectionUrl = redirectionUrl;
      existingBanners.title = title;
      existingBanners.redirectTo = redirectTo;

      // Update image path if a new image is uploaded
      if (req.files["bannerImage"]) {
        const imagePath = req.files["bannerImage"][0].path.replace(
          /^.*bannersImage[\\/]/,
          "bannersImage/"
        );
        existingBanners.bannerImage = imagePath;
      }

      await existingBanners.save();

      res.status(200).json({
        success: true,
        message: "Banners updated successfully.",
        data: existingBanners,
      });
    } catch (error) {
      console.error("Error updating Banners:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Banners.",
        error: error.message,
      });
    }
  });
};

//delete skill
const deleteBanners = async function (req, res) {
  try {
    const bannersId = req.body.bannersId;

    if (!mongoose.Types.ObjectId.isValid(bannersId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Banners ID" });
    }

    const deletedBanners = await Banners.findByIdAndDelete(bannersId);

    if (!deletedBanners) {
      return res
        .status(404)
        .json({ success: false, message: "Banners not found." });
    }

    res.status(200).json({
      success: true,
      message: "Banners deleted successfully",
      deletedBanners,
    });
  } catch (error) {
    console.error("Error deleting Banners:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Banners",
      error: error.message,
    });
  }
};

// send notification from admin

const sendNotificationFromAdmin = async (req, res) => {
  try {
    // Upload images using multer
    uploadNotificationImages(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      // Handle the uploaded image and continue to the notification sending process
      await sendNotification(req, res);
    });
  } catch (error) {
    console.error("Error handling file upload:", error);
    res.status(500).json({
      success: false,
      message: "Error handling file upload",
      error: error.message,
    });
  }
};

// Function to send notifications to astrologers and customers
const sendNotification = async (req, res) => {
  try {
    const { astrologerIds, customerIds, title, description } = req.body;
    const image = req?.files["image"]
      ? req?.files["image"][0]?.path.replace(
        /^.*notificationImage[\\/]/,
        "notificationImage/"
      )
      : "";

    if (
      (!astrologerIds || astrologerIds.length === 0) &&
      (!customerIds || customerIds.length === 0)
    ) {
      return res.status(400).json({
        success: false,
        message: "No astrologer or customer IDs provided",
      });
    }

    const astrologers = await Astrologer.find({ _id: { $in: astrologerIds } });
    const astroTokens = astrologers
      .map((astrologer) => astrologer.fcmToken)
      .filter(Boolean);

    const customers = await Customers.find({ _id: { $in: customerIds } });
    const customerTokens = customers
      .map((customer) => customer.fcmToken)
      .filter(Boolean);

    const newNotification = new Notification({
      title: title,
      description: description || "New notification from admin",
      image: image,
      astrologerIds: astrologerIds,
      customerIds: customerIds,
    });

    await newNotification.save();

    res.status(200).json({
      success: true,
      message: "Notifications sent successfully and stored in the database",
      astroTokens,
      customerTokens,
      data: newNotification,
    });
  } catch (error) {
    console.error("Failed to send notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notifications",
      error: error.message,
    });
  }
};

// get list of notification
const getAllNotifications = async function (req, res) {
  try {
    const allNotifications = await Notification.find()
      .populate("astrologerIds", "astrologerName")
      .populate("customerIds", "customerName");

    if (!allNotifications) {
      return res
        .status(404)
        .json({ success: false, message: "No Notifications found." });
    }

    res.status(200).json({ success: true, allNotifications: allNotifications });
  } catch (error) {
    console.error("Error fetching all Notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Notification",
      error: error.message,
    });
  }
};

// first recharge offer
const firstRechargeOffer = async function (req, res) {
  try {
    const {
      first_recharge_plan_amount,
      first_recharge_plan_extra_percent,
      first_recharge_status,
    } = req.body;

    const newFirstRechargeOffer = new FirstRechargeOffer({
      first_recharge_plan_amount,
      first_recharge_plan_extra_percent,
      first_recharge_status,
    });

    const savedFirstRechargeOffer = await newFirstRechargeOffer.save();

    res.status(201).json({
      success: true,
      message: "First Recharge plan added successfully",
      FirstRechargeOffer: savedFirstRechargeOffer,
    });
  } catch (error) {
    res
      .status(500)
      .json({ error: "Could not add recharge plan", details: error });
  }
};

// update recharge update plan
const updateFirstRechargeOffer = async function (req, res) {
  try {
    const {
      firstRechargeOfferId,
      first_recharge_plan_amount,
      first_recharge_plan_extra_percent,
      first_recharge_status,
    } = req.body;

    // const firstRechargeOfferId = req.body.firstRechargeOfferId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID
    const firstRechargeOffer = await FirstRechargeOffer.findById(
      firstRechargeOfferId
    );

    if (!firstRechargeOffer) {
      return res.status(404).json({ error: "Recharge plan not found" });
    }

    // Update the recharge plan fields
    firstRechargeOffer.first_recharge_plan_amount = first_recharge_plan_amount;
    firstRechargeOffer.first_recharge_plan_extra_percent =
      first_recharge_plan_extra_percent;
    firstRechargeOffer.first_recharge_status = first_recharge_status;

    const updatedFirstRechargeOffer = await firstRechargeOffer.save();

    res.status(200).json({
      success: true,
      message: "first Recharge plan updated successfully",
      updatedFirstRechargeOffer: updatedFirstRechargeOffer,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not update first recharge plan",
      details: error,
    });
  }
};

const getAllFirstRechargeOffer = async function (req, res) {
  try {
    const allFirstRechargeOffer = await FirstRechargeOffer.find();

    if (!allFirstRechargeOffer) {
      return res
        .status(404)
        .json({ success: false, message: "No FirstRechargeOffer found." });
    }

    res
      .status(200)
      .json({ success: true, allFirstRechargeOffer: allFirstRechargeOffer });
  } catch (error) {
    console.error("Error fetching all First Recharge Offer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all First Recharge Offer",
      error: error.message,
    });
  }
};

const deleteFirstRechargeOffer = async function (req, res) {
  try {
    const firstRechargeId = req.body.firstRechargeId; // Assuming the ID is passed as a parameter

    // Find the recharge plan by ID and remove it
    const deletedItem = await FirstRechargeOffer.findByIdAndDelete(
      firstRechargeId
    );

    if (!deletedItem) {
      return res.status(404).json({ error: " First Recharge plan not found" });
    }

    res.status(200).json({
      success: true,
      message: "First Recharge plan deleted successfully",
      // rechargePlan: deletedRechargePlan,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      error: "Could not delete recharge plan",
      details: error,
    });
  }
};


// ban and unban customer
const changeBannedStatus = async function (req, res) {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide customerId.",
      });
    }

    const customers = await Customers.findById(customerId);

    if (!customers) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Toggle the isOnline status using the NOT operator (!)
    customers.banned_status = !customers.banned_status;
    await customers.save();

    const updated_customers = await Customers.findById(customerId);

    const statusText = updated_customers.banned_status ? "Banned" : "Unbanned";
    res.status(200).json({
      success: true,
      message: `Customer banned status updated. Now ${statusText}.`,
      data: updated_customers,
    });
  } catch (error) {
    console.error("Error toggling customers banned status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle customers banned status.",
      error: error.message,
    });
  }
};

// online Offline Customer
const setCustomerOnline = async function (req, res) {
  try {
    const { customerId } = req.body;

    if (!customerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId.",
      });
    }

    const customers = await Customers.findById(customerId);

    if (!customers) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    // Toggle the isOnline status using the NOT operator (!)
    customers.isOnline = !customers.isOnline;
    await customers.save();

    const statusText = customers.isOnline ? "online" : "offline";
    res.status(200).json({
      success: true,
      message: `Customer status updated. Now ${statusText}.`,
      data: customers,
    });
  } catch (error) {
    console.error("Error toggling customers status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle customers status.",
      error: error.message,
    });
  }
};

// update customer details

const updateCustomerdata = async function (req, res) {
  uploadCustomerImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { customerId, phoneNumber, customerName, email } = req.body; // Destructure customerId from req.body

      const existingCustomer = await Customers.findById(customerId);

      if (!existingCustomer) {
        return res
          .status(404)
          .json({ success: false, message: "Customer not found." });
      }

      // Update existingCustomer properties with req.body values

      if (existingCustomer.phoneNumber != phoneNumber) {
        const isExistsByNumber = await Customers.find({
          phoneNumber: phoneNumber,
        });
        if (isExistsByNumber.length != 0) {
          res.status(200).json({
            success: false,
            message: "This phone number already exits.",
            isExistsByNumber,
          });
        } else {
          existingCustomer.phoneNumber =
            phoneNumber || existingCustomer.phoneNumber;
        }
      }

      if (existingCustomer.email != email) {
        const isExistsByEmail = await Customers.find({ email: email });
        if (isExistsByEmail.length != 0) {
          res.status(200).json({
            success: false,
            message: "This email address already exits.",
          });
        } else {
          existingCustomer.email = email || existingCustomer.email;
        }
      }

      existingCustomer.customerName =
        customerName || existingCustomer.customerName;

      if (req.files["image"]) {
        const imagePath = req.files["image"][0].path.replace(
          /^.*customerImage[\\/]/,
          "customerImage/"
        );
        existingCustomer.image = imagePath; // Corrected variable name to existingCustomer.image
      }

      await existingCustomer.save();

      res.status(200).json({
        success: true,
        message: "Customer updated successfully.",
        data: existingCustomer,
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Customer.",
        error: error.message,
      });
    }
  });
};

// Recharge wallet of customer

const rechargeCustomerWallet = async function (req, res) {
  try {
    const { customerId, amount, payment_method, transactionId, type } =
      req.body;

    // Find the customer by ID
    const customer = await Customers.findById(customerId);

    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    // Create a recharge transaction
    const rechargeTransaction = new RechargeWallet({
      customer: customerId,
      amount,
      payment_method,
      transactionId,
      type, // Include the 'type' in the recharge transaction
    });

    // Save recharge transaction to the RechargeWallet table
    await rechargeTransaction.save();

    // Update customer's wallet balance based on type
    if (type === "credit") {
      customer.wallet_balance += parseFloat(amount); // Add to wallet balance
    } else if (type === "debit") {
      if (parseFloat(amount) > customer.wallet_balance) {
        return res
          .status(400)
          .json({ success: false, message: "Insufficient balance." });
      }
      customer.wallet_balance -= parseFloat(amount); // Deduct from wallet balance
    }

    // Save the updated wallet balance
    await customer.save();

    res.status(200).json({
      success: true,
      message: "Wallet transaction processed successfully.",
      data: rechargeTransaction,
    });
  } catch (error) {
    console.error("Error processing wallet transaction:", error);
    res.status(500).json({
      success: false,
      message: "Failed to process wallet transaction.",
      error: error.message,
    });
  }
};

// get customers payment list
const getCustomersPayment = async function (req, res) {
  try {
    const { customerId } = req.body;

    const existingCustomer = await Customers.findOne({ _id: customerId });

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    // Fetch payments associated with the provided customerId
    const customersPaymentDetails = await RechargeWallet.find({
      customer: customerId,
    });

    res.status(200).json({
      success: true,
      message: "Customer payment history:",
      data: customersPaymentDetails,
    });
  } catch (error) {
    console.error("Error fetching Payment history of customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch payment history of customer",
      error: error.message,
    });
  }
};

// delete customer
const deleteCustomer = async function (req, res) {
  try {
    const customerId = req.body.customerId; // Assuming the key for skillId in the body is 'skillId'

    if (!customerId || !mongoose.Types.ObjectId.isValid(customerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid Customer ID" });
    }

    const deletedCustomer = await Customers.findByIdAndDelete(customerId);

    if (!customerId) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    res.status(200).json({
      success: true,
      message: "Customer deleted successfully",
      deletedCustomer,
    });
  } catch (error) {
    console.error("Error deleting customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete customer",
      error: error.message,
    });
  }
};

//  order history

// const customerOrderHistory = async function(req, res){
//   try {
//     const { customerId } = req.body;

//     // Find chat history associated with the provided customerId
//     const chatHistory = await ChatHistory.find({ customerId });

//     // Find call history associated with the provided customerId
//     const callHistory = await CallHistory.find({ customerId });

//     res.status(200).json({
//       success: true,
//       message: 'Customer history retrieved successfully.',
//       chatHistory,
//       callHistory
//     });
//   } catch (error) {
//     console.error('Error fetching customer history:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to fetch customer history.',
//       error: error.message
//     });
//   }
// };

const customerOrderHistory = async function (req, res) {
  try {
    const { customerId } = req.body;

    // Find chat history associated with the provided customerId
    let chatHistory = [];
    try {
      const chatRecords = await ChatHistory.find({ customerId }).populate(
        "astrologerId",
        "astrologerName"
      ); // Set a timeout limit (5 seconds)
      chatHistory = chatRecords.filter(
        (record) => record.durationInSeconds !== ""
      );
    } catch (chatError) {
      console.error("Chat history query timed out:", chatError);
    }

    // Find call history associated with the provided customerId
    let callHistory = [];
    try {
      const callRecords = await CallHistory.find({ customerId }).populate(
        "astrologerId",
        "astrologerName"
      ); // Set a timeout limit (5 seconds)
      callHistory = callRecords.filter(
        (record) => record.durationInSeconds !== ""
      );
    } catch (callError) {
      console.error("Call history query timed out:", callError);
    }

    res.status(200).json({
      success: true,
      message: "Customer history retrieved successfully.",
      chatHistory,
      callHistory,
    });
  } catch (error) {
    console.error("Error fetching customer history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch customer history.",
      error: error.message,
    });
  }
};

// add app review
const addAppReview = async function (req, res) {
  try {
    const { app_ratings, app_comments, customerId } = req.body;

    const existingCustomer = await Customers.findOne({ _id: customerId });

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    const newAppReview = new AppReview({
      customer: customerId,
      app_ratings,
      app_comments,
    });
    await newAppReview.save();

    res.status(201).json({
      success: true,
      message: "App review added successfully",
      appReview: newAppReview,
    });
  } catch (error) {
    console.error("Error adding review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add review",
      error: error.message,
    });
  }
};

// verify app review
const verifyAppReview = async function (req, res) {
  try {
    const { appReview_id } = req.body;

    const existingAppReview = await AppReview.findOne({ _id: appReview_id });

    if (!existingAppReview) {
      return res
        .status(404)
        .json({ success: false, message: "App review not found." });
    }

    existingAppReview.is_verified = true;
    await existingAppReview.save();

    res.status(200).json({
      success: true,
      message: "Review verification updated successfully",
      appReview: existingAppReview,
    });
  } catch (error) {
    console.error("Error updating review verification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update review verification",
      error: error.message,
    });
  }
};

// get all app review
const getAllAppReview = async function (req, res) {
  try {
    const appReview = await AppReview.find().populate(
      "customer",
      "customerName"
    ); // Populate the astrologer field with astrologerName

    res.status(200).json({ success: true, appReview });
  } catch (error) {
    console.error("Error fetching review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch review",
      error: error.message,
    });
  }
};

// delete app review
const deleteAppReview = async function (req, res) {
  try {
    const appReviewId = req.body.appReviewId; // Assuming the ID is passed as a parameter

    if (!mongoose.Types.ObjectId.isValid(appReviewId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid App Review ID" });
    }

    const deletedAppReview = await AppReview.findByIdAndDelete(appReviewId);

    if (!deletedAppReview) {
      return res
        .status(404)
        .json({ success: false, message: "app review not found." });
    }

    res.status(200).json({
      success: true,
      message: "App Review deleted successfully",
      deletedAppReview,
    });
  } catch (error) {
    console.error("Error deleting app Review:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete App Review",
      error: error.message,
    });
  }
};

const sendCustomerNotification = async function (req, res) {
  uploadNotificationImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { customerIds, title, description, redirectTo } = req.body;
      let imagePath = "";
      if (req.files["image"]) {
        imagePath = req.files["image"][0].path.replace(
          /^.*notificationImage[\\/]/,
          "notificationImage/"
        );
        // Corrected variable name to existingCustomer.image
      }

      if (!customerIds || customerIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No astrologer or customer IDs provided",
        });
      }

      // const customerID = JSON.parse(customerIds)

      const customers = await Customers.find({ _id: { $in: customerIds } });
      if (customers) {
        let totalCustomer = customers.length;
        const customerData = customerIds.map((item) => {
          return { customerId: item, notificationRead: false };
        });

        const newNotification = new CustomerNotification({
          title: title,
          description: description || "New notification from admin",
          image: imagePath,
          customerIds: customerData,
        });

        await newNotification.save();

        for (let i = 0; i < totalCustomer; i++) {
          const deviceToken = customers[i]?.fcmToken;
          if (deviceToken) {
            const notification = {
              title: title,
              body: description,
            };
            const data = {
              type: redirectTo,
            };

            await notificationService.sendNotification(
              deviceToken,
              notification,
              data
            );
          }
        }

        res.status(200).json({
          success: true,
          message: "Notifications sent successfully and stored in the database",
        });
      }

      res.status(200).json({
        success: true,
        message: "Customer updated successfully.",
        data: existingCustomer,
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Customer.",
        error: error.message,
      });
    }
  });
};

const getCustomerNotification = async function (req, res) {
  try {
    const notifications = await CustomerNotification.find();

    if (notifications) {
      return res.status(200).json({
        success: true,
        notifications,
      });
    }

    return res.status(200).json({
      success: true,
      notifications: [],
    });
  } catch (error) {
    console.error("Failed to get notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get notifications",
      error: error.message,
    });
  }
};

const getChatHistory = async function (req, res) {
  try {
    const history = await ChatHistory.find();

    const enhancedHistory = await Promise.all(
      history.map(async (item) => {
        const { customerId, astrologerId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "name email customerName"
        );
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName"
        );

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          astrologerDetails,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          chatPrice: item.chatPrice,
          totalChatPrice: item.totalChatPrice,
          status: item?.status,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          __v: item.__v,
        };
      })
    );

    if (enhancedHistory) {
      return res.status(200).json({
        success: true,
        history: enhancedHistory,
      });
    }

    return res.status(200).json({
      success: true,
      history: [],
    });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

const sendAstrologerNotification = async function (req, res) {
  uploadNotificationImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    try {
      const { astrologerIds, title, description, redirectTo } = req.body;
      let imagePath = "";
      if (req.files["image"]) {
        imagePath = req.files["image"][0].path.replace(
          /^.*notificationImage[\\/]/,
          "notificationImage/"
        );
        // Corrected variable name to existingCustomer.image
      }

      if (!astrologerIds || astrologerIds.length === 0) {
        return res.status(400).json({
          success: false,
          message: "No astrologer or customer IDs provided",
        });
      }

      const astrologers = await Astrologer.find({
        _id: { $in: astrologerIds },
      });
      if (astrologers) {
        let totalAstrologer = astrologers.length;
        const astrologerData = astrologerIds.map((item) => {
          return { astrologerId: item, notificationRead: false };
        });

        const newNotification = new AstrologerNotification({
          title: title,
          description: description || "New notification from admin",
          image: imagePath,
          astrologerIds: astrologerData,
        });

        await newNotification.save();

        for (let i = 0; i < totalAstrologer; i++) {
          const deviceToken = astrologers[i]?.fcmToken;
          if (deviceToken) {
            const notification = {
              title: title,
              body: description,
            };
            const data = {
              type: redirectTo,
            };

            await notificationService.sendNotification(
              deviceToken,
              notification,
              data
            );
          }
        }

        res.status(200).json({
          success: true,
          message: "Notifications sent successfully and stored in the database",
        });
      }
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update Customer.",
        error: error.message,
      });
    }
  });
};

const getAstrologerNotification = async function (req, res) {
  try {
    const notifications = await AstrologerNotification.find();

    if (notifications) {
      return res.status(200).json({
        success: true,
        notifications,
      });
    }

    return res.status(200).json({
      success: true,
      notifications: [],
    });
  } catch (error) {
    console.error("Failed to get notifications:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get notifications",
      error: error.message,
    });
  }
};

const getCallHistory = async function (req, res) {
  try {
    const history = await CallHistory.find();

    const enhancedHistory = await Promise.all(
      history.map(async (item) => {
        const { customerId, astrologerId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "name email customerName"
        );
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName"
        );

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          astrologerDetails,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          callPrice: item.callPrice,
          totalCallPrice: item.totalCallPrice,
          status: item.status,
          transactionId: item.transactionId,
          callId: item.callId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          __v: item.__v,
        };
      })
    );

    if (enhancedHistory) {
      return res.status(200).json({
        success: true,
        history: enhancedHistory,
      });
    }

    return res.status(200).json({
      success: true,
      history: [],
    });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

const getAdminEarnigHistory = async function (req, res) {
  try {
    const history = await AdminEarning.find();

    const enhancedHistory = await Promise.all(
      history.map(async (item) => {
        const { customerId, astrologerId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "name email customerName"
        );
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName"
        );

        return {
          _id: item._id,
          type: item.type,
          customerId,
          astrologerId,
          customerDetails,
          astrologerDetails,
          startTime: item.startTime,
          endTime: item.endTime,
          duration: item.duration,
          adminPrice: item.adminPrice,
          historyId: item.historyId,
          totalPrice: item.totalPrice,
          partnerPrice: item.partnerPrice,
          transactionId: item.transactionId,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          __v: item.__v,
        };
      })
    );

    if (enhancedHistory) {
      return res.status(200).json({
        success: true,
        history: enhancedHistory,
      });
    }

    return res.status(200).json({
      success: true,
      history: [],
    });
  } catch (error) {
    console.error("Failed to get chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get chat history",
      error: error.message,
    });
  }
};

const getDashboard = async function (req, res) {
  try {
    const chatHistory = await ChatHistory.find();
    const callHistory = await CallHistory.find();
    const customers = await Customers.find();
    const astrologers = await Astrologer.find();

    let total_chat = 0;
    let total_call = 0;
    let total_customers = 0;
    let total_astrologers = 0;

    if (!!chatHistory) {
      total_chat = chatHistory.length;
    }

    if (!!callHistory) {
      total_call = callHistory.length;
    }

    if (!!customers) {
      total_customers = customers.length;
    }

    if (!!astrologers) {
      total_astrologers = astrologers.length;
    }

    return res.status(200).json({
      success: true,
      dashboard: {
        total_chat,
        total_call,
        total_customers,
        total_astrologers,
      },
    });
  } catch (error) {
    console.error("Failed to get dashboard:", error);
    res.status(500).json({
      success: false,
      message: "Failed to get dashboard",
      error: error.message,
    });
  }
};

const createLanguage = async function (req, res) {
  try {
    const { languageName } = req.body;
    const languageData = await Language.findOne({ languageName });
    if (!!languageData) {
      res.status(200).json({
        success: false,
        message: "This Language already exits.",
      });
    } else {
      const newLanguage = new Language({ languageName });
      await newLanguage.save();
      res.status(200).json({
        success: true,
        message: "New Language Added!",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const getLanguage = async function (req, res) {
  try {
    const languageData = await Language.find();

    res.status(200).json({
      success: true,
      languageData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const updateLanguage = async function (req, res) {
  try {
    const { langId, languageName } = req.body;

    const languageData = await Language.findById(langId);

    if (!!languageName) {
      languageData.languageName = languageName;
      await languageData.save();
      res.status(200).json({
        success: true,
        message: "Language Updated!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "Please enter your language name",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const deleteLanguage = async function (req, res) {
  try {
    const { langId } = req.body;

    const languageData = await Language.findByIdAndDelete(langId);

    const astrologerData = await Astrologer.find({
      language: { $in: [languageData?.languageName] },
    });

    if (astrologerData) {
      for (const doc of astrologerData) {
        await Astrologer.updateOne(
          { _id: doc._id },
          { $pull: { language: languageData?.languageName } }
        );
      }
    }

    if (!!languageData) {
      res.status(200).json({
        success: true,
        message: "Language Deleted!",
      });
    } else {
      res.status(200).json({
        success: false,
        message: "This language not found",
      });
    }
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const getWalletPayments = async function (req, res) {
  try {
    const payementData = await RechargeWallet.find().populate(
      "customer",
      "customerName"
    );

    res.status(200).json({
      success: true,
      payementData,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const createQualifications = function (req, res) {
  uploadQualificationImage(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }
    try {
      const {
        astrologerId,
        higherQualification,
        qualificationType,
        instituteName,
      } = req.body;
      if (
        !astrologerId ||
        !higherQualification ||
        !qualificationType ||
        !instituteName ||
        !req.files ||
        !req.files["documents"] ||
        req.files["documents"].length === 0
      ) {
        return res.status(200).json({
          success: false,
          message: "All fields are required to create a qualification",
        });
      }

      let imagePath = "";

      if (req.files["documents"]) {
        imagePath = req.files["documents"][0].path.replace(
          /^.*qualificationImage[\\/]/,
          "uploads/qualificationImage/"
        );
      }

      const newQualification = new Qualifications({
        astrologerId,
        higherQualification,
        qualificationType,
        instituteName,
        documents: imagePath,
      });

      await newQualification.save();

      res.status(200).json({
        success: true,
        message: "New qualification added",
      });
    } catch (error) {
      console.error("Error updating Customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create qualifications.",
        error: error.message,
      });
    }
  });
};

const getQualifications = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(200).json({
        success: false,
        message: "astrologerId fields are required to get a qualification",
      });
    }

    const qualifications = await Qualifications.find({ astrologerId });

    res.status(200).json({
      success: true,
      message: "success",
      qualifications,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

const updateQualifications = async function (req, res) {
  try {
    uploadQualificationImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      try {
        const {
          qualificationId,
          higherQualification,
          qualificationType,
          instituteName,
        } = req.body;
        if (
          !qualificationId ||
          !higherQualification ||
          !qualificationType ||
          !instituteName
        ) {
          return res.status(200).json({
            success: false,
            message: "All fields are required to create a qualification",
          });
        }

        let imagePath = "";
        const documentData = req.files["documents"] ?? null;
        if (!!documentData) {
          imagePath = req.files["documents"][0].path.replace(
            /^.*qualificationImage[\\/]/,
            "uploads/qualificationImage/"
          );
        }

        const qualification = await Qualifications.findById(qualificationId);

        if (!!qualification) {
          (qualification.higherQualification = higherQualification),
            (qualification.qualificationType = qualificationType),
            (qualification.instituteName = instituteName);
          if (!!imagePath) {
            qualification.documents = imagePath;
          }
        }

        await qualification.save();

        res.status(200).json({
          success: true,
          message: "Qualifiction Updated...",
        });
      } catch (error) {
        console.error("Error updating Customer:", error);
        res.status(500).json({
          success: false,
          message: "Failed to create qualifications.",
          error: error.message,
        });
      }
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to update qualification",
      error: error.message,
    });
  }
};

const createLiveStreaming = async function (req, res) {
  try {
    const { astrologerId, voiceCallPrice, vedioCallPrice, sessionTime } =
      req.body;

    if (!astrologerId || !voiceCallPrice || !vedioCallPrice || !sessionTime) {
      return res.status(200).json({
        success: false,
        message: "All filed mendatory",
      });
    }

    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res.status(200).json({
        success: false,
        message: "Wrong Astrologer",
      });
    }

    const count = await LiveStreaming.countDocuments();

    const liveId = `NAMO${count}`;

    const liveStreaming = new LiveStreaming({
      astrologerId,
      voiceCallPrice,
      vedioCallPrice,
      sessionTime,
      liveId,
      status: "Live",
      startTime: new Date(),
    });

    await liveStreaming.save();

    return res.status(200).json({
      success: true,
      message: "Live Streaming Created",
      liveId,
    });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to langauge",
      error: error.message,
    });
  }
};

//======================== Pooja Category ============================

const fortuneStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/poojaCategory/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
    cb(null, uniqueFilename); // Set unique filename with original extension
  },
});



const uploadImage = multer({ storage: fortuneStorage }).single("image");

const addPoojaCategory = async function (req, res) {
  try {
    uploadImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { title, status } = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: "Title is required" });
      }

      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: "Status is required" });
      }

      const imagePath = req.file ? req.file.path : ""; // If image uploaded, get its path

      const newStore = new PoojaCategory({
        title,
        image: imagePath, // Assign the image path to the 'image' field
        status: status,
      });

      await newStore.save();

      return res.status(200).json({
        success: true,
        message: "Pooja Category added successfully",
        newStore,
      });
    });
  } catch (error) {
    console.error("Error adding pooja category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add pooja category",
      error: error.message,
    });
  }
};

const PoojaCategoryList = async function (req, res) {
  try {
    const allStore = await PoojaCategory.find();

    res.status(200).json({ success: true, allStore });
  } catch (error) {
    console.error("Error fetching  Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch  Blog",
      error: error.message,
    });
  }
};

const updatePoojaCategory = async function (req, res) {
  try {
    uploadImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { storeId, title } = req.body;
      const imagePath = req.file ? req.file.path : "";

      const storeToUpdate = await PoojaCategory.findById(storeId);

      if (!storeToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Store not found." });
      }

      // Update store properties
      storeToUpdate.title = title;
      storeToUpdate.image = imagePath;

      await storeToUpdate.save();

      return res.status(200).json({
        success: true,
        message: "Store updated successfully",
        updatedPoojaCategory: storeToUpdate,
      });
    });
  } catch (error) {
    console.error("Error updating store:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update store",
      error: error.message,
    });
  }
};

const deletePoojaCategory = async function (req, res) {
  try {
    const storeId = req.body.storeId;
    const deletedStore = await PoojaCategory.findByIdAndUpdate(
      storeId, // Use storeId directly
      { $set: { deleted: true } },
      { new: true } // Return the updated document
    );

    if (!deletedStore) {
      return res
        .status(404)
        .json({ success: false, message: "Store not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Fortune Store deleted successfully" });
  } catch (error) {
    console.error("Error deleting store:", error);
    res.status(500).json({
      success: false,
      message: "Failed to soft delete store",
      error: error.message,
    });
  }
};

const updatePoojaCategoryStatus = async function (req, res) {
  try {
    const { poojaCategoryId, status } = req.body;

    if (!poojaCategoryId || !status) {
      return res.status(400).json({ success: false, message: "Invalid request. poojaId and status are required." });
    }

    const poojaToUpdate = await PoojaCategory.findById(poojaCategoryId);

    if (!poojaToUpdate) {
      return res.status(404).json({ success: false, message: "Pooja category not found." });
    }

    // Update status field
    poojaToUpdate.status = status;

    await poojaToUpdate.save();

    return res.status(200).json({
      success: true,
      message: "Pooja status updated successfully",
      updatedPooja: poojaToUpdate,
    });
  } catch (error) {
    console.error("Error updating pooja status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update pooja status",
      error: error.message,
    });
  }
};

//======================== Pooja ============================

const poojaStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/pooja/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});



const uploadPoojaImage = multer({ storage: poojaStorage }).single("image");

const addPooja = async function (req, res) {
  try {
    uploadPoojaImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { title, description, price, status } = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: "Title is required" });
      }

      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: "Status is required" });
      }

      const imagePath = req.file ? req.file.path : ""; // If image uploaded, get its path

      const newPooja = new Pooja({
        title,
        description,
        price,
        image: imagePath, // Assign the image path to the 'image' field
        status: status,
      });

      await newPooja.save();

      return res.status(200).json({
        success: true,
        message: "Pooja added successfully",
        newPooja,
      });
    });
  } catch (error) {
    console.error("Error adding Pooja:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add Pooja",
      error: error.message,
    });
  }
};

const PoojaList = async function (req, res) {
  try {
    const allPooja = await Pooja.find();

    res.status(200).json({ success: true, allPooja });
  } catch (error) {
    console.error("Error fetching  Blog:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch  Blog",
      error: error.message,
    });
  }
};

const updatePooja = async function (req, res) {
  try {
    uploadPoojaImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { poojaId, title, description, poojaCategoryId, price, status } = req.body;
      const imagePath = req.file ? req.file.path : "";

      if (!poojaId) {
        return res
          .status(400)
          .json({ success: false, message: "pooja id not found" });
      }

      const poojaToUpdate = await Pooja.findById(poojaId);

      if (!poojaToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Pooja not found." });
      }

      // Update store properties
      poojaToUpdate.title = title;
      poojaToUpdate.image = imagePath;
      poojaToUpdate.description = description;
      poojaToUpdate.price = price;
      poojaToUpdate.status = status;
      poojaToUpdate.status = status;
      poojaToUpdate.poojaCategoryId = poojaCategoryId;


      await poojaToUpdate.save();
      await poojaToUpdate.save();

      return res.status(200).json({
        success: true,
        message: "Pooja updated successfully",
        updatedPooja: poojaToUpdate,
      });
    });
  } catch (error) {
    console.error("Error updating pooja:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update pooja",
      error: error.message,
    });
  }
};

const deletePooja = async function (req, res) {
  try {
    const poojaId = req.body.poojaId;
    const deletedPooja = await Pooja.findByIdAndUpdate(
      poojaId,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!deletedPooja) {
      return res
        .status(404)
        .json({ success: false, message: "Pooja not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Pooja deleted successfully" });
  } catch (error) {
    console.error("Error deleting pooja:", error);
    res.status(500).json({
      success: false,
      message: "Failed to soft delete pooja",
      error: error.message,
    });
  }
};

const updatePoojaStatus = async function (req, res) {
  try {
    const { poojaId, status } = req.body;

    if (!poojaId || !status) {
      return res.status(400).json({ success: false, message: "Invalid request. poojaId and status are required." });
    }

    const poojaToUpdate = await Pooja.findById(poojaId);

    if (!poojaToUpdate) {
      return res.status(404).json({ success: false, message: "Pooja not found." });
    }

    // Update status field
    poojaToUpdate.status = status;

    await poojaToUpdate.save();

    return res.status(200).json({
      success: true,
      message: "Pooja status updated successfully",
      updatedPooja: poojaToUpdate,
    });
  } catch (error) {
    console.error("Error updating pooja status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update pooja status",
      error: error.message,
    });
  }
};


//======================== Product Category ============================

const productCategoryStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/productCategory/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
    cb(null, uniqueFilename); // Set unique filename with original extension
  },
});


const uploadProductCategoryImage = multer({ storage: productCategoryStorage }).single("image");

const addProductCategory = async function (req, res) {
  try {
    uploadProductCategoryImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { title, status } = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: "Title is required" });
      }

      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: "Status is required" });
      }

      const imagePath = req.file ? req.file.path : ""; // If image uploaded, get its path

      const newProductCategory = new ProductCategory({
        title,
        image: imagePath, // Assign the image path to the 'image' field
        status: status,
      });

      await newProductCategory.save();

      return res.status(200).json({
        success: true,
        message: "Product Category added successfully",
        newProductCategory,
      });
    });
  } catch (error) {
    console.error("Error adding product category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add product category",
      error: error.message,
    });
  }
};

const ProductCategoryList = async function (req, res) {
  try {
    const allProdcutCategory = await ProductCategory.find();

    res.status(200).json({ success: true, allProdcutCategory });
  } catch (error) {
    console.error("Error fetching  Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch  Data",
      error: error.message,
    });
  }
};

const updateProductCategory = async function (req, res) {
  try {
    uploadProductCategoryImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading file",
          error: err,
        });
      }

      const { productCategoryId, title } = req.body;
      const imagePath = req.file ? req.file.path : "";

      const storeToUpdate = await ProductCategory.findById(productCategoryId);

      if (!storeToUpdate) {
        return res
          .status(404)
          .json({ success: false, message: "Product category not found." });
      }

      // Update store properties
      storeToUpdate.title = title;
      storeToUpdate.image = imagePath;

      await storeToUpdate.save();

      return res.status(200).json({
        success: true,
        message: "Product category updated successfully",
        updatedProductCategory: storeToUpdate,
      });
    });
  } catch (error) {
    console.error("Error updating product category:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update data",
      error: error.message,
    });
  }
};

const deleteProductCategory = async function (req, res) {
  try {
    const productCategoryId = req.body.productCategoryId;
    const deleteProductCategory = await ProductCategory.findByIdAndUpdate(
      productCategoryId,
      { $set: { deleted: true } },
      { new: true }
    );

    if (!deleteProductCategory) {
      return res
        .status(404)
        .json({ success: false, message: "Product category not found." });
    }

    res
      .status(200)
      .json({ success: true, message: "Product category deleted successfully" });
  } catch (error) {
    console.error("Error deleting data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to soft delete product category",
      error: error.message,
    });
  }
};

const updateProductCategoryStatus = async function (req, res) {
  try {
    const { productCategoryId, status } = req.body;

    if (!productCategoryId || !status) {
      return res.status(400).json({ success: false, message: "Invalid request. product category Id and status are required." });
    }

    const productToUpdate = await ProductCategory.findById(productCategoryId);

    if (!productToUpdate) {
      return res.status(404).json({ success: false, message: "Pooja category not found." });
    }

    // Update status field
    productToUpdate.status = status;

    await productToUpdate.save();

    return res.status(200).json({
      success: true,
      message: "Pooja status updated successfully",
      updatedProduct: productToUpdate,
    });
  } catch (error) {
    console.error("Error updating pooja status:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to update pooja status",
      error: error.message,
    });
  }
};

//======================== Product ============================

const productStorage = multer.diskStorage({
  destination: function (req, file, cb) {
    cb(null, "uploads/products/"); // Specify the destination folder
  },
  filename: function (req, file, cb) {
    const uniqueFilename = `${uuidv4()}${getFileExtension(file.originalname)}`;
    cb(null, uniqueFilename);
  },
});



const uploadProductImage = multer({
  storage: productStorage,
  fileFilter: function (req, file, cb) {
    // Allow only image files
    if (!file.originalname.match(/\.(jpg|jpeg|png|gif)$/)) {
      return cb(new Error('Only image files are allowed!'), false);
    }
    cb(null, true);
  }
}).single("image");

const addProduct = async function (req, res) {
  try {
    uploadProductImage(req, res, async function (err) {
      if (err instanceof multer.MulterError) {
        // Multer error handling
        return res
          .status(500)
          .json({ success: false, message: "Multer error", error: err });
      } else if (err) {
        // Other errors during file upload
        return res.status(500).json({
          success: false,
          message: "Error uploading main image",
          error: err,
        });
      }

      const { productCategory, productCategoryId, title, description, price, discount, status } = req.body;

      if (!title) {
        return res
          .status(400)
          .json({ success: false, message: "Title is required" });
      }

      if (!status) {
        return res
          .status(400)
          .json({ success: false, message: "Status is required" });
      }

      let discountedPrice = price;

      if (discount && discount > 0) {
        discountedPrice = price - (price * discount) / 100;
      }

      const imagePaths = req.file ? req.file.path : "";

      const newProduct = new Product({
        productCategory,
        title,
        description,
        productCategoryId,
        price,
        discount,
        discountedPrice,
        image: imagePaths,
        status,
      });

      await newProduct.save();

      return res.status(200).json({
        success: true,
        message: "Product added successfully",
        newProduct,
      });
    });
  } catch (error) {
    console.error("Error adding Product:", error);
    return res.status(500).json({
      success: false,
      message: "Failed to add Product",
      error: error.message,
    });
  }
};

const ProductList = async function (req, res) {
  try {
    const allProducts = await Product.find();

    res.status(200).json({ success: true, allProducts });
  } catch (error) {
    console.error("Error fetching  Products:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch  Products",
      error: error.message,
    });
  }
};

// const updateProduct = async function (req, res) {
//   try {
//     uploadProductImage(req, res, async function (err) {
//       if (err instanceof multer.MulterError) {
//         // Multer error handling
//         return res
//           .status(500)
//           .json({ success: false, message: "Multer error", error: err });
//       } else if (err) {
//         // Other errors during file upload
//         return res.status(500).json({
//           success: false,
//           message: "Error uploading file",
//           error: err,
//         });
//       }

//       const { productId, title, description, productCategoryId, price, discount, status } = req.body;
//       const imagePath = req.file ? req.file.path : "";

//       if (!productId) {
//         return res
//           .status(400)
//           .json({ success: false, message: "product id not found" });
//       }

//       const productToUpdate = await Product.findById(productId);

//       if (!productToUpdate) {
//         return res
//           .status(404)
//           .json({ success: false, message: "Product not found." });
//       }

//       // Update store properties
//       productToUpdate.title = title;
//       productToUpdate.image = imagePath;
//       productToUpdate.description = description;
//       productToUpdate.price = price;
//       productToUpdate.status = status;
//       productToUpdate.discount = discount;
//       productToUpdate.productCategoryId = productCategoryId;


//       await productToUpdate.save();
//       await productToUpdate.save();

//       return res.status(200).json({
//         success: true,
//         message: "Product updated successfully",
//         updatedPooja: poojaToUpdate,
//       });
//     });
//   } catch (error) {
//     console.error("Error updating product:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update product",
//       error: error.message,
//     });
//   }
// };
// const deleteProduct = async function (req, res) {
//   try {
//     const poojaId = req.body.poojaId;
//     const deletedPooja = await Pooja.findByIdAndUpdate(
//       poojaId,
//       { $set: { deleted: true } },
//       { new: true }
//     );

//     if (!deletedPooja) {
//       return res
//         .status(404)
//         .json({ success: false, message: "Pooja not found." });
//     }

//     res
//       .status(200)
//       .json({ success: true, message: "Pooja deleted successfully" });
//   } catch (error) {
//     console.error("Error deleting pooja:", error);
//     res.status(500).json({
//       success: false,
//       message: "Failed to soft delete pooja",
//       error: error.message,
//     });
//   }
// };

// const updateProductStatus = async function (req, res) {
//   try {
//     const { poojaId, status } = req.body;

//     if (!poojaId || !status) {
//       return res.status(400).json({ success: false, message: "Invalid request. poojaId and status are required." });
//     }

//     const poojaToUpdate = await Pooja.findById(poojaId);

//     if (!poojaToUpdate) {
//       return res.status(404).json({ success: false, message: "Pooja not found." });
//     }

//     // Update status field
//     poojaToUpdate.status = status;

//     await poojaToUpdate.save();

//     return res.status(200).json({
//       success: true,
//       message: "Pooja status updated successfully",
//       updatedPooja: poojaToUpdate,
//     });
//   } catch (error) {
//     console.error("Error updating pooja status:", error);
//     return res.status(500).json({
//       success: false,
//       message: "Failed to update pooja status",
//       error: error.message,
//     });
//   }
// };


export {
  uploadSkill,
  uploadRemedy,
  uploadGifts,
  uploadQualificationImage,
  uploadEcommerceBanner,
  uploadAstrologerImages,
  uploadCustomerImage,
  uploadTestimonial,
  uploadBanners,
  uploadNotificationImages,
  addUser,
  getAllUser,
  blockUser,
  deleteUser,
  skill,
  getAllSkills,
  updateSkill,
  deleteSkill,
  subSkill,
  getAllSubSkills,
  updateSubSkill,
  deleteSubSkill,
  createRechargePlan,
  updateRechargePlan,
  updateRechargePlanStatus,
  getAllRechargePlan,
  deleteRechargePlan,
  addRemedy,
  viewRemedy,
  updateRemedy,
  deleteRemedy,
  addExpertise,
  getExpertise,
  updateExpertise,
  deleteExpertise,
  addMainExpertise,
  updateMainExpertise,
  deleteMainExpertise,
  getMainExpertise,
  addGift,
  viewGift,
  updateGift,
  deleteGift,
  addReview,
  verifyReview,
  getAllReview,
  updateReview,
  getAstrologersReviews,
  astrologersVerifiedReviews,
  deleteReview,
  addFaq,
  getAllFaq,
  updateFaq,
  deleteFaq,
  addTandC,
  deleteTandC,
  viewTandC,
  addPrivacyPolicy,
  deletePrivacyPolicy,
  viewPrivacyPolicy,
  addVideoUrl,
  deleteVideoUrl,
  viewVideoUrl,
  addAskQuestion,
  getAskQuestion,
  updateAskQuestion,
  deleteAskQuestion,
  addReligionSpirituality,
  getReligionSpirituality,
  updateReligionSpirituality,
  deleteReligionSpirituality,
  addAstroMagazine,
  getAstroMagazine,
  updateAstroMagazine,
  deleteAstroMagazine,
  addBirhatHoroscope,
  getBirhatHoroscope,
  updateBirhatHoroscope,
  deleteBirhatHoroscope,
  addDailyPanchang,
  getDailyPanchang,
  updateDailyPanchang,
  deleteDailyPanchang,
  addRemedies,
  getRemedies,
  updateRemedies,
  deleteRemedies,
  addYellowBook,
  getYellowBook,
  updateYellowBook,
  deleteYellowBook,
  addNumerology,
  getAllNumerology,
  updateNumerology,
  deleteNumerology,
  addVivahMuhurat,
  getAllVivahMuhurat,
  updateVivahMuhurat,
  deleteVivahMuhurat,
  addMundanMuhurat,
  getAllMundanMuhurat,
  updateMundanMuhurat,
  deleteMundanMuhurat,
  addAnnaprashan,
  getAllAnnaprashan,
  updateAnnaprashan,
  deleteAnnaprashan,
  addAuspiciousTime,
  getAuspiciousTime,
  updateAuspiciousTime,
  deleteAuspiciousTime,
  addAskAstrologer,
  getAskAstrologer,
  updateAskAstrologer,
  deleteAskAstrologer,
  addAskAstrologerQuestion,
  getAllQuestions,
  updateAskAstrologerQuestion,
  deleteQuestion,
  addAstrologer,
  updateAstrologer,
  getAllAstrologers,
  getAstrologerRequests,
  updateServiceCharges,
  deleteAstrologerAccount,
  addBlog,
  blogList,
  updateBlog,
  deleteBlog,
  addBlogCategory,
  categoryBlogList,
  addTestimonial,
  updateTestimonial,
  deleteTestimonial,
  getAllTestimonial,
  checkAstrologer,
  addCustomer,
  getAllCustomers,
  deleteCustomer,
  addAnnouncement,
  getAnnouncement,
  updateAnnouncement,
  deleteAnnouncement,
  addMessage,
  updateMessage,
  deleteMessage,
  addScreenshot,
  addBanners,
  getAllBanners,
  getAppBanners,
  updateBanners,
  deleteBanners,
  sendNotificationFromAdmin,
  sendNotification,
  getAllNotifications,
  firstRechargeOffer,
  updateFirstRechargeOffer,
  getAllFirstRechargeOffer,
  deleteFirstRechargeOffer,
  changeBannedStatus,
  setCustomerOnline,
  updateCustomerdata,
  rechargeCustomerWallet,
  getCustomersPayment,
  customerOrderHistory,
  addAppReview,
  verifyAppReview,
  getAllAppReview,
  deleteAppReview,
  sendCustomerNotification,
  getCustomerNotification,
  getChatHistory,
  sendAstrologerNotification,
  getAstrologerNotification,
  getCallHistory,
  getAdminEarnigHistory,
  getDashboard,
  createLanguage,
  getLanguage,
  updateLanguage,
  deleteLanguage,
  getWalletPayments,
  createQualifications,
  getQualifications,
  updateQualifications,
  createLiveStreaming,
  addPoojaCategory,
  PoojaCategoryList,
  updatePoojaCategory,
  deletePoojaCategory,
  updatePoojaCategoryStatus,
  addPooja,
  PoojaList,
  updatePooja,
  deletePooja,
  updatePoojaStatus,
  addProductCategory,
  ProductCategoryList,
  updateProductCategory,
  deleteProductCategory,
  updateProductCategoryStatus,
  addProduct,
  ProductList,

}
