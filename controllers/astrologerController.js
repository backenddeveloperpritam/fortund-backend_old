import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { Types as ObjectId } from "mongoose";
import multer from "multer";
import configureMulter from "../configureMulter.js";
import AstrologerInquiry from "../models/astrologerModel/AstrologerInquiry.js";
import Skills from "../models/adminModel/Skills.js";
import Expertise from "../models/adminModel/Expertise.js";
import MainExpertise from "../models/adminModel/MainExpertise.js";
import Astrologer from "../models/adminModel/Astrologer.js";
import Review from "../models/adminModel/Review.js";
import CustomerWallet from "../models/customerModel/CustomerWallet.js";
import AstrologerWallet from "../models/astrologerModel/AstrologerWallet.js";
import Banners from "../models/adminModel/Banners.js";
import ChatHistory from "../models/adminModel/ChatHistory.js";
import Customers from "../models/customerModel/Customers.js";
import BankAccount from "../models/astrologerModel/BankAccount.js";
import OngoingList from "../models/astrologerModel/OngoingList.js";
import WaitingList from "../models/astrologerModel/WaitingList.js";
// import Transcations from '../models/astrologerModel/Transcations';
import notificationService from "../notificationService.js";
// import WebSocket from 'ws';

import CallHistory from "../models/adminModel/CallHistory.js";
import LinkedProfile from "../models/customerModel/LinkedProfile.js";
import AstrologerRequests from "../models/adminModel/AstrologerRequests.js";


const getSplash = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Astrologer Id" });
    }

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid Astrologer Id" });
    }

    res.status(200).json({ success: true, astrologer });
  } catch (error) {

    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

const addAstrologerInquiry = async (req, res) => {
  try {
    const {
      name,
      email,
      phoneNumber,
      address,
      gender,
      experience,
      language,
      skill,
      expertise,
      mainExpertise,
    } = req.body;

    const newInquiry = new AstrologerInquiry({
      name,
      email,
      phoneNumber,
      address,
      gender,
      experience,
      language,
      skill,
      expertise,
      mainExpertise,
    });

    await newInquiry.save();

    res.status(201).json({
      success: true,
      message: "Astrologer inquiry added successfully",
      inquiry: newInquiry,
    });
  } catch (error) {
    console.error("Error adding Astrologer inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Astrologer inquiry",
      error: error.message,
    });
  }
};

const getAllAstrologerInquiry = async function (req, res) {
  try {
    const astrologerInquiry = await AstrologerInquiry.find();

    res.status(200).json({ success: true, astrologerInquiry });
  } catch (error) {
    console.error("Error fetching Astrologer Inquiry:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer Inquiry",
      error: error.message,
    });
  }
};

// astrologer login
function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

