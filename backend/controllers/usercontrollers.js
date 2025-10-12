import validator from "validator";
import bcrypt from "bcrypt";
import userModel from "../models/usermodel.js";
import jwt from "jsonwebtoken";
import { v2 as cloudinary } from "cloudinary";
import doctorsModel from "../models/doctorsmodel.js";
import AppointmentData from "../models/appointmentmodel.js";
import razorpay from "razorpay";
// api to new register user
const registerUser = async (req, res) => {
  try {
    const { name, email, password } = req.body;
    if (!name || !email || !password) {
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
    const userprofile = {
      name,
      email,
      password: hashedPassword,
    };
    const user = new userModel(userprofile);

    const usertoken = await user.save();

    const token = jwt.sign({ id: usertoken._id }, process.env.JWT_SECRET);
    res.json({
      success: true,
      token,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api to user login

const loginUser = async (req, res) => {
  try {
    const { email, password } = req.body;
    if (!email || !password) {
      res.status(400).json({
        success: false,
        message: "All fields are required",
      });
    }
    const user = await userModel.findOne({ email });
    if (!user) {
      res.status(400).json({
        success: false,
        message: "User not found",
      });
    }
    const ismatch = await bcrypt.compare(password, user.password);
    if (ismatch) {
      const token = jwt.sign({ id: user._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      res.status(400).json({
        success: false,
        message: "Invalid credentials",
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

//api to get user profile

const getUser = async (req, res) => {
  try {
    /* const userid  = req.body.userid; */
    const userid = req.user.id;

    const user = await userModel.findById(userid).select("-password");
    res.json({
      success: true,
      user,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api to update user profile

const updateUser = async (req, res) => {
  try {
    const { name, phone, address, dob, gender } = req.body;
    /* const userid  = req.body.userid; */
    const userid = req.user.id;
    /* console.log(userid); */

    const imagefile = req.file;
    console.log(req.body);
    if (!name || !phone || !address || !dob || !gender) {
      res.status(400).json({
        success: false,
        message: "Please fill all the fields",
      });
    }
    await userModel.findByIdAndUpdate(userid, {
      name,
      phone,
      address: JSON.parse(address),
      dob,
      gender,
    });
    if (imagefile) {
      const imageupload = await cloudinary.uploader.upload(imagefile.path, {
        resource_type: "image",
      });
      const imageurl = imageupload.secure_url;
      await userModel.findByIdAndUpdate(userid, {
        image: imageurl,
      });
    }
    res.json({
      success: true,
      message: "User updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// api for book appointment
const bookAppointment = async (req, res) => {
  try {
    const { docId, slotDate, slotTime } = req.body;
    const userId = req.user.id;
    const docData = await doctorsModel.findById(docId).select("-password");
    console.log("slotTime", slotTime);
    if (!docData.available) {
      return res.json({
        success: false,
        message: "Doctor is not available",
      });
    }

    let slots_booked = docData.slots_booked;

    //console.log("slots_booked", slots_booked);

    if (slots_booked[slotDate]) {
      if (slots_booked[slotDate].includes(slotTime)) {
        res.json({
          success: false,
          message: "Slot is already booked",
        });
      } else {
        slots_booked[slotDate].push(slotTime);
      }
    } else {
      slots_booked[slotDate] = [];
      slots_booked[slotDate].push(slotTime);
    }

    const userData = await userModel.findById(userId).select("-password");
    delete docData.slots_booked;
    const appointmentData = {
      userId,
      docId,
      slotDate,
      slotTime,
      userData,
      docData,
      amount: docData.fees,
      date: Date.now(),
    };
    const newappointment = new AppointmentData(appointmentData);
    await newappointment.save();

    await doctorsModel.findByIdAndUpdate(docId, { slots_booked });

    res.json({
      success: true,
      message: "Appointment booked successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

// get my appointments
const listappointment = async (req, res) => {
  try {
    const userId = req.user.id;
    console.log(userId);
    const appointments = await AppointmentData.find({ userId });
    res.json({
      success: true,
      appointments,
    });
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

// api for cancel appointment
const cancelAppointment = async (req, res) => {
  try {
    const userId = req.user.id;
    const { appointmentId } = req.body;
    const appointmentData = await AppointmentData.findById(appointmentId);
    if (appointmentData.userId !== userId) {
      return res.json({
        success: false,
        message: "You are not authorized to cancel this appointment",
      });
    }
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
const rezorpayInstance = new razorpay({
  key_id: process.env.REZORPAY_KEY_ID,
  key_secret: process.env.REZORPAY_KEY_SECRET,
});
// api for payment with the help of razorpay
const paymentrazorpay = async (req, res) => {
  try {
    const { appointmentId } = req.body;
    const appointmentData = await AppointmentData.findById(appointmentId);
    if (!appointmentData || appointmentData.cancelled) {
      return res.json({
        success: false,
        message: "Appointment not found or cancelled",
      });
    }
    const option = {
      amount: appointmentData.amount * 100,
      currency: process.env.CURRENCY,
      receipt: appointmentId,
    };
    const order = await rezorpayInstance.orders.create(option);
    res.json({
      success: true,
      order,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
// api for verifying payment
const verifyRazorpay = async (req, res) => {
  try {
    const { razorpay_order_id } = req.body;
    const oderinfo = await rezorpayInstance.orders.fetch(razorpay_order_id);
  /*   console.log(oderinfo); */
    if (oderinfo.status === "paid") {
      await AppointmentData.findByIdAndUpdate(oderinfo.receipt, {
        payment: true,
      });
      res.json({
        success: true,
        message: "payment successful",
      });
    } else {
      res.json({
        success: false,
        message: "payment failed",
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
export {
  bookAppointment,
  updateUser,
  getUser,
  registerUser,
  loginUser,
  listappointment,
  cancelAppointment,
  paymentrazorpay,
  verifyRazorpay,
};
