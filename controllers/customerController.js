import Customers from "../models/customerModel/Customers.js";
import mongoose from "mongoose";
import multer from "multer";
import configureMulter from "../configureMulter.js";
import path from "path";
import { v4 as uuidv4 } from "uuid";
import File from "../models/customerModel/File.js";
import Astrologer from "../models/adminModel/Astrologer.js";
import AdminEarning from "../models/adminModel/AdminEarning.js";
import CustomerWallet from "../models/customerModel/CustomerWallet.js";
import AstrologerWallet from "../models/astrologerModel/AstrologerWallet.js";
import Review from "../models/adminModel/Review.js";
import LinkedProfile from "../models/customerModel/LinkedProfile.js";
import RechargeWallet from "../models/customerModel/RechargeWallet.js";
import CustomerNotification from "../models/adminModel/CustomerNotification.js";
import FirstRechargeOffer from "../models/adminModel/FirstRechargeOffer.js";
import RechargePlan from "../models/adminModel/RechargePlan.js";
import sendNotification from "../notificationService.js";
import ChatHistory from "../models/adminModel/ChatHistory.js";
import CallHistory from "../models/adminModel/CallHistory.js";
import Banners from "../models/adminModel/Banners.js";
import crypto from "crypto";
import { database } from "../config/firebase.js";
import LiveStreaming from "../models/adminModel/LiveStreaming.js";
import { postRequest } from "../utils/apiRequests.js";
import Gift from "../models/adminModel/Gift.js";
import LiveCalls from "../models/adminModel/LiveCalls.js";
import Testimonial from "../models/adminModel/Testimonal.js";
import Blogs from "../models/adminModel/Blogs.js";

const uploadCustomerSignupImage = configureMulter("customerImage/", [
  { name: "image", maxCount: 1 },
]);

const uploadFile = configureMulter("uploads/", [
  { name: "filePath", maxCount: 1 },
]);

const uploadCustomerImage = configureMulter("uploads/customerImage/", [
  { name: "image", maxCount: 1 },
]);

const customerSignup = function (req, res) {
  uploadCustomerSignupImage(req, res, async function (err) {
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
        customerName,
        phoneNumber,
        gender,
        wallet,
        city,
        state,
        country,
        zipCode,
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
      } = req.body;

      // Validate required fields
      const missingFields = [
        "customerName",
        "phoneNumber",
        "gender",
        "city",
        "state",
        "country",
        "zipCode",
        "dateOfBirth",
        "timeOfBirth",
        "placeOfBirth",
      ].filter((field) => !req.body[field]);

      if (missingFields.length > 0) {
        return res.status(400).json({
          success: false,
          message: `Please provide ${missingFields.join(", ")}.`,
        });
      }

      const imagePath = req.files["image"]
        ? req.files["image"][0].path.replace(
          /^.*customerImage[\\/]/,
          "customerImage/"
        )
        : "";

      const existingCustomer = await Customers.findOne({ phoneNumber });

      if (existingCustomer) {
        return res.status(400).json({
          success: false,
          isSignupCompleted: 1,
          message: "Customer already exists.",
        });
      }

      const newCustomer = new Customers({
        customerName,
        phoneNumber,
        gender,
        image: imagePath,
        city,
        state,
        country,
        zipCode,
        dateOfBirth,
        timeOfBirth,
        placeOfBirth,
        wallet,
      });

      await newCustomer.save();

      res.status(201).json({
        success: true,
        isSignupCompleted: 1,
        message: "Customer created successfully.",
        data: newCustomer,
      });
    } catch (error) {
      console.error("Error creating customer:", error);
      res.status(500).json({
        success: false,
        message: "Failed to create customer.",
        error: error.message,
      });
    }
  });
};

function generateRandomCode() {
  return Math.floor(1000 + Math.random() * 9000);
}

const customerLogin = async function (req, res) {
  try {
    const { phoneNumber } = req.body;
    const otp = await generateRandomCode();
    if (!phoneNumber) {
      return res.status(400).json({
        success: false,
        message: `Please provide phoneNumber`,
      });
    }
    let customer = await Customers.findOne({ phoneNumber });
    if (customer) {
      const isBanned = customer.banned_status;
      if (isBanned) {
        return res.status(200).json({
          success: false,
          status: 0,
          message: "You are banned, Please contact admin.",
        });
      }
      return res.status(200).json({
        success: true,
        status: 1,
        otp: otp,
        phoneNumber,
        message: "Customer exists. OTP provided.",
      });
    }

    res.status(200).json({
      success: true,
      status: 1,
      otp: otp,
      phoneNumber,
      message: "New customer added. OTP provided.",
    });
  } catch (error) {
    console.error("Error during login:", error);
    res
      .status(500)
      .json({ success: false, message: "Login failed", error: error.message });
  }
};