const astrologerLogin = async function (req, res) {
  try {
    const { email, password, fcmToken } = req.body;

    const astrologer = await Astrologer.findOne({ email, password });

    if (!astrologer) {
      res.status(200).json({
        success: true,
        status: 0,
        message: 'Wrong email or password',
        type: "wrong",
      });
    }

    if (!!astrologer) {
      if (astrologer?.isDeleted == 1) {
        res.status(200).json({
          success: true,
          status: 0,
          message:
            "Your account has been deactivated, please contact admin support.",
          type: "Deactiveted!",
        });
      }
    }

    astrologer.fcmToken = fcmToken;

    await astrologer.save()

    res.status(200).json({
      success: true,
      status: 1,
      astrologer,
      message: "Login Successfull",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

// verify astrologer
// const  verifyAstrologer = async function(req, res){
//     try {
//         const { phoneNumber, fcmToken, otp } = req.body;

//         // Find the customer by phone number, FCM token, and OTP
//         let astrologer = await Astrologer.findOne({ phoneNumber, fcmToken, otp });

//         if (astrologer) {
//             // If found, update isOtpVerified to 1
//             astrologer.isOtpVerified = 1;
//             await astrologer.save();

//             return res.status(200).json({ success: true, message: 'astrologer verified successfully.', astrologerId: astrologer._id });
//         } else {
//             return res.status(400).json({ success: false, message: 'Verification failed. Invalid credentials.' });
//         }
//     } catch (error) {
//         console.error('Error during astrologer verification:', error);
//         res.status(500).json({ success: false, message: 'Verification failed', error: error.message });
//     }
// };

const verifyAstrologer = async function (req, res) {
  try {
    const { phoneNumber, fcmToken, otp, device_id } = req.body;

    // Find the astrologer by phone number
    // let astrologer = await Astrologer.findOne({ phoneNumber, otp });
    let astrologer = await Astrologer.findOne({ phoneNumber });

    if (astrologer) {
      const deviceToken = astrologer?.fcmToken;
      if (deviceToken) {
        const notification = {
          title: "Namo Astro",
          body: "You are logged in new device",
        };
        const data = {
          type: "new_login",
        };

        await notificationService.sendNotification(
          deviceToken,
          notification,
          data
        );
      }

      astrologer.fcmToken = fcmToken;
      astrologer.device_id = device_id;

      astrologer.save();

      return res.status(200).json({
        success: true,
        message: "FCM token updated successfully.",
        astrologerId: astrologer._id,
      });
    }

    astrologer = new Astrologer({
      phoneNumber,
      fcmToken,
      device_id,
      otp: otp,
      status: 1,
      enquiry: true,
      profileImage: "profileImage/user_default.png",
    });
    await astrologer.save();

    return res.status(200).json({
      success: true,
      message: "FCM token updated successfully.",
      astrologerId: astrologer._id,
    });
  } catch (error) {
    console.error("Error updating FCM token:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update FCM token",
      error: error.message,
    });
  }
};

const astrologerGoogleLogin = async function (req, res) {
  try {
    const { email, fcmToken, device_id, astrologerName } = req.body;

    if (!email)
      return res.status(200).json({
        success: false,
        status: 0,
        message: "email address is required",
      });

    let astrologer = await Astrologer.findOne({ email }).populate(
      "skill expertise mainExpertise"
    );

    if (astrologer) {
      if (astrologer?.isDeleted == 1) {
        return res.status(200).json({
          success: true,
          status: 0,
          message:
            "Your account has been deactivated, please contact admin support.",
          type: "Deactiveted!",
        });
      }

      const deviceToken = astrologer?.fcmToken;
      if (deviceToken) {
        const notification = {
          title: "Namo Astro",
          body: "You are logged in new device",
        };
        const data = {
          type: "new_login",
        };

        await notificationService.sendNotification(
          deviceToken,
          notification,
          data
        );
      }

      astrologer.fcmToken = fcmToken;
      astrologer.device_id = device_id;
      astrologer.astrologerName = astrologerName;

      await astrologer.save();

      return res.status(200).json({
        success: true,
        status: 1,
        fcmToken,
        astrologer,
        message: "You logged successfully",
      });
    }

    astrologer = new Astrologer({
      email,
      fcmToken,
      device_id,
      astrologerName,
      status: 1,
      enquiry: true,
      profileImage: "profileImage/user_default.png",
    });

    await astrologer.save();

    res.status(200).json({
      success: true,
      status: 1,
      fcmToken,
      astrologer,
      message: "You logged successfully",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

// get astrologer details
const getAstrologerDetail = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId).populate(
      "skill expertise mainExpertise"
    );

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    res.status(200).json({
      success: true,
      message: "Astrologer details:",
      astrologer,
    });
  } catch (error) {
    console.error("Error fetching Astrologer details:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer details",
      error: error.message,
    });
  }
};

// const  getAstrologerDetail = async function(req, res){
//     try {
//         const { astrologerId, unique_id } = req.body;

//         const existingAstrologer = await Astrologer.findOne({ _id: astrologerId });

//         if (!existingAstrologer) {
//             return res.status(404).json({ success: false, message: 'Astrologer not found.' });
//         }

//         existingAstrologer.unique_id = unique_id;
//         await existingAstrologer.save();

//         const astrologerDetail = await Astrologer.findOne({ _id: astrologerId });

//         res.status(200).json({ success: true, message: 'Unique ID stored and Astrologer details:', astrologerDetail });
//     } catch (error) {
//         console.error('Error updating unique ID for Astrologer:', error);
//         res.status(500).json({ success: false, message: 'Failed to update unique ID for Astrologer', error: error.message });
//     }
// };


//get all customer list

const getAllAstrologer = async function (req, res) {
  try {
    // Fetch all skills from the database
    const astrologer = await Astrologer.find({ enquiry: false });

    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, astrologer });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

const getActiveAstrologer = async function (req, res) {
  try {
    const {
      search,
      type,
      index
    } = req.body;

    let astrologer;
    let filterObject = { enquiry: false, isVerified: true, isDeleted: 0 };
    let query = {};

    if (!!search) {
      const regex = new RegExp(search, "i");
      query = {
        ...filterObject,
        astrologerName: { $regex: regex },
      };
    } else {
      query = filterObject;
    }

    const options = {
      page: index,
      limit: 10
    };

    astrologer = await Astrologer.paginate(query, options);

    if (type == 'chat') {
      astrologer.docs.sort((a, b) => {
        // Prioritize online astrologers first
        if (a.chatStatus === 'Online' && (b.chatStatus === 'Busy' || b.chatStatus === 'Offline')) return -1;
        if (b.chatStatus === 'Online' && (a.chatStatus === 'Busy' || a.chatStatus === 'Offline')) return 1;
        // If both have the same chatStatus or both are not online, maintain their order
        return 0;
      });
    } else {
      astrologer.docs.sort((a, b) => {
        // Prioritize online astrologers first
        if (a.callStatus === 'Online' && (b.callStatus === 'Busy' || b.callStatus === 'Offline')) return -1;
        if (b.callStatus === 'Online' && (a.callStatus === 'Busy' || a.callStatus === 'Offline')) return 1;
        // If both have the same chatStatus or both are not online, maintain their order
        return 0;
      });
    }



    // Return the list of skills as a JSON response
    res.status(200).json({ success: true, astrologer });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

const getEnquiredAstrologer = async function (req, res) {
  try {
    const enquiredAstrologer = await Astrologer.find({ enquiry: true });

    res.status(200).json({ success: true, enquiredAstrologer });
  } catch (error) {
    console.error("Error fetching ongoing chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing chats",
      error: error.message,
    });
  }
};

//  get astrologer's wallet balance
const astrologersWalletBalance = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    let query = {};

    if (astrologerId) {
      query = { astrologer: astrologerId };
    }

    // Fetch only the 'wallet_balance' field based on the query
    const walletBalance = await AstrologerWallet.find(query).select(
      "wallet_balance"
    );

    res.status(200).json({ success: true, walletBalance });
  } catch (error) {
    console.error("Error fetching Wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Wallet Balance",
      error: error.message,
    });
  }
};

// Average rating for astrologer by customer
const getAverageRating = async function (req, res) {
  try {
    const { astrologerId } = req.body; // Get astrologerId from query parameters

    const averageRating = await Review.aggregate([
      {
        $match: {
          astrologer: mongoose.Types.ObjectId.createFromHexString(astrologerId),
        }, // Match reviews for the provided astrologerId
      },
      {
        $group: {
          _id: "$astrologer", // Group by astrologerId
          averageRating: { $avg: "$ratings" }, // Calculate average rating
        },
      },
    ]);

    // Return the average rating as a JSON response
    if (averageRating.length > 0) {
      res
        .status(200)
        .json({ success: true, averageRating: averageRating[0].averageRating });
    } else {
      res.status(200).json({ success: true, averageRating: 0 });
    }
  } catch (error) {
    console.error("Error calculating average rating:", error);
    res.status(500).json({
      success: false,
      message: "Failed to calculate average rating",
      error: error.message,
    });
  }
};

// total number of customers who gave reviews

const countCustomersWithReviews = async function (req, res) {
  try {
    const { astrologerId } = req.body; // Get astrologerId from the request

    const objectId = new mongoose.Types.ObjectId(astrologerId); // Create an ObjectId instance

    const reviewsCount = await Review.aggregate([
      {
        $match: {
          astrologer: objectId, // Match reviews for the provided astrologerId as an ObjectId instance
        },
      },
      {
        $group: {
          _id: "$astrologer", // Group by astrologerId
          reviewCount: { $sum: 1 }, // Count the occurrences of the provided astrologerId
        },
      },
    ]);

    // Return the count of occurrences of the provided astrologerId in the Review collection
    const count = reviewsCount.length > 0 ? reviewsCount[0].reviewCount : 0;
    res.status(200).json({ success: true, count });
  } catch (error) {
    console.error("Error counting reviews for astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to count reviews for astrologer",
      error: error.message,
    });
  }
};

// recommended astrologers
// const  recommendedAstrologers = async function (req, res) {
//     try {
//         const astrologers = await Review.aggregate([
//           {
//             $group: {
//               _id: '$astrologer',
//               averageRating: { $avg: '$ratings' },
//             },
//           },
//           {
//             $lookup: {
//               from: 'Review', // Replace with the actual collection name of astrologers
//               localField: '_id',
//               foreignField: '_id',
//               as: 'astrologerData',
//             },
//           },
//           {
//             $unwind: '$astrologerData',
//           },
//           {
//             $sort: { averageRating: -1 },
//           },
//           {
//             $project: {
//               _id: '$astrologerData._id',
//             //   name: '$astrologerData.name', // Assuming 'name' is a field in the Astrologer model
//               averageRating: '$averageRating',
//               // Add more fields from the Astrologer model as needed
//             },
//           },
//         ]);

