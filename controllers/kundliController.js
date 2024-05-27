import mongoose from "mongoose";
import mongoosePaginate from 'mongoose-paginate-v2';
import { Types } from "mongoose";
import multer from "multer";
// import configureMulter from "../configureMulter.js";
import Kundli from "../models/customerModel/Kundli.js";
// import KundliRequest from "../utils/kundliRequest";
import { KundliRequest } from "../utils/kundliRequest.js";
// import Customers from "../models/customerModel/Customers";

const addKundli = async (req, res) => {
  try {
    const {
      customerId,
      name,
      gender,
      dob,
      tob,
      place,
      lat,
      long,
    } = req.body;

    const newKundli = new Kundli({
      customerId,
      name,
      gender,
      dob,
      tob,
      place,
      lat,
      long,
    });

    await newKundli.save();

    res.status(201).json({
      success: true,
      message: "Customers kundli added successfully",
      inquiry: newKundli,
    });
  } catch (error) {
    console.error("Error adding Customer's kundli:", error);
    res.status(500).json({
      success: false,
      message: "Failed to add Customer's kundli",
      error: error.message,
    });
  }
};

const getAllKundli = async function (req, res) {
  try {
    const allKundli = await Kundli.find();

    res.status(200).json({ success: true, allKundli });
  } catch (error) {
    console.error("Error fetching all Kundli:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Kundli",
      error: error.message,
    });
  }
};

const getCustomerKundli = async function (req, res) {
  try {
    const { customerId } = req.body;

    const kundlis = await Kundli.find({ customerId });

    if (kundlis.length === 0) {
      return res
        .status(404)
        .json({ success: false, message: "No Kundli found for the customer." });
    }

    res.status(200).json({
      success: true,
      message: "Customer Kundlis:",
      kundlis,
    });
  } catch (error) {
    console.error("Error fetching Customer Kundlis:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch Customer Kundlis",
      error: error.message,
    });
  }
};

const deleteKundli = async function (req, res) {
  try {
    const { kundliId } = req.body;

    const deletedKundli = await Kundli.findByIdAndDelete(kundliId);

    if (!deletedKundli) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    res.status(200).json({
      success: true,
      message: "Kundli deleted successfully.",
      deletedKundli,
    });
  } catch (error) {
    console.error("Error deleting Kundli by ID:", error);
    res.status(500).json({
      success: false,
      message: "Failed to delete Kundli",
      error: error.message,
    });
  }
};


//****************************Planet api start*********************************
const getAllPlanetData = async (req, res) => {
  try {
    const { kundliId } = req.body;

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const planetDataResponse = await KundliRequest.getAllPlanetData(data);

    // console.log("Planet Data Response:", planetDataResponse);

    res.status(200).json({
      success: true,
      message: "Planet position fetched successfully",
      data: planetDataResponse,
    });
  } catch (error) {
    console.error("Error fetching planet positions:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch planet positions",
      error: error.message,
    });
  }
};

const getAllUpgrahaData = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getAllUpgrahaResponse = await KundliRequest.getAllUpgrahaData(data);

    res.status(200).json({
      success: true,
      message: "Upgraha data fetched successfully",
      data: getAllUpgrahaResponse,
    });

    // console.log(getAllUpgrahaResponse);

  } catch (error) {
    console.error("Error fetching All upgraha data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch All upgraha data",
      error: error.message,
    });
  }
};

const getDashamBhavMadhyaData = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getDashamBhavMadhyaData = await KundliRequest.getDashamBhavMadhyaData(data);

    res.status(200).json({
      success: true,
      message: "Upgraha data fetched successfully",
      data: getDashamBhavMadhyaData,
    });

    // console.log(getDashamBhavMadhyaData);

  } catch (error) {
    console.error("Error fetching all Dasham BhavMadhya Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch All Dasham BhavMadhya Data",
      error: error.message,
    });
  }
};

const getAshtakVargaData = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getAshtakVargaData = await KundliRequest.getAshtakVargaData(data);

    res.status(200).json({
      success: true,
      message: "AshtakVarga Data fetched successfully",
      data: getAshtakVargaData,
    });

    // console.log(getAshtakVargaData);

  } catch (error) {
    console.error("Error fetching all get Ashtak Varga Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch All get Ashtak Varga Data",
      error: error.message,
    });
  }
};