const verifyCustomer = async function (req, res) {
  try {
    const { phoneNumber, fcmToken, device_id } = req.body;
    const missingFields = [];

    if (!phoneNumber) {
      missingFields.push("phoneNumber");
    }
    if (!fcmToken) {
      missingFields.push("fcmToken");
    }

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please provide ${missingFields.join(", ")}.`,
      });
    }
    let customer = await Customers.findOne({ phoneNumber });
    if (customer) {
      const deviceToken = customer?.fcmToken;
      if (deviceToken) {
        const notification = {
          title: "FortuneTalk",
          body: "You are logged in new device",
        };
        const data = {
          type: "new_login",
        };

        await sendNotification.sendNotification(
          deviceToken,
          notification,
          data
        );
      }

      customer.fcmToken = fcmToken;
      customer.device_id = device_id;

      await customer.save();

      return res.status(200).json({
        success: true,
        message: "Customer verified successfully.",
        customer,
        type: 'home'
      });

    } else {
      customer = new Customers({
        fcmToken,
        phoneNumber,
        device_id,
        status: 1,
        image: "customerImage/user_default.jpg",
      });
      await customer.save();
      return res.status(200).json({
        success: true,
        message: "Customer verified successfully.",
        customer: customer,
        type: 'signup'
      });
    }
  } catch (error) {
    console.error("Error during customer verification:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};

const customerGoogleLogin = async function (req, res) {
  try {
    const { email, fcmToken, device_id, customerName } = req.body;

    if (!email) {
      return res.status(200).json({
        success: false,
        message: "email address is required",
      });
    }

    // Find the customer by phone number, FCM token, and OTP
    let customer = await Customers.findOne({ email });

    if (customer) {
      const isBanned = customer.banned_status;

      if (isBanned) {
        return res.status(200).json({
          success: false,
          status: 0,
          message: "You are banned, Please contact admin.",
        });
      }

      customer.customerName = customerName;
      customer.email = email;
      customer.fcmToken = fcmToken;
      customer.device_id = device_id;

      await customer.save();

      const deviceToken = customer?.fcmToken;

      if (deviceToken) {
        const notification = {
          title: "FortuneTalk",
          body: "You are logged in new device",
        };
        const data = {
          type: "new_login",
        };

        await sendNotification.sendNotification(
          deviceToken,
          notification,
          data
        );
      }

      return res.status(200).json({
        success: true,
        message: "You logged successfully",
        customer,
      });
    }

    customer = new Customers({
      email,
      fcmToken,
      device_id,
      customerName,
      status: 1,
      image: "customerImage/user_default.jpg",
    });
    await customer.save();

    res.status(200).json({
      success: true,
      status: 1,
      customer,
      message: "You logged successfully",
    });
  } catch (error) {
    console.error("Error during customer verification:", error);
    res.status(500).json({
      success: false,
      message: "Verification failed",
      error: error.message,
    });
  }
};

const getCustomersDetail = async function (req, res) {
  try {
    const { customerId, unique_id } = req.body;

    const existingCustomer = await Customers.findOne({ _id: customerId });

    if (!existingCustomer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found." });
    }

    existingCustomer.unique_id = unique_id;

    await existingCustomer.save();

    const customersDetail = await Customers.findOne({ _id: customerId });

    res.status(200).json({
      success: true,
      message: "Unique ID stored and customer details:",
      customersDetail,
    });
  } catch (error) {
    console.error("Error updating unique ID for customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update unique ID for customer",
      error: error.message,
    });
  }
};

//get all customer list
const getAllCustomers = async function (req, res) {
  try {
    // Fetch all Customer from the database
    const customers = await Customers.find();

    // Return the list of Customer as a JSON response
    res.status(200).json({ success: true, customers });
  } catch (error) {
    console.error("Error fetching Customers:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Customers",
      error: error.message,
    });
  }
};

// get customer review
const getCustomersReview = async function (req, res) {
  try {
    const { astrologerId } = req.query; // Get astrologerId from query parameters

    let query = {}; // Define an empty query object

    // Check if astrologerId is provided
    if (astrologerId) {
      query = { astrologer: astrologerId }; // If provided, filter by astrologerId
    }

    // Fetch all reviews based on the query
    const reviews = await Review.find(query);

    // Return the list of reviews as a JSON response
    res.status(200).json({ success: true, reviews });
  } catch (error) {
    console.error("Error fetching Reviews:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Reviews",
      error: error.message,
    });
  }
};

// file store

const storeFile = function (req, res) {
  uploadFile(req, res, async function (err) {
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
      const { fileType } = req.body;

      // Validate required fields
      if (!fileType) {
        return res.status(400).json({
          success: false,
          message: "Please provide a fileType.",
          data: {
            fileType: newFile.fileType,
            filePath: newFile.filePath,
          },
        });
      }

      const filePath = req.files["filePath"]
        ? req.files["filePath"][0].path.replace(/^.*uploads[\\/]/, "uploads/")
        : "";

      // Create a new file entry in the Customers collection
      const newFile = new File({ fileType, filePath });
      await newFile.save();

      res.status(201).json({
        success: true,
        message: "File uploaded successfully.",
        data: newFile,
      });
    } catch (error) {
      console.error("Error uploading File:", error);
      res.status(500).json({
        success: false,
        message: "Failed to upload File.",
        error: error.message,
      });
    }
  });
};
// deduct wallet for chat

const calculateAndDeductChatPrice = async (req, res) => {
  try {
    const { customerId, astrologerId, startTime, endTime } = req.body;

    // const startDate = new Date(startTime);
    // const endDate = new Date(endTime);

    let startDate, endDate;

    // Check if startTime and endTime include only time (HH:mm:ss)
    if (startTime.includes(":") && endTime.includes(":")) {
      const today = new Date().toISOString().split("T")[0]; // Get current date

      startDate = new Date(`${today}T${startTime}.000Z`); // Concatenate time with today's date
      endDate = new Date(`${today}T${endTime}.000Z`);
    } else {
      // Parse the provided date-time format
      startDate = new Date(startTime);
      endDate = new Date(endTime);
    }

    const durationInMilliseconds = endDate - startDate;
    const durationInSeconds = durationInMilliseconds / 1000;
    // Check if customerId exists in Customers table
    const customer = await Customers.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Check if astrologerId exists in Astrologer table
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    // Check if astrologer has chat_price defined
    if (astrologer.chat_price === undefined || astrologer.chat_price === null) {
      return res.status(400).json({
        success: false,
        message: "Chat price not defined for the astrologer",
      });
    }

    const chatPricePerSecond = astrologer.chat_price / 60; // Assuming price is per minute
    const totalChatPrice = parseFloat(
      (durationInSeconds * chatPricePerSecond).toFixed(2)
    );

    if (customer.wallet_balance < totalChatPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    // Deduct balance from the Customer schema
    customer.wallet_balance -= totalChatPrice;

    // Update Customer's wallet balance
    await customer.save();

    //  chat history data stored
    const chatHistory = new ChatHistory({
      customerId,
      astrologerId,
      startTime,
      endTime,
      durationInSeconds,
      totalChatPrice,
    });

    // Save chat history entry
    await chatHistory.save();

    // Update Astrologer's wallet balance
    astrologer.wallet_balance += totalChatPrice;
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: "Chat price deducted and added to astrologer successfully",
      remainingBalance: customer.wallet_balance.toFixed(2),
    });
  } catch (error) {
    console.error("Error deducting chat price:", error);
    res.status(500).json({
      success: false,
      message: "Failed to deduct chat price",
      error: error.message,
    });
  }
};

const updateChatHistoryAndBalances = async (req, res) => {
  try {
    const { chatHistoryId, startTime, endTime } = req.body;

    const existingChatHistory = await ChatHistory.findById(chatHistoryId);
    if (!existingChatHistory) {
      return res
        .status(404)
        .json({ success: false, message: "Chat history not found" });
    }

    const startDate = new Date(startTime);
    const endDate = new Date(endTime);

    const durationInMilliseconds = endDate - startDate;
    const durationInSeconds = durationInMilliseconds / 1000;

    const astrologer = await Astrologer.findById(
      existingChatHistory.astrologerId
    );
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    if (astrologer.chat_price === undefined || astrologer.chat_price === null) {
      return res.status(400).json({
        success: false,
        message: "Chat price not defined for the astrologer",
      });
    }

    const chatPricePerSecond = astrologer.chat_price / 60; // Assuming price is per minute
    const totalChatPrice = parseFloat(
      (durationInSeconds * chatPricePerSecond).toFixed(2)
    );

    const customer = await Customers.findById(existingChatHistory.customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    if (customer.wallet_balance < totalChatPrice) {
      return res
        .status(400)
        .json({ success: false, message: "Insufficient balance" });
    }

    customer.wallet_balance -= totalChatPrice;
    await customer.save();

    astrologer.wallet_balance += totalChatPrice;
    await astrologer.save();

    existingChatHistory.startTime = startTime;
    existingChatHistory.endTime = endTime;
    existingChatHistory.durationInSeconds = durationInSeconds;
    existingChatHistory.totalChatPrice = totalChatPrice;
    await existingChatHistory.save();

    res.status(200).json({
      success: true,
      message: "Chat history and balances updated successfully",
      remainingBalance: customer.wallet_balance.toFixed(2),
    });
  } catch (error) {
    console.error("Error updating chat history and balances:", error);
    res.status(500).json({
      success: false,
      message: "Failed to update chat history and balances",
      error: error.message,
    });
  }
};

// Linked profile
const linkedProfile = async function (req, res) {
  try {
    const {
      customerId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      maritalStatus,
      topic_of_concern,
      longitude,
      latitude,
    } = req.body;

    // Validate required fields
    const requiredFields = [
      "customerId",
      "firstName",
      "lastName",
      "gender",
      "dateOfBirth",
      "timeOfBirth",
      "placeOfBirth",
      "latitude",
      "longitude",
      "maritalStatus",
      "topic_of_concern",
    ];
    const missingFields = requiredFields.filter((field) => !req.body[field]);

    if (missingFields.length > 0) {
      return res.status(400).json({
        success: false,
        message: `Please provide ${missingFields.join(", ")}.`,
      });
    }

    // Check if the customerId exists in the Customers collection
    const existingCustomer = await Customers.findById(customerId);

    if (!existingCustomer) {
      return res.status(400).json({
        success: false,
        message: "Customer does not exist. Profile cannot be added.",
      });
    }

    // Create a new profile in the LinkedProfile collection
    const newProfileData = {
      customerId,
      firstName,
      lastName,
      gender,
      dateOfBirth,
      timeOfBirth,
      placeOfBirth,
      maritalStatus,
      topic_of_concern,
      latitude,
      longitude,
    };

    // Create a new instance of LinkedProfile model
    const newProfile = new LinkedProfile(newProfileData);

    // Save the new profile to the database
    await newProfile.save();

    res.status(201).json({
      success: true,
      message: "Profile created successfully.",
      data: newProfile?._id,
    });
  } catch (error) {
    console.error("Error creating Profile:", error);
    res.status(500).json({
      success: false,
      message: "Failed to create Profile.",
      error: error.message,
    });
  }
};

const updateCustomerDetails = async function (req, res) {
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
      const { customerId } = req.body; // Destructure customerId from req.body

      const existingCustomer = await Customers.findById(customerId);

      if (!existingCustomer) {
        return res
          .status(404)
          .json({ success: false, message: "Customer not found." });
      }

      const {
        customerName,
        gender,
        dateOfBirth,
        placeOfBirth,
        timeOfBirth,
        email,
        alternateNumber,
        city,
        state,
        country,
        zipCode,
        latitude,
        longitude,
      } = req.body;

      const address = {
        city: city,
        state: state,
        country: country,
        birthPlace: placeOfBirth,
        zipCode: zipCode,
        latitude,
        longitude
      }

      existingCustomer.customerName =
        customerName || existingCustomer.customerName;
      existingCustomer.gender = gender || existingCustomer.gender;
      existingCustomer.dateOfBirth =
        dateOfBirth || existingCustomer.dateOfBirth;
      existingCustomer.address = address || existingCustomer.address;
      existingCustomer.timeOfBirth =
        timeOfBirth || existingCustomer.timeOfBirth;
      existingCustomer.email = email || existingCustomer.email;
      existingCustomer.alternateNumber =
        alternateNumber || existingCustomer.alternateNumber;

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

const rechargeCustomerWallet = async function (req, res) {
  try {
    const { customerId, amount, firstRechargeId, rechargePlanId } = req.body;

    // Fetch customer by ID
    const customer = await Customers.findById(customerId);

    if (!customer) {
      return res.status(404).json({
        success: false,
        message: "Customer not found.",
      });
    }

    const totalWalletRecharge = (await RechargeWallet.find()).length;
    const invoiceId = `#FORTUNETALK${totalWalletRecharge}`;
    let rechargeAmount = parseFloat(amount);
    const history = {
      customer: customerId,
      invoiceId: invoiceId,
      gst: 18,
      recieptNumber: totalWalletRecharge + 1,
      discount: "",
      offer: "",
      totalAmount: "",
      amount: rechargeAmount,
      paymentMethod: "Online",
    };
    if (!!firstRechargeId) {
      const firstRecharge = await FirstRechargeOffer.findById(firstRechargeId);
      const recharge = firstRecharge.first_recharge_plan_amount;
      const discount = firstRecharge.first_recharge_plan_extra_percent;
      rechargeAmount = recharge + (recharge * discount) / 100;
      history.totalAmount = rechargeAmount;
      history.offer = discount.toString();
      customer.first_wallet_recharged = true;
    } else if (!!rechargePlanId) {
      const plan = await RechargePlan.findById(rechargePlanId);
      const recharge = plan.amount;
      const discount = plan.percentage;
      rechargeAmount = recharge + (recharge * discount) / 100;
      history.totalAmount = rechargeAmount;
      history.offer = discount.toString();
    } else {
      history.totalAmount = rechargeAmount;
    }

    const rechargeTransaction = new RechargeWallet(history);

    await rechargeTransaction.save();
    // Update wallet balance in the Customers schema

    customer.wallet_balance = customer.wallet_balance + rechargeAmount;
    await customer.save();

    const updatedCustomer = await Customers.findById(customerId)

    res.status(200).json({
      success: true,
      message: "Wallet recharge successful.",
      updatedCustomer
    });
  } catch (error) {
    console.error("Error recharging wallet:", error);
    res.status(500).json({
      success: false,
      message: "Failed to recharge wallet.",
      error: error.message,
    });
  }
};