//         res.status(200).json({ success: true, astrologers });
//       } catch (error) {
//         res.status(500).json({ success: false, message: 'Failed to fetch astrologers', error: error.message });
//       }
//   };

// // start chat
// const  startChat = async function (req, res) {
//   try {
//     const { customerId, astrologerId } = req.body;

//     // Validate required fields
//     if (!customerId || !astrologerId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide customerId and astrologerId.'
//       });
//     }

//     // Check if an ongoing chat exists for the provided IDs
//     const ongoingChat = await ChatHistory.findOne({
//       customerId,
//       astrologerId,
//       chatStatus: '1' // Check if the chat is ongoing
//     });

//     if (ongoingChat) {
//       return res.status(400).json({
//         success: false,
//         message: 'Chat is already ongoing.'
//       });
//     }

//     // Create a new entry in ChatHistory with customerId, astrologerId, and chatStart as the current timestamp
//     const newChat = new ChatHistory({
//       customerId,
//       astrologerId,
//       chatStatus: '1', // Set the chat status to indicate it's ongoing
//       chatStart: new Date() // Set the start time to the current timestamp
//     });

//     // Save the new chat history entry
//     await newChat.save();

//     res.status(200).json({
//       success: true,
//       message: 'Chat started successfully.',
//       data: newChat
//     });
//   } catch (error) {
//     console.error('Error starting chat:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to start chat.',
//       error: error.message
//     });
//   }
// };

// // end chat
// const  endChat = async function (req, res) {
//   try {
//     const { customerId, astrologerId } = req.body;

//     // Validate required fields
//     if (!customerId || !astrologerId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide customerId and astrologerId.'
//       });
//     }

//     // Find the ongoing chat for the provided IDs
//     const chatRecord = await ChatHistory.findOne({
//       customerId,
//       astrologerId,
//       chatStatus: '1' // Check if the chat is ongoing
//     });

//     if (!chatRecord) {
//       return res.status(404).json({
//         success: false,
//         message: 'No ongoing chat found between these astrologer and customer.'
//       });
//     }

//     // Update the endChat field to the current timestamp
//     chatRecord.endChat = new Date();
//     chatRecord.chatStatus = '2'; // Set the chatStatus to 'ended'

//     // Save the changes to the chat record
//     await chatRecord.save();

//     res.status(200).json({
//       success: true,
//       message: 'Chat ended successfully.',
//       data: chatRecord
//     });
//   } catch (error) {
//     console.error('Error ending chat:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to end chat.',
//       error: error.message
//     });
//   }
// };

// online astrologer


const getOnlineAstrologers = async function (req, res) {
  try {
    // Fetch astrologers based on their online status
    const onlineAstrologers = await Astrologer.find({ isOnline: true });
    // const offlineAstrologers = await Astrologer.find({ isOnline: false });

    res.status(200).json({
      success: true,
      onlineAstrologers,
      // offlineAstrologers
    });
  } catch (error) {
    console.error("Error fetching astrologers status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch astrologers status.",
      error: error.message,
    });
  }
};

// const  setAstrologerOnline = async function (req, res) {
//   try {
//     const { astrologerId } = req.body;

//     // Validate required fields
//     if (!astrologerId) {
//       return res.status(400).json({
//         success: false,
//         message: 'Please provide astrologerId.'
//       });
//     }

//     // Find the astrologer by ID
//     const astrologer = await Astrologer.findById(astrologerId);

//     if (!astrologer) {
//       return res.status(404).json({
//         success: false,
//         message: 'Astrologer not found.'
//       });
//     }

//     // Toggle the isOnline status
//     astrologer.isOnline = !astrologer.isOnline;
//     await astrologer.save();

//     res.status(200).json({
//       success: true,
//       message: `Astrologer status updated. Now ${astrologer.isOnline ? 'online' : 'offline'}.`,
//       data: astrologer
//     });
//   } catch (error) {
//     console.error('Error toggling astrologer status:', error);
//     res.status(500).json({
//       success: false,
//       message: 'Failed to toggle astrologer status.',
//       error: error.message
//     });
//   }

// };


const setAstrologerOnline = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId.",
      });
    }

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: "Astrologer not found.",
      });
    }

    // Toggle the isOnline status using the NOT operator (!)
    astrologer.isOnline = !astrologer.isOnline;
    await astrologer.save();

    const statusText = astrologer.isOnline ? "online" : "offline";
    res.status(200).json({
      success: true,
      message: `Astrologer status updated. Now ${statusText}.`,
      data: astrologer,
    });
  } catch (error) {
    console.error("Error toggling astrologer status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to toggle astrologer status.",
      error: error.message,
    });
  }
};

// live astrologer

const getLiveAstrologers = async function (req, res) {
  try {
    // Fetch astrologers based on their online status
    const liveAstrologers = await Astrologer.find({ isLive: true });
    // const offlineAstrologers = await Astrologer.find({ isOnline: false });

    res.status(200).json({
      success: true,
      liveAstrologers,
      // offlineAstrologers
    });
  } catch (error) {
    console.error("Error fetching astrologers status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch astrologers status.",
      error: error.message,
    });
  }
};

// astrologers chat history
// const  astrologerChatHistory = async function(req, res) {
//   try {
//     const { astrologerId } = req.body; // Extract astrologerId from URL parameters

//     // Fetch chat history for the provided astrologerId
//     const chatHistory = await ChatHistory.find({ astrologerId });

//     if (!chatHistory || chatHistory.length === 0) {
//       return res.status(404).json({ success: false, message: 'No chat history found for this astrologer.' });
//     }

//     // Return the chat history data as a JSON response
//     res.status(200).json({ success: true, chatHistory });
//   } catch (error) {
//     console.error('Error fetching Chat History:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch Chat History', error: error.message });
//   }
// };

// update astrologers
// const  updateAstrologerDetails = async function (req, res) {
//   try {
//     const astrologerId = req.params.id; // Assuming the ID of the astrologer is in the URL parameters

//     // Fetch the existing astrologer by ID
//     const existingAstrologer = await Astrologer.findById(astrologerId);

//     if (!existingAstrologer) {
//       return res.status(404).json({ success: false, message: 'Astrologer not found.' });
//     }

//     const {
//       astrologerName,
//       phoneNumber,
//       chat_price,
//       call_price,
//       preferredDays,
//       start_time,
//       end_time,
//       experience,
//       about,
//       skill,
//       expertise
//     } = req.body;