const getSarvashtakData = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getSarvashtakData = await KundliRequest.getSarvashtakData(data);

    res.status(200).json({
      success: true,
      message: "Sarvashtak Data fetched successfully",
      data: getSarvashtakData,
    });

    // console.log(getAshtakVargaData);

  } catch (error) {
    console.error("Error fetching all get Sarvashtak Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch All get Sarvashtak Data",
      error: error.message,
    });
  }
};

const getTransitData = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getTransitData = await KundliRequest.getTransitData(data);

    res.status(200).json({
      success: true,
      message: "Transit Data fetched successfully",
      data: getTransitData,
    });

    // console.log(getTransitData);

  } catch (error) {
    console.error("Error fetching get all Transit Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Transit Data",
      error: error.message,
    });
  }
};

//****************************Planet api end**********************************

//****************************Chart api start*********************************
const getLagnaChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getLagnaChart = await KundliRequest.getLagnaChart(data);

    res.status(200).json({
      success: true,
      message: "Lagna Chart fetched successfully",
      data: getLagnaChart,
    });

    // console.log(getLagnaChart);

  } catch (error) {
    console.error("Error fetching all Lagna Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Lagna Chart Data",
      error: error.message,
    });
  }
};

const getMoonChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getMoonChart = await KundliRequest.getMoonChart(data);

    res.status(200).json({
      success: true,
      message: "Moon Chart Data fetched successfully",
      data: getMoonChart,
    });

    // console.log(getMoonChart);

  } catch (error) {
    console.error("Error fetching all Moon Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Moon Chart Data",
      error: error.message,
    });
  }
};

const getSunChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getSunChart = await KundliRequest.getSunChart(data);

    res.status(200).json({
      success: true,
      message: "Sun Chart Data fetched successfully",
      data: getSunChart,
    });

    // console.log(getSunChart);

  } catch (error) {
    console.error("Error fetching get all Sun Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Sun Chart Data",
      error: error.message,
    });
  }
};

const getChalitChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getChalitChart = await KundliRequest.getChalitChart(data);

    res.status(200).json({
      success: true,
      message: "Chalit Chart Data fetched successfully",
      data: getChalitChart,
    });

    // console.log(getChalitChart);

  } catch (error) {
    console.error("Error fetching get all Chalit Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Chalit Chart Data",
      error: error.message,
    });
  }
};

const getHoraChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getHoraChart = await KundliRequest.getHoraChart(data);

    res.status(200).json({
      success: true,
      message: "Hora Chart Data fetched successfully",
      data: getHoraChart,
    });

    // console.log(getTransitData);

  } catch (error) {
    console.error("Error fetching get all Hora Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Hora Chart Data",
      error: error.message,
    });
  }
};

const getDreshkanChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getDreshkanChart = await KundliRequest.getDreshkanChart(data);

    res.status(200).json({
      success: true,
      message: "Dreshkan Chart Data fetched successfully",
      data: getDreshkanChart,
    });

    // console.log(getDreshkanChart);

  } catch (error) {
    console.error("Error fetching get all Dreshkan Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Dreshkan Chart Data",
      error: error.message,
    });
  }
};

const getNavamanshaChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getNavamanshaChart = await KundliRequest.getNavamanshaChart(data);

    res.status(200).json({
      success: true,
      message: "Navamansha Chart Data fetched successfully",
      data: getNavamanshaChart,
    });

    // console.log(getNavamanshaChart);

  } catch (error) {
    console.error("Error fetching get all Navamansha Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Navamansha Chart Data",
      error: error.message,
    });
  }
};

const getDashamanshaChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getDashamanshaChart = await KundliRequest.getDashamanshaChart(data);

    res.status(200).json({
      success: true,
      message: "Dashamansha Chart Data fetched successfully",
      data: getDashamanshaChart,
    });

    // console.log(getDashamanshaChart);

  } catch (error) {
    console.error("Error fetching get all Dashamansha Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Dashamansha Chart Data",
      error: error.message,
    });
  }
};

const getDwadashamanshaChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getDwadashamanshaChart = await KundliRequest.getDwadashamanshaChart(data);

    res.status(200).json({
      success: true,
      message: "Dwadashamansha Chart Data fetched successfully",
      data: getDwadashamanshaChart,
    });

    // console.log(getDwadashamanshaChart);

  } catch (error) {
    console.error("Error fetching get all Dwadashamansha Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Dwadashamansha Chart Data",
      error: error.message,
    });
  }
};

const getTrishamanshaChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getTrishamanshaChart = await KundliRequest.getTrishamanshaChart(data);

    res.status(200).json({
      success: true,
      message: "Trishamansha Chart Data fetched successfully",
      data: getTrishamanshaChart,
    });

    // console.log(getTrishamanshaChart);

  } catch (error) {
    console.error("Error fetching get all Trishamansha Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Trishamansha Chart Data",
      error: error.message,
    });
  }
};

