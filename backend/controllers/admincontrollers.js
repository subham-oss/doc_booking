import validator from "validator";
import bcrypt from "bcrypt";
import { v2 as cloudinary } from "cloudinary";
import doctorsModel from "../models/doctorsmodel.js";
import jwt from "jsonwebtoken";
import AppointmentData from "../models/appointmentmodel.js";
import userModel from "../models/usermodel.js";
const addDoctor = async (req, res) => {
  try {
    const {
      name,
      email,
      password,
      speciality,
      degree,
      experience,
      about,
      fees,
      address,
    } = req.body;
    const image = req.file;
    if (
      !name ||
      !email ||
      !password ||
      !speciality ||
      !degree ||
      !experience ||
      !about ||
      !fees ||
      !address
    ) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    if (!validator.isEmail(email)) {
      res.status(400).json({
        success: false,
        message: "please enter a valid email",
      });
    }
    if (password.length < 8) {
      res.status(400).json({
        success: false,
        message: "please enter a password of atleast 8 characters",
      });
    }
    const salt = await bcrypt.genSalt(10);
    const hashedPassword = await bcrypt.hash(password, salt);

    const imageupload = await cloudinary.uploader.upload(image.path, {
      resource_type: "image",
    });
    const imageurl = imageupload.secure_url;
    const doctordata = {
      name,
      email,
      password: hashedPassword,
      image: imageurl,
      speciality,
      degree,
      experience,
      about,
      fees,
      address: JSON.parse(address),
      date: Date.now(),
    };
    const newDoctor = new doctorsModel(doctordata);
    await newDoctor.save();
    res.json({
      success: true,
      message: "doctor added successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const adminlogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (
      email === process.env.ADMIN_EMAIL &&
      password === process.env.ADMIN_PASSWORD
    ) {
      const token = jwt.sign(email + password, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.json({
        success: false,
        message: "invalid credentials",
      });
    }
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const allDoctors = async (req, res) => {
  try {
    const doctors = await doctorsModel.find({}).select("-password");
    res.json({
      success: true,
      doctors,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
//api to get all appointments list
const appointmentsaAdmin = async (req, res) => {
  try {
    const appointments = await AppointmentData.find({});
    res.json({
      success: true,
      appointments,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api for cancelling appointment by admin
const cancelAppointment = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await AppointmentData.findById(appointmentId);

    await AppointmentData.findByIdAndUpdate(appointmentId, { cancelled: true });

    const { docId, slotDate, slotTime } = appointmentData;
    const doctordata = await doctorsModel.findById(docId);
    let slots_booked = doctordata.slots_booked;
    slots_booked[slotDate] = slots_booked[slotDate].filter(
      (slot) => slot !== slotTime
    );
    await doctorsModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment cancelled successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// api for get dashboard data for admin panel
const adminDashboard = async (req,res)=>{
  try {
    const user = await userModel.find({}).select('-password');
    const doctors = await doctorsModel.find({}).select('-password');
    const appointments = await AppointmentData.find({});
    const dashboardData = {
      users: user.length,
      doctors: doctors.length,
      appointments: appointments.length,
      latestAppointments:appointments.reverse().slice(0, 5),
    };
    res.json({
      success: true,
      message: "Dashboard data fetched successfully",
     dashboardData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
}

export {adminDashboard, addDoctor, adminlogin, allDoctors, appointmentsaAdmin,cancelAppointment };