//     // Update the astrologer details based on the provided fields
//     existingAstrologer.astrologerName = astrologerName || existingAstrologer.astrologerName;
//     existingAstrologer.phoneNumber = phoneNumber || existingAstrologer.phoneNumber;
//     existingAstrologer.chat_price = chat_price || existingAstrologer.chat_price;
//     existingAstrologer.call_price = call_price || existingAstrologer.call_price;
//     existingAstrologer.preferredDays = preferredDays || existingAstrologer.preferredDays;
//     existingAstrologer.start_time = start_time || existingAstrologer.start_time;
//     existingAstrologer.end_time = end_time || existingAstrologer.end_time;
//     existingAstrologer.experience = experience || existingAstrologer.experience;
//     existingAstrologer.about = about || existingAstrologer.about;
//     existingAstrologer.skill = skill || existingAstrologer.skill;
//     existingAstrologer.expertise = expertise || existingAstrologer.expertise;

//     await existingAstrologer.save();

//     res.status(200).json({ success: true, message: 'Astrologer updated successfully.', data: existingAstrologer });
//   } catch (error) {
//     console.error('Error updating Astrologer:', error);
//     res.status(500).json({ success: false, message: 'Failed to update Astrologer.', error: error.message });
//   }
// };

// const  updateAstrologerDetails = async function (req, res) {
//   try {
//     const astrologerId = req.params.id;
//     const existingAstrologer = await Astrologer.findById(astrologerId);

//     if (!existingAstrologer) {
//       return res.status(404).json({ success: false, message: 'Astrologer not found.' });
//     }

//     const {
//       astrologerName,
//       // phoneNumber,
//       chat_price,
//       call_price,
//       preferredDays,
//       startTime,
//       endTime,
//       experience,
//       about,
//       skill,
//       expertise
//     } = req.body;

//     // console.log('Received astrologerName:', astrologerName); // Add console logs for all fields to check their values

//     existingAstrologer.astrologerName = astrologerName || existingAstrologer.astrologerName;
//     // existingAstrologer.phoneNumber = phoneNumber || existingAstrologer.phoneNumber;
//     existingAstrologer.chat_price = chat_price || existingAstrologer.chat_price;
//     existingAstrologer.call_price = call_price || existingAstrologer.call_price;
//     // existingAstrologer.preferredDays = preferredDays || existingAstrologer.preferredDays;
//     existingAstrologer.startTime = startTime || existingAstrologer.startTime;
//     existingAstrologer.endTime = endTime || existingAstrologer.endTime;
//     existingAstrologer.experience = experience || existingAstrologer.experience;
//     existingAstrologer.about = about || existingAstrologer.about;
//     // existingAstrologer.skill = skill || existingAstrologer.skill;
//     // existingAstrologer.expertise = expertise || existingAstrologer.expertise;

//     if (preferredDays && Array.isArray(preferredDays)) {
//       existingAstrologer.preferredDays = preferredDays; // Replace the entire preferredDays array with the new one from the request
//     }

//     if (skill && Array.isArray(skill)) {
//       existingAstrologer.skill = skill; // Replace the entire skill array with the new one from the request
//     }

//     if (expertise && Array.isArray(expertise)) {
//       existingAstrologer.expertise = expertise; // Replace the entire expertise array with the new one from the request
//     }

//     // console.log('Updated astrologer:', existingAstrologer); // Check the existingAstrologer object before saving

//     await existingAstrologer.save();

//     res.status(200).json({ success: true, message: 'Astrologer updated successfully.', data: existingAstrologer });
//   } catch (error) {
//     console.error('Error updating Astrologer:', error);
//     res.status(500).json({ success: false, message: 'Failed to update Astrologer.', error: error.message });
//   }
// };

const updateAstrologerDetails = async function (req, res) {
  try {
    const astrologerId = req.body.astrologerId; // Assuming astrologerId is provided in the request body
    const existingAstrologer = await Astrologer.findById(astrologerId);

    if (!existingAstrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const {
      astrologerName,
      chat_price,
      call_price,
      preferredDays,
      startTime,
      endTime,
      experience,
      about,
      skill,
      expertise,
      workingOnOtherApps,
    } = req.body;

    existingAstrologer.astrologerName =
      astrologerName || existingAstrologer.astrologerName;
    existingAstrologer.chat_price = chat_price || existingAstrologer.chat_price;
    existingAstrologer.call_price = call_price || existingAstrologer.call_price;
    existingAstrologer.startTime = startTime || existingAstrologer.startTime;
    existingAstrologer.endTime = endTime || existingAstrologer.endTime;
    existingAstrologer.experience = experience || existingAstrologer.experience;
    existingAstrologer.about = about || existingAstrologer.about;
    existingAstrologer.workingOnOtherApps =
      workingOnOtherApps || existingAstrologer.workingOnOtherApps;

    if (preferredDays && Array.isArray(preferredDays)) {
      existingAstrologer.preferredDays = preferredDays;
    }

    if (skill && Array.isArray(skill)) {
      existingAstrologer.skill = skill;
    }

    if (expertise && Array.isArray(expertise)) {
      existingAstrologer.expertise = expertise;
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
};

// update chat price
const updateChatPrice = async function (req, res) {
  try {
    const { astrologerId, chatPrice } = req.body;

    // Find the astrologer by ID
    let astrologer = await Astrologer.findById(astrologerId);

    if (astrologer) {
      // Update the chat price field
      astrologer.chat_price = chatPrice;
      await astrologer.save();

      return res.status(200).json({
        success: true,
        message: "Chat price updated successfully.",
        astrologerId: astrologer._id,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Astrologer not found." });
    }
  } catch (error) {
    console.error("Error updating chat price:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update chat price.",
      error: error.message,
    });
  }
};

// update call_price
const updateCallPrice = async function (req, res) {
  try {
    const { astrologerId, callPrice } = req.body;

    // Find the astrologer by ID
    let astrologer = await Astrologer.findByIdAndUpdate(
      astrologerId,
      { call_price: callPrice },
      { new: true }
    );

    if (astrologer) {
      return res.status(200).json({
        success: true,
        message: "Call price updated successfully.",
        astrologerId: astrologer._id,
      });
    } else {
      return res
        .status(400)
        .json({ success: false, message: "Astrologer not found." });
    }
  } catch (error) {
    console.error("Error updating call price:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update call price.",
      error: error.message,
    });
  }
};

// update astrologer profile image

const uploadAstrologerImage = configureMulter("profileImage/", [
  { name: "profileImage", maxCount: 1 },
]);

const updateAstrologerProfileImage = function (req, res) {
  uploadAstrologerImage(req, res, async function (err) {
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
      const { astrologerId } = req.body;

      // Validate required fields
      if (!astrologerId) {
        return res.status(400).json({
          success: false,
          message: "Please provide a astrologerId.",
        });
      }

      const existingAstrologer = await Astrologer.findById(astrologerId);

      if (!existingAstrologer) {
        return res
          .status(404)
          .json({ success: false, message: "Astrologer not found." });
      }

      // Update image path if a new image is uploaded
      if (req.files["profileImage"]) {
        const imagePath = req.files["profileImage"][0].path.replace(
          /^.*profileImage[\\/]/,
          "profileImage/"
        );
        existingAstrologer.profileImage = imagePath;
      }

      await existingAstrologer.save();

      res.status(200).json({
        success: true,
        message: "astrloger profile image updated successfully.",
      });
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update astrologer profile image.",
        error: error.message,
      });
    }
  });
};