const customersWalletBalance = async function (req, res) {
  try {
    const { customerId } = req.body;

    let query = {};

    if (customerId) {
      query = { customer: customerId };
    }

    // Fetch only the 'wallet_balance' field based on the query
    const walletBalance = await CustomerWallet.find(query).select(
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

const customersWalletHistory = async function (req, res) {
  try {
    const { customerId } = req.body;

    // Fetch only the 'wallet_balance' field based on the query
    const walletHistory = await RechargeWallet.find({ customer: customerId });

    res.status(200).json({ success: true, walletHistory });
  } catch (error) {
    console.error("Error fetching Wallet Balance:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Wallet Balance",
      error: error.message,
    });
  }
};

const getCustomerAllFirstRechargeOffer = async function (req, res) {
  try {
    const allFirstRechargeOffer = await FirstRechargeOffer.find({
      first_recharge_status: "Active",
    });

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

const getCustomerAllRechargePlan = async function (req, res) {
  try {
    const allRechargePlan = await RechargePlan.find({
      recharge_status: "Active",
    });

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

// get all linked profile
const getallLinkedProfile = async function (req, res) {
  const { customerId } = req.body;

  try {
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "CustomerId is required." });
    }

    const linkedProfileData = await LinkedProfile.find({ customerId });

    if (!linkedProfileData || linkedProfileData.length === 0) {
      return res.status(404).json({
        success: false,
        message: "Linked profile data not found for the given customerId.",
      });
    }

    res.status(200).json({ success: true, data: linkedProfileData });
  } catch (error) {
    console.error("Error fetching linked profile data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch linked profile data.",
      error: error.message,
    });
  }
};

// Send notification to Customer
const sendNotificationToCustomer = async (req, res) => {
  try {
    const { astrologerId, customerId } = req.body;
    const customer = await Customers.findById(customerId);
    const customerFCMToken = customer?.fcmToken;
    const astrologer = await Astrologer.findById(astrologerId);

    const astrologerData = {
      notificationBody: "Astrologer is responding for your chat request.",
      astrologerName: astrologer?.astrologerName,
      profileImage: astrologer?.profileImage,
      astrologer_id: astrologerId,
      chat_price: astrologer?.chat_price,
      type: "Chat Request",
      priority: "High",
    };

    const deviceToken = customerFCMToken;

    const title = `Response of Chat request from ${astrologerData.astrologerName || "an Astrologer."
      }`;
    const notification = {
      title,
      body: astrologerData,
    };

    astrologer.chatStatus = "busy";
    await astrologer.save();

    await sendNotification.sendNotification(deviceToken, notification);

    res.status(200).json({
      success: true,
      message:
        "Notification sent successfully to the customer. Astrologer status updated to busy.",
    });
  } catch (error) {
    console.error("Failed to send notification to the customer:", error);
    res.status(500).json({
      success: false,
      message: "Failed to send notification to the customer.",
      error: error.message,
    });
  }
};

// initiate call
const initiateCall = async (req, res) => {
  try {
    const { formId, customerId, astrologerId, callPrice } = req.body;

    // Fetch customer data
    const customer = await Customers.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Fetch astrologer data
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    // Fetch data from LinkedProfile based on provided formId and customerId association
    const linkedProfile = await LinkedProfile.findOne({
      _id: formId,
      customerId: customerId,
    });

    if (!linkedProfile) {
      return res.status(404).json({
        success: false,
        message: "LinkedProfile not found for this Customer ID and ID",
      });
    }

    const totalCall = await CallHistory.find();
    const inoiceId = "NAMO" + totalCall.length.toString();

    // Create a new entry in CallHistory table
    const newCall = new CallHistory({
      formId: formId,
      customerId: customerId,
      astrologerId: astrologerId,
      callPrice: callPrice,
      transactionId: inoiceId,
      commissionPrice: astrologer?.commission_call_price,
    });

    // Save the new call entry to the database

    await newCall.save();

    if (astrologer?.call_notification) {
      const astrologerFCMToken = astrologer?.fcmToken;

      const deviceToken = astrologerFCMToken;

      const title = `Call request from ${customer?.customerName || "a customer"
        }`;
      const notification = {
        title,
        body: "Customer is Requesting for call",
      };
      const data = {
        customerName: customer?.customerName,
        customerImage: customer?.image,
        user_id: customerId,
        wallet_balance: customer?.wallet_balance,
        type: "call_request",
        priority: "high",
        invoiceId: inoiceId,
        astroID: astrologerId,
      };

      await sendNotification.sendNotification(
        deviceToken,
        notification,
        data
      );
    }

    res.status(200).json({
      success: true,
      message: "Data retrieved and saved successfully",
      newCall,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const createCall = async (req, res) => {
  try {
    const {
      appid,
      call_id,
      caller,
      create_time,
      event,
      nonce,
      payload,
      signature,
      timestamp,
      user_ids,
    } = req.body;
    const secret = "50b5c028f7a594e4b6eab83bd81067ad"; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature) {
      const parsedPayload = JSON.parse(payload);
      const callData = JSON.parse(parsedPayload?.data);
      if (event === "call_create") {
        console.log("callId", call_id);
        const existingCall = await CallHistory.findOne({
          transactionId: callData?.custom_data?.transId,
        });
        existingCall.callId = call_id;
        // Save the new call entry to the database
        await existingCall.save();
      }
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const timeoutCall = async (req, res) => {
  try {
    const {
      appid,
      call_id,
      caller,
      create_time,
      event,
      nonce,
      payload,
      signature,
      timestamp,
      user_ids,
    } = req.body;

    const secret = process.env.CALL_SECRET; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "timeout_cancel") {
      const callData = await CallHistory.findOne({ callId: call_id });
      callData.status = "Not Connected";
      database.ref(`OnGoingCall/${callData?.astrologerId}`).remove();
      await callData.save();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const cancelCall = async (req, res) => {
  try {
    const {
      appid,
      call_id,
      caller,
      create_time,
      event,
      nonce,
      payload,
      signature,
      timestamp,
      user_ids,
    } = req.body;

    const secret = "50b5c028f7a594e4b6eab83bd81067ad"; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "call_cancel") {
      const callData = await CallHistory.findOne({ callId: call_id });
      callData.status = "Not Connected";
      database.ref(`OnGoingCall/${callData?.astrologerId}`).remove();
      await callData.save();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const acceptCall = async (req, res) => {
  try {
    const {
      appid,
      call_id,
      caller,
      create_time,
      event,
      nonce,
      payload,
      signature,
      timestamp,
      user_ids,
    } = req.body;

    const secret = "50b5c028f7a594e4b6eab83bd81067ad"; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature) {
      console.log("call id", call_id);
      const callData = await CallHistory.findOne({ callId: call_id });
      console.log(callData);
      callData.status = "Ongoing";
      callData.startTime = new Date().getTime().toString();
      await callData.save();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const rejectCall = async (req, res) => {
  try {
    const {
      appid,
      call_id,
      caller,
      create_time,
      event,
      nonce,
      payload,
      signature,
      timestamp,
      user_ids,
    } = req.body;

    const secret = "50b5c028f7a594e4b6eab83bd81067ad"; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "call_reject") {
      const callData = await CallHistory.findOne({ callId: call_id });
      callData.status = "Declined";
      database.ref(`OnGoingCall/${callData?.astrologerId}`).remove();
      await callData.save();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const disconectCall = async (req, res) => {
  try {
    // console.log('discon', req.body)
    res.status(200).json({
      success: true,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

function getNextPerfectMinute(seconds) {
  const secondsInMinute = 60;
  const secondsToNextMinute = secondsInMinute - (seconds % secondsInMinute);
  const nextPerfectMinute = seconds + secondsToNextMinute;
  return nextPerfectMinute;
}

const endCall = async (req, res) => {
  try {
    const {
      appid,
      room_id,
      event,
      nonce,
      room_session_id,
      close_reason,
      room_close_time,
      signature,
      timestamp,
    } = req.body;

    const secret = "50b5c028f7a594e4b6eab83bd81067ad"; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "room_close") {
      const callId = room_id.replace(/^\d+(?=namo)/i, "");
      const callData = await CallHistory.findOne({ transactionId: callId });
      const customer = await Customers.findOne({ _id: callData?.customerId });
      const astrologer = await Astrologer.findOne({
        _id: callData?.astrologerId,
      });
      const startTime = parseInt(callData.startTime);
      const endTime = new Date().getTime();
      let totalSeconds = (endTime - startTime) / 1000;

      totalSeconds = getNextPerfectMinute(totalSeconds);

      if (customer?.new_user) {
        if (totalSeconds > 300) {
          totalSeconds = 300 - totalSeconds;
        } else {
          totalSeconds = 0;
        }
      }

      const totalTime = totalSeconds / 60;
      const callPrice = parseFloat(callData?.callPrice);
      const totalPrice = totalTime * callPrice;
      if (totalTime == NaN) {
        return res.status(200).json({
          success: false,
        });
      }

      let commissionPrice = 0

      if (callData?.commissionPrice) {
        commissionPrice = (totalPrice / callData?.commissionPrice).toFixed(2);
      }

      const astrologerPrice = totalPrice - commissionPrice

      astrologer.total_minutes += totalTime;
      astrologer.wallet_balance += astrologerPrice;
      customer.wallet_balance -= totalPrice;
      customer.new_user = false;
      callData.totalCallPrice = totalPrice;
      callData.durationInSeconds = totalSeconds;
      callData.endTime = new Date().getTime().toString();
      callData.status = "Complete";

      const adminEarnings = new AdminEarning({
        type: "call",
        astrologerId: callData?.astrologerId,
        customerId: callData?.customerId,
        transactionId: callId,
        totalPrice: totalPrice,
        adminPrice: commissionPrice,
        partnerPrice: astrologerPrice,
        historyId: callData?._id,
        duration: totalSeconds.toFixed(0),
        startTime: startTime.toString(),
        endTime: endTime.toString(),
      });

      database.ref(`OnGoingCall/${callData?.astrologerId}`).remove();

      await adminEarnings.save();
      await astrologer.save();
      await customer.save();
      await callData.save();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const getCallData = async (req, res) => {
  try {
    const { trans_id } = req.body;

    const callData = await CallHistory.findOne({ transactionId: trans_id });
    // const hashedStr = sha1(tmpStr); // Assuming you have a sha1 function available.

    if (callData) {
      res.status(200).json({
        success: true,
        callData,
      });
    } else {
      res.status(200).json({
        success: false,
        callData: null,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

// intitate chat
const initiateChat = async (req, res) => {
  try {
    const { formId, customerId, astrologerId, chatPrice } = req.body;

    // Fetch customer data
    const customer = await Customers.findById(customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    // Fetch astrologer data
    const astrologer = await Astrologer.findById(astrologerId);
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    // Fetch data from LinkedProfile based on provided formId and customerId association
    const linkedProfile = await LinkedProfile.findOne({
      _id: formId,
      customerId: customerId,
    });

    if (!linkedProfile) {
      return res.status(404).json({
        success: false,
        message: "LinkedProfile not found for this Customer ID and ID",
      });
    }

    // Calculate chat duration in minutes
    //  const startTimestampInSeconds = Math.floor(new Date(startTime).getTime() / 1000); // Convert milliseconds to seconds
    // const endTimestampInSeconds = Math.floor(new Date(endTime).getTime() / 1000); // Convert milliseconds to seconds
    // const durationInSeconds = endTimestampInSeconds - startTimestampInSeconds;

    // Create a new entry in CallHistory table

    const totalChat = await ChatHistory.find();
    let inoiceId = "FORTUNETALK" + totalChat.length.toString();
    const newChat = new ChatHistory({
      formId,
      customerId,
      astrologerId,
      chatPrice,
      transactionId: inoiceId,
      commissionPrice: astrologer?.commission_chat_price,
    });

    // Save the new call entry to the database
    if (astrologer?.chat_notification) {
      const astrologerFCMToken = astrologer?.fcmToken;

      const deviceToken = astrologerFCMToken;

      const title = `Chat request from ${customer?.customerName || "a customer"
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
        type: "chat_request",
        priority: "High",
        invoiceId: inoiceId,
        astroID: astrologerId,
      };

      await sendNotification.sendNotification(
        deviceToken,
        notification,
        data
      );
    }
    await newChat.save();

    res.status(200).json({
      success: true,
      message: "Data retrieved and saved successfully",
      newChat,
    });
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

// Customer chat history
const chatHistoryOfCustomer = async (req, res) => {
  try {
    const { customerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const chatHistory = await ChatHistory.find({
      customerId,
      durationInSeconds: { $exists: true, $ne: "" },
    })
      .populate({
        path: "formId", // Assuming 'formId' is the field referencing LinkedProfile
        select: "-_id -__v", // Exclude fields like id and _v from LinkedProfile
      })
      .populate({
        path: "astrologerId",
        select:
          "_id astrologerName gender profileImage phoneNumber chat_price commission_chat_price", // Exclude fields like id and _v from LinkedProfile
      });

    if (!chatHistory || chatHistory.length === 0) {
      return res.status(404).json({
        success: false,
        message: "No chat history found for this Customer",
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

// deduct wallet for Call

const calculateAndDeductCallPrice = async (req, res) => {
  try {
    const { callHistoryId, startTime, endTime, duration } = req.body;

    // const startDate = new Date(startTime);
    // const endDate = new Date(endTime);

    // let startDate, endDate;

    const existingCallHistory = await CallHistory.findById(callHistoryId);
    if (!existingCallHistory) {
      return res
        .status(404)
        .json({ success: false, message: "Call history not found" });
    }

    const astrologer = await Astrologer.findById(
      existingCallHistory.astrologerId
    );
    if (!astrologer) {
      return res
        .status(404)
        .json({ success: false, message: "Astrologer not found" });
    }

    // if (astrologer.chat_price === undefined || astrologer.chat_price === null) {
    //   return res.status(400).json({ success: false, message: 'Chat price not defined for the astrologer' });
    // }

    const durationInSeconds = duration;

    const customer = await Customers.findById(existingCallHistory.customerId);
    if (!customer) {
      return res
        .status(404)
        .json({ success: false, message: "Customer not found" });
    }

    const callPricePerMin = existingCallHistory.callPrice; // Assuming price is per minute
    const totalCallPrice = parseFloat(
      ((durationInSeconds / 60) * callPricePerMin).toFixed(2)
    );

    // Deduct balance from the Customer schema
    customer.wallet_balance -= totalCallPrice;

    // Update Customer's wallet balance
    await customer.save();

    //  call history data stored
    const callHistory = new CallHistory({
      startTime,
      endTime,
      durationInSeconds,
      totalCallPrice,
    });

    // Save call history entry
    await callHistory.save();

    // Update Astrologer's wallet balance
    astrologer.wallet_balance += totalCallPrice;
    await astrologer.save();

    res.status(200).json({
      success: true,
      message: "Call price deducted and added to astrologer successfully",
      remainingBalance: customer.wallet_balance.toFixed(2),
    });
  } catch (error) {
    console.error("Error deducting call price:", error);
    res.status(500).json({
      success: false,
      message: "Failed to deduct call price",
      error: error.message,
    });
  }
};

// Customer Call history
const CallHistoryOfCustomer = async (req, res) => {
  try {
    const { customerId } = req.body;

    // Find all chat history entries associated with the provided Customer id
    const callHistory = await CallHistory.find({
      customerId,
    }).sort({ _id: -1 });

    const enhancedHistory = await Promise.all(
      callHistory.map(async (item) => {
        const { customerId, astrologerId, formId } = item;

        // Specify the fields to populate from the Customer and Astrologer models
        const astrologerDetails = await Astrologer.findById(
          astrologerId,
          "astrologerName profileImage"
        );
        const intakeDetailes = await LinkedProfile.findById(formId);

        return {
          _id: item._id,
          formId: item.formId,
          customerId,
          astrologerId,
          astrologerDetails,
          intakeDetailes,
          transactionId: item?.transactionId,
          callId: item?.callId,
          startTime: item.startTime,
          endTime: item.endTime,
          durationInSeconds: item.durationInSeconds,
          callPrice: item.callPrice,
          totalCallPrice: item.totalCallPrice,
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
  } catch (error) {
    console.error("Error fetching Call history:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Call history",
      error: error.message,
    });
  }
};

const customerHomeBanner = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find({
      bannerFor: "app",
      redirectTo: "customer_home",
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

const astrologerDetailesBanner = async function (req, res) {
  try {
    // Fetch all Banners from the database
    const banners = await Banners.find({
      bannerFor: "app",
      redirectTo: "astrologer_profile",
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

const getCustmerNotification = async function (req, res) {
  const { customerId } = req.body;

  try {
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "CustomerId is required." });
    }

    const notification = await CustomerNotification.find({
      "customerIds.customerId": customerId,
    });

    if (!notification || notification.length === 0) {
      return res.status(200).json({
        success: false,
        message: "Linked profile data not found for the given customerId.",
      });
    }

    let unreadMessage = 0;

    const enhancedHistory = await Promise.all(
      notification.map(async (item) => {
        let notificationStatus;
        for (read of item?.customerIds) {
          if (read?.customerId == customerId) {
            notificationStatus = read?.notificationRead;
            if (!notificationStatus) {
              unreadMessage++;
            }
            break;
          }
        }
        return {
          _id: item._id,
          title: item?.title,
          description: item?.description,
          image: item?.image,
          notificationStatus,
          createdAt: item.createdAt,
          updatedAt: item.updatedAt,
          __v: item.__v,
        };
      })
    );

    res.status(200).json({
      success: true,
      data: enhancedHistory,
      unreadMessage: unreadMessage,
    });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
      error: error.message,
    });
  }
};

const updateCustomerNotification = async function (req, res) {
  try {
    const { customerId, notificationId } = req.body;
    if (!customerId) {
      return res
        .status(400)
        .json({ success: false, message: "CustomerId is required." });
    }

    const notification = await CustomerNotification.findById(notificationId);

    if (!notification) {
      return res.status(404).json({
        success: false,
        message: "Notification not found.",
      });
    }

    // Check if notification has customerIds property
    if (!notification.customerIds || !Array.isArray(notification.customerIds)) {
      return res.status(500).json({
        success: false,
        message: "Invalid notification data.",
      });
    }

    for (const d of notification.customerIds) {
      if (d.customerId == customerId) {
        d.notificationRead = true;
        break;
      }
    }
    await notification.save();
    res.status(200).json({ success: true, message: "Updated" });
  } catch (error) {
    console.error("Error fetching notification:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch notification",
      error: error.message,
    });
  }
};

const initateLiveStreaming = async (req, res) => {
  try {
    const { astrologerId } = req.body;
    if (!mongoose.Types.ObjectId.isValid(astrologerId)) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid astrologerId" });
    }

    const astrologer = await Astrologer.findById(astrologerId)

    if (!astrologer) {
      return res
        .status(400)
        .json({ success: false, message: "Invalid astrologerId" });
    }


    const totalChat = await LiveStreaming.find().countDocuments();
    let liveId = "FORTUNETALK_LIVE_" + totalChat.toString();

    const liveStreaming = new LiveStreaming({
      astrologerId,
      liveId,
      vedioCallPrice: 2,
      voiceCallPrice: 2
    })

    await liveStreaming.save()

    return res
      .status(200)
      .json({ success: true, liveId });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const createLiveRoom = async (req, res) => {
  try {
    const {
      appid,
      event,
      nonce,
      room_id,
      room_session_id,
      room_create_time,
      signature,
      timestamp,
      id_name,
    } = req.body;
    const secret = 'e56d582777ee4ee902cb0f69016343d0'; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "room_create") {
      const roomData = await LiveStreaming.findOne({ liveId: room_id })
      roomData.status = 'Ongoing';
      roomData.startTime = new Date()
      await roomData.save()
      const refs = database.ref(`LiveStreaming/${room_id}`)
      database.ref(`LiveStreaming/${room_id}`).set({
        WaitingList: "null",
        coHostData: "null"
      })
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const endLiveStreaming = async (req, res) => {
  try {
    const {
      appid,
      event,
      nonce,
      room_id,
      room_session_id,
      room_close_time,
      signature,
      timestamp,
      id_name,
    } = req.body;
    const secret = 'e56d582777ee4ee902cb0f69016343d0'; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "room_close") {
      const roomData = await LiveStreaming.findOne({ liveId: room_id })
      roomData.status = 'Completed';
      roomData.endTime = new Date()
      await roomData.save()
      database.ref(`LiveStreaming/${room_id}`).remove();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const stopLiveStreaming = async (req, res) => {
  try {
    const {
      appid,
      event,
      nonce,
      room_id,
      room_session_id,
      room_close_time,
      signature,
      timestamp,
      id_name,
    } = req.body;


    const secret = 'e56d582777ee4ee902cb0f69016343d0'; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "room_close") {
      const roomData = await LiveStreaming.findOne({ liveId: room_id })
      roomData.status = 'Completed';
      roomData.endTime = new Date()
      await roomData.save()
      database.ref(`LiveStreaming/${room_id}`).remove();
      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const getLiveStreaming = async (req, res) => {
  try {

    const liveAstrologer = await LiveStreaming.find({ status: 'Ongoing' }).populate({
      path: "astrologerId",
      select:
        "_id astrologerName gender profileImage phoneNumber",
    })

    return res
      .status(200)
      .json({ success: true, liveAstrologer });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const sendGiftInLiveStreaming = async (req, res) => {
  try {

    const { liveId, customerId, giftId } = req.body;

    if (!mongoose.Types.ObjectId.isValid(customerId) || !mongoose.Types.ObjectId.isValid(giftId)) {
      return res
        .status(200)
        .json({ success: false, message: "Invalid customerId or giftId" });
    }

    const customer = await Customers.findById(customerId)
    const gift = await Gift.findById(giftId)

    function GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp) {
      const hash = crypto.createHash('md5'); //Use the MD5 hashing algorithm.
      var str = appId + signatureNonce + serverSecret + timeStamp;
      hash.update(str);
      //hash.digest('hex') indicates that the output is in hex format 
      return hash.digest('hex');
    }

    var signatureNonce = crypto.randomBytes(8).toString('hex');
    //Use the AppID and ServerSecret of your project.
    var appId = 581683816;
    var serverSecret = "cd844fce5899541b22d09c10f2a979b9";
    var timeStamp = Math.round(Date.now() / 1000);

    const signature = GenerateUASignature(appId, signatureNonce, serverSecret, timeStamp)

    const message = `${customer?.customerName} send ${gift.gift} gift.`
    const url = `https://rtc-api-bom.zego.im/?Action=SendBarrageMessage&AppId=${appId}&RoomId=${liveId}&UserId=${customerId}&UserName=${customer?.customerName ?? 'User'}&MessageCategory=${2}&MessageContent=${message}&Signature=${signature}&SignatureNonce=${signatureNonce}&SignatureVersion=${"2.0"}&Timestamp=${timeStamp}`
    const response = await postRequest({
      url: url,
      header: 'json',
    })

    if (response?.Code == 0) {
      customer.wallet_balance -= gift.amount;
      await customer.save()
      const updateCustomer = await Customers.findById(customerId)

      let giftData = {
        messageID: response?.Data?.MessageId,
        message: `You send ${gift.gift} gift.`,
        sendTime: new Date().getTime(),
        fromUser: {
          userID: customer?._id,
          userName: customer?.customerName,
        },
      };
      return res
        .status(200)
        .json({ success: true, gift: giftData, updateCustomer });
    }

    return res
      .status(200)
      .json({ success: false });


  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const createLiveCalls = async (req, res) => {
  try {
    const {
      appid,
      event,
      nonce,
      room_id,
      stream_id,
      create_time,
      signature,
      timestamp,
      hdl_url,
      pic_url,
      hls_url,
      rtmp_url,
      publish_name,
      publish_id,
      stream_sid,
      channel_id,
      title,
      user_id
    } = req.body;
    const secret = 'e56d582777ee4ee902cb0f69016343d0'; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "stream_create" && room_id != stream_id) {
      const customer = await Customers.findById(user_id);
      const room = await LiveStreaming.findOne({ liveId: room_id });
      const astrologer = await Astrologer.findById(room?.astrologerId);

      const wallet = customer?.wallet_balance
      const callPrice = 2

      const duration = parseInt((wallet / callPrice) * 60)

      const currentTime = new Date()

      const liveCalls = new LiveCalls({
        roomId: room_id,
        streamId: stream_id,
        customerId: user_id,
        startTime: currentTime,
        maxDuration: duration,
      })

      await liveCalls.save()

      database.ref(`LiveStreaming/${room_id}/coHostData`).update({
        userID: customer?._id,
        streamID: stream_id,
        userName: customer?.customerName,
        img_url: customer?.image,
        startTime: new Date(currentTime).getTime(),
        totalDuration: duration,
      })

      const waitListRef = database.ref(`LiveStreaming/${room_id}/WaitingList`);
      const snapshot = await waitListRef
        .orderByChild('userID')
        .equalTo(user_id)
        .once('value');
      if (snapshot.exists()) {
        const key = Object.keys(snapshot.val())[0]; // Assuming there's only one result
        database.ref(`LiveStreaming/${room_id}/WaitingList/${key}`).update({ callStarted: true })
        // await waitListRef.child(snapshot.key).update({ callStarted: true });
      }

      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};

const endLiveCalls = async (req, res) => {
  try {
    const {
      appid,
      event,
      nonce,
      room_id,
      stream_id,
      signature,
      timestamp,
      stream_sid,
      channel_id,
      title,
      user_id,
      type
    } = req.body;
    const secret = 'e56d582777ee4ee902cb0f69016343d0'; // Use the CallbackSecret obtained from the ZEGO Admin Console.
    const tmpArr = [secret, timestamp, nonce];
    const sortedArr = tmpArr.sort();
    const tmpStr = sortedArr.join("");
    const hashedStr = crypto.createHash("sha1").update(tmpStr).digest("hex"); // Assuming you have a sha1 function available.
    if (hashedStr === signature && event === "stream_close" && room_id != stream_id) {
      const liveCall = await LiveCalls.findOne({ streamId: stream_id })
      const customer = await Customers.findById(user_id);
      const room = await LiveStreaming.findOne({ liveId: room_id });
      const astrologer = await Astrologer.findById(room?.astrologerId);

      const startTime = new Date(liveCall?.startTime).getTime();
      const endTime = new Date().getTime()

      const totalDuration = parseFloat((endTime - startTime) / 60000).toFixed(2)

      const deductedBalance = room?.vedioCallPrice * totalDuration;
      const priceToAdmin = deductedBalance / 2
      const priceToAstrologer = deductedBalance - priceToAdmin

      customer.wallet_balance -= deductedBalance
      liveCall.status = 'Completed'
      liveCall.amount = deductedBalance
      await liveCall.save()

      await customer.save()

      database.ref(`LiveStreaming/${room_id}`).set({
        coHostData: 'null',
      })

      const waitListRef = database.ref(`LiveStreaming/${room_id}/WaitingList`);
      const snapshot = await waitListRef
        .orderByChild('userID')
        .equalTo(user_id)
        .once('value');
      if (snapshot.exists()) {
        await waitListRef.child(snapshot.key).remove();
      }

      res.status(200).json({
        success: true,
      });
    } else {
      res.status(200).json({
        success: false,
      });
    }
  } catch (error) {
    console.error("Error fetching data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch data",
      error: error.message,
    });
  }
};




//===================== Testimonial ==============================================
const getAllTestimonial = async function (req, res) {
  try {
    // Fetch all Testimonial from the database
    const testimonial = await Testimonial.find({ status: "Active" });

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


// =========================== Blog List ============================


const blogList = async function (req, res) {
  try {
    const Blog = await Blogs.find({ status: "Active" });

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



export {
  customerSignup,
  customerLogin,
  verifyCustomer,
  customerGoogleLogin,
  getCustomersDetail,
  getAllCustomers,
  calculateAndDeductChatPrice,
  updateChatHistoryAndBalances,
  linkedProfile,
  storeFile,
  updateCustomerDetails,
  rechargeCustomerWallet,
  customersWalletBalance,
  customersWalletHistory,
  getCustomerAllFirstRechargeOffer,
  getCustomerAllRechargePlan,
  getCustomersReview,
  getallLinkedProfile,
  sendNotificationToCustomer,
  initiateCall,
  createCall,
  timeoutCall,
  cancelCall,
  acceptCall,
  rejectCall,
  disconectCall,
  getNextPerfectMinute,
  endCall,
  getCallData,
  initiateChat,
  chatHistoryOfCustomer,
  calculateAndDeductCallPrice,
  CallHistoryOfCustomer,
  customerHomeBanner,
  astrologerDetailesBanner,
  getCustmerNotification,
  updateCustomerNotification,
  initateLiveStreaming,
  createLiveRoom,
  endLiveStreaming,
  stopLiveStreaming,
  getLiveStreaming,
  sendGiftInLiveStreaming,
  createLiveCalls,
  endLiveCalls,
  getAllTestimonial,
  blogList
}