const getShashtymshaChart = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const getShashtymshaChart = await KundliRequest.getShashtymshaChart(data);

    res.status(200).json({
      success: true,
      message: "Shashtymsha Chart Data fetched successfully",
      data: getShashtymshaChart,
    });

    // console.log(getShashtymshaChart);

  } catch (error) {
    console.error("Error fetching get all Shashtymsha Chart Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch all Shashtymsha Chart Data",
      error: error.message,
    });
  }
};

// kalsharpDoshaAnalysis
const kalsharpDoshaAnalysis = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const kalsharpDoshaAnalysis = await KundliRequest.kalsharpDoshaAnalysis(data);

    res.status(200).json({
      success: true,
      message: "kalsharp Dosha Analysis Data fetched successfully",
      data: kalsharpDoshaAnalysis,
    });

    // console.log(getShashtymshaChart);

  } catch (error) {
    console.error("Error fetching kalsharp Dosha Analysis Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch  kalsharp Dosha Analysis Data",
      error: error.message,
    });
  }
};

// kalsharpDoshaAnalysis
const pitriDoshaAnalysis = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const pitriDoshaAnalysis = await KundliRequest.pitriDoshaAnalysis(data);

    res.status(200).json({
      success: true,
      message: "pitri Dosha Analysis Data fetched successfully",
      data: pitriDoshaAnalysis,
    });

    // console.log(pitriDoshaAnalysis);

  } catch (error) {
    console.error("Error fetching pitri Dosha Analysis Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch pitri Dosha Analysis Data",
      error: error.message,
    });
  }
};

// kalsharpDoshaAnalysis
const mangalDoshaAnalysis = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const mangalDoshaAnalysis = await KundliRequest.mangalDoshaAnalysis(data);

    res.status(200).json({
      success: true,
      message: "mangal Dosha Analysis Data fetched successfully",
      data: mangalDoshaAnalysis,
    });

    // console.log(mangalDoshaAnalysis);

  } catch (error) {
    console.error("Error fetching mangal Dosha Analysis Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch mangal Dosha Analysis Data",
      error: error.message,
    });
  }
};

// kalsharpDoshaAnalysis
const sadhesatiAnalysis = async (req, res) => {
  try {
    const { kundliId } = req.body;
    // console.log(kundliId);

    const kundliData = await Kundli.findById(kundliId);

    if (!kundliData) {
      return res.status(404).json({
        success: false,
        message: "Kundli not found.",
      });
    }

    const dob = new Date(kundliData.dob);
    const tob = new Date(kundliData.tob);

    const data = {
      name: kundliData.name,
      day: dob.getDate().toString(),
      month: (dob.getMonth() + 1).toString(),
      year: dob.getFullYear().toString(),
      hour: tob.getHours().toString(),
      min: tob.getMinutes().toString(),
      place: kundliData.place,
      latitude: kundliData.lat.toString(),
      longitude: kundliData.long.toString(),
      timezone: "+5.5",
      gender: kundliData.gender,
      // apiKey: KundliRequest.key
    };

    const sadhesatiAnalysis = await KundliRequest.sadhesatiAnalysis(data);

    res.status(200).json({
      success: true,
      message: "sadhesati Analysis Data fetched successfully",
      data: sadhesatiAnalysis,
    });

    // console.log(sadhesatiAnalysis);

  } catch (error) {
    console.error("Error fetching sadhesati Analysis Data:", error);
    res.status(500).json({
      success: false,
      message: "Failed to fetch sadhesati Analysis Data",
      error: error.message,
    });
  }
};

//****************************Chart api end***********************************
export {
  addKundli,
  getAllKundli,
  getCustomerKundli,
  deleteKundli,
  getTransitData,
  getAllPlanetData,
  getAllUpgrahaData,
  getDashamBhavMadhyaData,
  getAshtakVargaData,
  getSarvashtakData,
  getLagnaChart,
  getMoonChart,
  getSunChart,
  getChalitChart,
  getHoraChart,
  getDreshkanChart,
  getNavamanshaChart,
  getDashamanshaChart,
  getDwadashamanshaChart,
  getTrishamanshaChart,
  getShashtymshaChart,
  kalsharpDoshaAnalysis,
  pitriDoshaAnalysis,
  mangalDoshaAnalysis,
  sadhesatiAnalysis

}