// Tranaction details

// const  getAmountTransactionDetails = async function(req, res) {
//   try {
//     const { astrologerId } = req.body;

//     // Find transactions related to the provided astrologerId
//     const astrologerTransactions = await Transactions.find({ astrologerId }).populate('bank_account');;

//     if (!astrologerTransactions || astrologerTransactions.length === 0) {
//       return res.status(404).json({ success: false, message: 'No transactions found for this astrologer.' });
//     }

//     res.status(200).json({ success: true, message: 'Astrologer\'s transaction details:', data: { astrologerTransactions, Transactions } });
//   } catch (error) {
//     console.error('Error fetching transactions for Astrologer:', error);
//     res.status(500).json({ success: false, message: 'Failed to fetch transactions for Astrologer', error: error.message });
//   }
// };

// add bank account

const addBankAccount = async function (req, res) {
  try {
    const { astrologerId, accountNumber, accountHolderName, IFSCCode } =
      req.body;

    // Find the astrologer based on the provided ID
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Create a new bank account and associate it with the astrologer
    const newBankAccount = new BankAccount({
      astrologer: astrologerId,
      accountNumber,
      accountHolderName,
      IFSCCode,
    });

    await newBankAccount.save();

    // Ensure that astrologer.bankAccounts is initialized as an array
    astrologer.bankAccounts = astrologer.bankAccounts || [];

    // Add the new bank account to the astrologer's bankAccounts array
    astrologer.bankAccounts.push(newBankAccount._id);
    await astrologer.save();

    res
      .status(201)
      .json({ success: true, message: "Bank Account added successfully" });
  } catch (error) {
    console.error("Error adding Bank Account:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Bank Account",
      error: error.message,
    });
  }
};

// logout Astrologer
const logoutAstrologer = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    if (!astrologerId) {
      return res.status(400).json({
        success: false,
        message: "Please provide astrologerId.",
      });
    }

    // Find the astrologer by ID
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res.status(404).json({
        success: false,
        message: "Astrologer not found.",
      });
    }

    // Set isOnline status to false (logging out)
    astrologer.isOnline = false;
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: "Astrologer logged out successfully.",
      data: astrologer,
    });
  } catch (error) {
    console.error("Error logging out astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to log out astrologer.",
      error: error.message,
    });
  }
};

// add ongoing chat

const addOngoingChat = async function (req, res) {
  try {
    const { astrologer, customer, timeInSeconds } = req.body;

    const currentTime = new Date();
    const futureTime = new Date(currentTime.getTime() + timeInSeconds * 1000);

    if (!futureTime || isNaN(futureTime.getTime())) {
      return res.status(400).json({
        success: false,
        message: "Invalid time provided.",
      });
    }

    const ongoingSession = new OngoingList({
      astrologer,
      customer,
      endTime: futureTime,
    });

    await ongoingSession.save();

    res.status(200).json({
      success: true,
      message: "Ongoing session created successfully.",
      ongoingSession,
    });
  } catch (error) {
    console.error("Error creating ongoing session:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create ongoing session",
      error: error.message,
    });
  }
};

// Get All Ongoing Chat Sessions
const getAllOngoingChats = async function (req, res) {
  try {
    const ongoingChats = await OngoingList.find();

    res.status(200).json({ success: true, ongoingChats });
  } catch (error) {
    console.error("Error fetching ongoing chats:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing chats",
      error: error.message,
    });
  }
};

const getOngoingChatById = async function (req, res) {
  try {
    const { id } = req.body;

    const ongoingChat = await OngoingList.find({ astrologer: id });

    if (!ongoingChat) {
      return res.status(404).json({
        success: false,
        message: "Ongoing chat session not found.",
      });
    }

    res.status(200).json({ success: true, ongoingChat });
  } catch (error) {
    console.error("Error fetching ongoing chat by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch ongoing chat",
      error: error.message,
    });
  }
};

// Delete Ongoing Chat Session by ID
const deleteOngoingChatById = async function (req, res) {
  try {
    const { chatId } = req.params;

    const deletedChat = await OngoingList.findByIdAndDelete(chatId);

    if (!deletedChat) {
      return res.status(404).json({
        success: false,
        message: "Ongoing chat session not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Ongoing chat session deleted successfully.",
      deletedChat,
    });
  } catch (error) {
    console.error("Error deleting ongoing chat by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete ongoing chat",
      error: error.message,
    });
  }
};

// Update Ongoing Chat Session by ID
// const  updateOngoingChatById = async function(req, res) {
//   try {
//     const { chatId } = req.params;
//     const { astrologer, customer, timeInSeconds } = req.body;

//     const currentTime = new Date();
//     const updatedTime = new Date(currentTime.getTime() + timeInSeconds * 1000);

//     if (!updatedTime || isNaN(updatedTime.getTime())) {
//       return res.status(400).json({
//         success: false,
//         message: 'Invalid time provided.'
//       });
//     }

//     const updatedChat = await OngoingList.findByIdAndUpdate(chatId, {
//       astrologer,
//       customer,
//       endTime: updatedTime
//     }, { new: true });

//     if (!updatedChat) {
//       return res.status(404).json({
//         success: false,
//         message: 'Ongoing chat session not found.'
//       });
//     }

//     res.status(200).json({ success: true, message: 'Ongoing chat session updated successfully.', updatedChat });
//   } catch (error) {
//     console.error('Error updating ongoing chat by ID:', error);
//     res.status(500).json({ success: false, message: 'Failed to update ongoing chat', error: error.message });
//   }
// };

// waiting list

const addToWaitingList = async function (req, res) {
  try {
    const { astrologer, customer } = req.body;

    const waitingEntry = new WaitingList({
      astrologer,
      customer,
    });

    await waitingEntry.save();

    res.status(200).json({
      success: true,
      message: "Added to waiting list successfully.",
      waitingEntry,
    });
  } catch (error) {
    console.error("Error adding to waiting list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add to waiting list",
      error: error.message,
    });
  }
};

// update waiting list
// const  updateWaitingListEntry = async function(req, res) {
//   try {
//     const { waitingListId } = req.params;
//     const { astrologer, customer } = req.body;

//     const updatedWaitingList = await WaitingList.findByIdAndUpdate(waitingListId, {
//       astrologer,
//       customer,
//     }); // Added a closing curly brace here

