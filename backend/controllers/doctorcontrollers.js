import doctorsModel from "../models/doctorsmodel.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import AppointmentData from "../models/appointmentmodel.js";
const changeAvailability = async (req, res) => {
  try {
    const { docid } = req.body;
    const docdata = await doctorsModel.findById(docid);
    await doctorsModel.findByIdAndUpdate(docid, {
      available: !docdata.available,
    });
    res.json({
      success: true,
      message: "Availability changed",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
const doctorlist = async (req, res) => {
  try {
    const doctors = await doctorsModel.find({}).select(["-email", "-password"]);
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
// api for doctor login
const DoctorLogin = async (req, res) => {
  try {
    const { email, password } = req.body;
    const doctor = await doctorsModel.findOne({ email });
    if (!doctor) {
      return res.json({
        success: false,
        message: "Invalid Credentials",
      });
    }

    const ismatch = await bcrypt.compare(password, doctor.password);
    if (ismatch) {
      const token = jwt.sign({ id: doctor._id }, process.env.JWT_SECRET);
      res.json({
        success: true,
        token,
      });
    } else {
      return res.json({
        success: false,
        message: "Invalid Credentials",
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

const appointmentDoctor = async (req, res) => {
  try {
    const { id } = req.doctor;
    /*  console.log(id); */

    const appointment = await AppointmentData.find({ docId: id });
    res.json({
      success: true,
      appointment,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const appointmentComplete = async (req, res) => {
  try {
    const { id } = req.doctor;
    const { appointmentId } = req.body;
    const appointment = await AppointmentData.findById(appointmentId);
    if (appointment && appointment.docId.toString() === id.toString()) {
      await AppointmentData.findByIdAndUpdate(appointmentId, {
        isCompleted: true,
      });
      return res.json({
        success: true,
        message: "Appointment Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Appointment not found",
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
const appointmentCancel = async (req, res) => {
  try {
    const { id } = req.doctor;
    const { appointmentId } = req.body;
    const appointment = await AppointmentData.findById(appointmentId);
    if (appointment && appointment.docId.toString() === id.toString()) {
      await AppointmentData.findByIdAndUpdate(appointmentId, {
        cancelled: true,
      });
      return res.json({
        success: true,
        message: "Canceled Completed",
      });
    } else {
      return res.json({
        success: false,
        message: "Cancellation not found",
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
const Doctordashboard = async (req, res) => {
  try {
    const { id } = req.doctor;
    const appointments = await AppointmentData.find({ docId: id });
    let earning = 0;

    appointments.map((item) => {
      if (item.isCompleted || item.payment) {
        earning += item.amount;
      }
    });

    let pacient = [];
    appointments.map((item) => {
      if (!pacient.includes(item.userId)) {
        pacient.push(item.userId);
      }
    });

    const dashdata = {
      earning,
      appointments: appointments.length,
      pacient: pacient.length,
      latestAppointment: appointments.reverse().slice(0, 5),
    };
    return res.json({
      success: true,
      dashdata,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

//api for get doctor profile
const doctorProfile = async (req, res) => {
  try {
    const { id } = req.doctor;
    const profileData = await doctorsModel
      .findById({ _id: id })
      .select("-password");
    return res.json({
      success: true,
      profileData,
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};

const UpdateProfile = async (req, res) => {
  try {
    const { id } = req.doctor;
    const { fees, address, available } = req.body;
    await doctorsModel.findByIdAndUpdate(
      { _id: id },
      { fees, address, available }
    );
    return res.json({
      success: true,
      message: "Profile updated successfully",
    });
  } catch (error) {
    console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
  }
};
export {
  DoctorLogin,
  changeAvailability,
  doctorlist,
  appointmentDoctor,
  appointmentComplete,
  appointmentCancel,
  Doctordashboard,
  doctorProfile,
  UpdateProfile,
};