//     if (!updatedWaitingList) {
//       return res.status(404).json({
//         success: false,
//         message: 'Waiting list not found.'
//       });
//     }

//     res.status(200).json({ success: true, message: 'Waiting list updated successfully.', updatedWaitingList });
//   } catch (error) {
//     console.error('Error updating Waiting List by ID:', error);
//     res.status(500).json({ success: false, message: 'Failed to update waiting list', error: error.message });
//   }
// };

// all waititng list
const getAllWaitingListEntries = async function (req, res) {
  try {
    const waitingList = await WaitingList.find();

    res.status(200).json({ success: true, waitingList });
  } catch (error) {
    console.error("Error fetching waiting list entries:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch waiting list entries",
      error: error.message,
    });
  }
};

// delete waiting list

const deleteFromWaitingList = async function (req, res) {
  try {
    const { waitingListId } = req.params;

    const waititngEntryToDelete = await WaitingList.findById(waitingListId);
    if (!waititngEntryToDelete) {
      return res.status(404).json({
        success: false,
        message: "Entry not found in the waiting list.",
      });
    }

    await WaitingList.findByIdAndDelete(waitingListId);

    res.status(200).json({
      success: true,
      message: "Entry deleted successfully from the waiting list.",
    });
  } catch (error) {
    console.error("Error deleting entry from waiting list:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete entry from the waiting list.",
      error: error.message,
    });
  }
};

// get details of particular waiting list
const getWaitingListByIdFromBody = async function (req, res) {
  try {
    const astrologerId = req.body.astrologerId;

    const waitingEntry = await WaitingList.find({ astrologer: astrologerId });

    if (!waitingEntry) {
      return res.status(404).json({
        success: false,
        message: "Waiting list entry not found.",
      });
    }

    res.status(200).json({ success: true, waitingEntry });
  } catch (error) {
    console.error("Error fetching waiting list entry by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch waiting list entry",
      error: error.message,
    });
  }
};

// verified astrologers
const getAllVerifiedAstrologers = async function (req, res) {
  try {
    // Fetch all astrologers where 'is_verified' is true
    const verifiedAstrologers = await Astrologer.find({ isVerified: true });

    res.status(200).json({ success: true, astrologers: verifiedAstrologers });
  } catch (error) {
    res.status(500).json({
      success: false,
      message: "Failed to fetch verified astrologers",
      error: error.message,
    });
  }
};

const verifyAstrologerProfile = async function (req, res) {
  const { astrologerId, isVerified } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { chat_price, call_price } = astrologer

    if (!chat_price && !call_price && chat_price == 0 && call_price == 0) {
      return res
        .status(200)
        .json({ success: true, message: "Please update astrologer profile", unverified: true });
    }


    astrologer.isVerified = isVerified; // Set isVerified based on the provided value

    await astrologer.save();

    let verificationMessage =
      isVerified === "true"
        ? "Astrologer is set to verified."
        : "This astrologer is not verified.";

    res.status(200).json({
      success: true,
      message: verificationMessage,
      data: astrologer,
    });
  } catch (error) {
    console.error("Error setting verification status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to set verification status.",
      error: error.message,
    });
  }
};

// change astrologers status
const changeAstrologerStatus = async function (req, res) {
  const { astrologerId, astrologers_status } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Update the astrologer_status field
    astrologer.astrologers_status = astrologers_status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer status.",
      error: error.message,
    });
  }
};

// change chat status
const changeChatStatus = async function (req, res) {
  const { astrologerId, chatStatus } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { isDeleted, isVerified } = astrologer;

    if (isDeleted == 1) {
      res.status(200).json({
        success: true,
        type: "Banned",
        message: `You are banned, please contact to the support`,
      });
    } else if (!isVerified) {
      res.status(200).json({
        type: "Not Verified",
        success: true,
        message: `You are not verified yet, please contact to the support`,
      });
    } else {
      // Update the astrologer_status field
      astrologer.chatStatus = chatStatus;

      // Save the updated astrologer data
      await astrologer.save();

      res.status(200).json({
        success: true,
        message: `Astrologer status updated successfully.`,
        updatedAstrologerData: astrologer,
      });
    }
  } catch (error) {
    console.error("Error updating astrologer chat status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer chat status.",
      error: error.message,
    });
  }
};

// change call status
const changeCallStatus = async function (req, res) {
  const { astrologerId, callStatus } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const { isDeleted, isVerified } = astrologer;

    if (isDeleted == 1) {
      res.status(200).json({
        success: true,
        type: "Banned",
        message: `You are banned, please contact to the support`,
      });
    } else if (!isVerified) {
      res.status(200).json({
        type: "Not Verified",
        success: true,
        message: `You are not verified yet, please contact to the support`,
      });
    } else {
      astrologer.callStatus = callStatus;

      // Save the updated astrologer data
      await astrologer.save();

      res.status(200).json({
        success: true,
        message: `Astrologer status updated successfully.`,
        updatedAstrologerData: astrologer,
      });
    }
  } catch (error) {
    console.error("Error updating astrologer callStatus:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer callStatus.",
      error: error.message,
    });
  }
};

const changePrefferDays = async function (req, res) {
  const { astrologerId, prefferedDays } = req.body;
  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(200)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.preferredDays = prefferedDays;
    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer preffered days:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer preffered days.",
      error: error.message,
    });
  }
};

const changePrefferTime = async function (req, res) {
  const { astrologerId, startTime, endTime } = req.body;
  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(200)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.startTime = startTime;
    astrologer.endTime = endTime;
    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  } catch (error) {
    console.error("Error updating astrologer preffered days:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update astrologer preffered days.",
      error: error.message,
    });
  }
};

const changeEnquiryStatus = async function (req, res) {
  const { astrologerId } = req.body;

  try {
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    // Update the astrologer_status field
    astrologer.enquiry = false;

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

// check chat status
const checkChatStatus = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const status = {
      chatStatus: astrologer.chatStatus,
    };

    res.status(200).json({ success: true, status });
  } catch (error) {
    console.error("Error checking astrologer chat status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer chat status.",
      error: error.message,
    });
  }
};

// check call status
const checkCallStatus = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const status = {
      callStatus: astrologer.callStatus,
    };

    res.status(200).json({ success: true, status });
  } catch (error) {
    console.error("Error checking astrologer call status:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer call status.",
      error: error.message,
    });
  }
};

// send notification to astrologer
const sendNotificationToAstrologer = async (req, res) => {
  try {
    const { astrologerId, customerId, type } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);
    const astrologerFCMToken = astrologer?.fcmToken;
    const customer = await Customers.findById(customerId);

    const customerData = {
      notificationBody: "Customer is Requesting for chat",
      customerName: customer?.customerName,
      customerImage: customer?.image,
      user_id: customerId,
      wallet_balance: customer?.wallet_balance,
      type: type,
      priority: "High",
    };

    let inoiceId = "12345678";

    const deviceToken = astrologerFCMToken;

    const title = `Chat request from ${customerData.customerName || "a customer"
      }`;
    const notification = {
      title,
      body: "Customer is Requesting for chat",
    };
    const data = {
      customerName: customer?.customerName,
      customerImage: customer?.image,
      user_id: customerId,
      wallet_balance: customer?.wallet_balance,
      type,
      priority: "High",
      invoiceId: inoiceId,
    };

    // console.log(customerData);

    await notificationService.sendNotification(deviceToken, notification, data);

    res.status(200).json({
      success: true,
      message: "Notification sent successfully to the astrologer",
    });
  } catch (error) {
    console.error("Failed to send notification to the astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification to the astrologer",
      error: error.message,
    });
  }
};

// recommended astrologers

const getRecommededAstrologers = async function (req, res) {
  try {
    const astrologers = await Astrologer.find()
      .select("astrologerName avg_rating")
      .sort({ avg_rating: -1 });

    if (!astrologers || astrologers.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No astrologers found." });
    }

    res.status(200).json({ success: true, data: astrologers });
  } catch (error) {
    console.error("Error fetching astrologers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch astrologers.",
      error: error.message,
    });
  }
};

// astrologer chat history
const chatHistoryOfAstrologer = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const chatHistory = await ChatHistory.find({
      astrologerId,
      durationInSeconds: { $exists: true, $ne: "" },
    })
      .populate({
        path: "formId", // Assuming 'formId' is the field referencing LinkedProfile
        select: "-_id -__v", // Exclude fields like id and _v from LinkedProfile
      })
      .populate({
        path: "customerId", // Assuming 'formId' is the field referencing LinkedProfile
        select: "-_id -__v", // Exclude fields like id and _v from LinkedProfile
      });

    if (!chatHistory || chatHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No chat history found for this Astrologer",
      });
    }

    res.status(200).json({
      success: true,
      message: "Chat history found",
      chatHistory,
    });
  } catch (error) {
    console.error("Error fetching chat history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch chat history",
      error: error.message,
    });
  }
};

// call niotification to astrologer
const callNotificationToAstrologer = async (req, res) => {
  try {
    const { astrologerId, customerId } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);
    const astrologerFCMToken = astrologer?.fcmToken;
    const customer = await Customers.findById(customerId);

    const customerData = {
      notificationBody: "Customer is Requesting for call",
      customerName: customer?.customerName,
      customerImage: customer?.image,
      user_id: customerId,
      wallet_balance: customer?.wallet_balance,
      type: "Call Request",
      priority: "High",
    };

    const deviceToken = astrologerFCMToken;

    const title = `Call request from ${customerData.customerName || "a customer"
      }`;
    const notification = {
      title,
      body: customerData,
    };

    // console.log(customerData);

    await notificationService.sendNotification(deviceToken, notification);

    res.status(200).json({
      success: true,
      message: "Call Notification sent successfully to the astrologer",
    });
  } catch (error) {
    console.error("Failed to send call notification to the astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send call notification to the astrologer",
      error: error.message,
    });
  }
};

// web socket Api

const checkCallChatStatus = async function (req, res) {
  try {
    const { astrologerId } = req.body; // Extract astrologer ID from request params

    // Fetch the astrologer from the database by ID
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    // Assuming a WebSocket logic for handling chat/call here
    // const wss = req.app.get('wss'); // Retrieve WebSocket server instance from Express app

    // // Use the fetched astrologer details to handle chat/call statuses
    // wss.clients.forEach(client => {
    //   if (client.readyState === WebSocket.OPEN) {
    //     // Send a message or perform specific actions based on astrologer status
    //     const message = `Checking status for ${astrologer.name}: Call - ${astrologer.callStatus}, Chat - ${astrologer.chatStatus}`;
    //     client.send(message);
    //   }
    // });

    // Return the astrologer details as a JSON response
    res.status(200).json({ success: true, astrologer });
  } catch (error) {
    console.error("Error fetching Astrologer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Astrologer",
      error: error.message,
    });
  }
};

const CallHistoryOfAstrologer = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const callHistory = await CallHistory.find({
      astrologerId,
      status: "Complete",
    })
      .sort({ _id: -1 })
      .limit(10);

    const enhancedHistory = await Promise.all(
      callHistory.map(async (item) => {
        const { customerId, astrologerId, formId } = item;
        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "email customerName image"
        );
        const intakeDetailes = await LinkedProfile.findById(formId);

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          intakeDetailes,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          chatPrice: item.chatPrice,
          totalChatPrice: item.totalChatPrice,
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
  } catch (error) {
    console.error("Error fetching Call history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Call history",
      error: error.message,
    });
  }
};

const AllCallHistoryOfAstrologer = async (req, res) => {
  try {
    const { astrologerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const callHistory = await CallHistory.find({
      astrologerId,
      status: "Complete",
    }).sort({ _id: -1 });

    const enhancedHistory = await Promise.all(
      callHistory.map(async (item) => {
        const { customerId, astrologerId, formId } = item;
        // Specify the fields to populate from the Customer and Astrologer models
        const customerDetails = await Customers.findById(
          customerId,
          "email customerName image"
        );
        const intakeDetailes = await LinkedProfile.findById(formId);

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          customerDetails,
          intakeDetailes,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          chatPrice: item.chatPrice,
          totalChatPrice: item.totalChatPrice,
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
  } catch (error) {
    console.error("Error fetching Call history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Call history",
      error: error.message,
    });
  }
};

// check wallet balance of astrologer
const checkAstrologerWallet = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    res
      .status(200)
      .json({ success: true, wallet_balance: astrologer.wallet_balance });
  } catch (error) {
    console.error("Error checking astrologer wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer wallet Balance.",
      error: error.message,
    });
  }
};

const getastrologerCallChatCount = async function (req, res) {
  try {
    const { astrologerId } = req.body;

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    var currentDate = new Date();

    // Set the start of the current date
    currentDate.setHours(0, 0, 0, 0);

    // Set the end of the current date
    var nextDate = new Date(currentDate);
    nextDate.setDate(currentDate.getDate() + 1);

    const callData = await CallHistory.find({
      astrologerId,
      createdAt: {
        $gte: currentDate,
        $lt: nextDate,
      },
    });

    const chatData = await ChatHistory.find({
      astrologerId,
      createdAt: {
        $gte: currentDate,
        $lt: nextDate,
      },
    });

    res.status(200).json({
      success: true,
      data: {
        chatCount: chatData.length,
        callCount: callData.length,
      },
    });
  } catch (error) {
    console.error("Error checking astrologer wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to check astrologer wallet Balance.",
      error: error.message,
    });
  }
};

const astrologerHomeBanner = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find({
      bannerFor: "app",
      redirectTo: "astrologer_home",
    });

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

const requestUpdateServiceCharges = async function (req, res) {
  try {
    const {
      astrologerId,
      callPrice,
      chatPrice,
      preferredDays,
      startTime,
      endTime,
    } = req.body;

    const isAlready = await AstrologerRequests.findOne({ astrologerId });

    if (isAlready) {
      return res.status(200).json({
        success: true,
        message: `You already requested.`,
      });
    }

    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    const newAstroRequests = new AstrologerRequests({
      astrologerId,
      chat_price: chatPrice,
      call_price: callPrice,
      startTime,
      endTime,
      preferredDays,
    });

    await newAstroRequests.save();

    res.status(200).json({
      success: true,
      message: `Your request has been sended.`,
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

const updateBasicProfile = async function (req, res) {
  try {
    const {
      astrologerId,
      astrologerName,
      experience,
      language,
      skill,
      expertise,
      long_bio,
    } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }
    if (!!astrologerName) astrologer.astrologerName = astrologerName;
    if (!!experience) astrologer.experience = experience;
    if (!!language) astrologer.language = language;
    if (!!skill) astrologer.skill = skill;
    if (!!expertise) astrologer.expertise = expertise;
    if (!!long_bio) astrologer.long_bio = long_bio;

    uploadAstrologerImage(req, res, async function (err) {
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
        if (req?.files) {
          if (req.files["profileImage"]) {
            const imagePath = req.files["profileImage"][0].path.replace(
              /^.*profileImage[\\/]/,
              "profileImage/"
            );
            astrologer.profileImage = imagePath;
          }
        }
      } catch (error) {
        console.error("Error updating profile image:", error);
        res.status(500).json({
          success: false,
          message: "Failed to update astrologer profile image.",
          error: error.message,
        });
      }
    });

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

const uploadAstrologerImages = configureMulter("profileImage/", [
  { name: "profileImage", maxCount: 1 },
  { name: "id_proof_image", maxCount: 1 },
  { name: "bank_proof_image", maxCount: 1 },
  { name: "pan_proof_image", maxCount: 1 },
]);

const updateBankProfile = function (req, res) {
  uploadAstrologerImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    const {
      astrologerId,
      account_holder_name,
      account_name,
      account_type,
      account_number,
      IFSC_code,
    } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }
    if (!!account_holder_name)
      astrologer.account_holder_name = account_holder_name;
    if (!!account_name) astrologer.account_name = account_name;
    if (!!account_type) astrologer.account_type = account_type;
    if (!!account_number) astrologer.account_number = account_number;
    if (!!IFSC_code) astrologer.IFSC_code = IFSC_code;

    try {
      if (req.files) {
        if (req.files["bank_proof_image"]) {
          astrologer.bank_proof_image = req.files["bank_proof_image"][0].path;
        }
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update astrologer profile image.",
        error: error.message,
      });
    }

    await astrologer.save();
    res.status(200).json({
      success: true,
      message: `Astrologer status updated successfully.`,
      updatedAstrologerData: astrologer,
    });
  });
};

const updateChatNotificationStatus = async function (req, res) {
  try {
    const { astrologerId, status } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.chat_notification = status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer chat status updated successfully.`,
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

const updateCallNotificationStatus = async function (req, res) {
  try {
    const { astrologerId, status } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.call_notification = status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer call status updated successfully.`,
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

const updateLiveNotificationStatus = async function (req, res) {
  try {
    const { astrologerId, status } = req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }

    astrologer.live_notification = status;

    // Save the updated astrologer data
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: `Astrologer live status updated successfully.`,
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

const updateKycDetailes = function (req, res) {
  uploadAstrologerImages(req, res, async function (err) {
    if (err instanceof multer.MulterError) {
      return res
        .status(500)
        .json({ success: false, message: "Multer error", error: err });
    } else if (err) {
      return res
        .status(500)
        .json({ success: false, message: "Error uploading file", error: err });
    }

    const { astrologerId, address, zipCode, state, panCard, aadharNumber } =
      req.body;
    const astrologer = await Astrologer.findById(astrologerId);

    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found." });
    }
    if (!!address) astrologer.address = address;
    if (!!zipCode) astrologer.zipCode = zipCode;
    if (!!state) astrologer.state = state;
    if (!!panCard) astrologer.panCard = panCard;
    if (!!aadharNumber) astrologer.aadharNumber = aadharNumber;

    try {
      if (req.files) {
        if (req.files["id_proof_image"]) {
          astrologer.id_proof_image = req.files["id_proof_image"][0].path;
        }
        if (req.files["pan_proof_image"]) {
          astrologer.pan_proof_image = req.files["pan_proof_image"][0].path;
        }
      }
    } catch (error) {
      console.error("Error updating profile image:", error);
      res.status(500).json({
        success: false,
        message: "Failed to update astrologer profile image.",
        error: error.message,
      });
    }

    await astrologer.save();
    res.status(200).json({
      success: true,
      message: `Astrologer kyc updated successfully.`,
    });
  });
};


export {
  getSplash,
  addAstrologerInquiry,
  getAllAstrologerInquiry,
  generateRandomCode,
  astrologerLogin,
  verifyAstrologer,
  astrologerGoogleLogin,
  getAstrologerDetail,
  getAllAstrologer,
  getActiveAstrologer,
  getEnquiredAstrologer,
  astrologersWalletBalance,
  getAverageRating,
  countCustomersWithReviews,
  getOnlineAstrologers,
  setAstrologerOnline,
  getLiveAstrologers,
  updateAstrologerDetails,
  updateChatPrice,
  updateCallPrice,
  updateAstrologerProfileImage,
  addBankAccount,
  logoutAstrologer,
  addOngoingChat,
  getAllOngoingChats,
  getOngoingChatById,
  deleteOngoingChatById,
  addToWaitingList,
  getAllWaitingListEntries,
  deleteFromWaitingList,
  getWaitingListByIdFromBody,
  getAllVerifiedAstrologers,
  verifyAstrologerProfile,
  changeAstrologerStatus,
  changeChatStatus,
  changeCallStatus,
  changePrefferDays,
  changePrefferTime,
  changeEnquiryStatus,
  checkChatStatus,
  checkCallStatus,
  sendNotificationToAstrologer,
  getRecommededAstrologers,
  chatHistoryOfAstrologer,
  callNotificationToAstrologer,
  checkCallChatStatus,
  CallHistoryOfAstrologer,
  AllCallHistoryOfAstrologer,
  checkAstrologerWallet,
  getastrologerCallChatCount,
  astrologerHomeBanner,
  requestUpdateServiceCharges,
  updateBasicProfile,
  updateBankProfile,
  updateChatNotificationStatus,
  updateCallNotificationStatus,
  updateLiveNotificationStatus,
  updateKycDetailes
}