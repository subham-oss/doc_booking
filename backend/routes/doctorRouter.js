import express from "express";
import {
  appointmentCancel,
  appointmentComplete,
  appointmentDoctor,
  doctorlist,
  DoctorLogin,
  Doctordashboard,
  doctorProfile,
  UpdateProfile,
} from "../controllers/doctorcontrollers.js";
import authdoctor from "../middlewares/authDoctor.js";

const doctorRouter = express.Router();

doctorRouter.get("/list", doctorlist);
doctorRouter.post("/login", DoctorLogin);
doctorRouter.get("/appointment", authdoctor, appointmentDoctor);
doctorRouter.post("/complete", authdoctor, appointmentComplete);
doctorRouter.post("/cancel", authdoctor, appointmentCancel);
doctorRouter.get("/dashboard", authdoctor, Doctordashboard);
doctorRouter.get("/profile", authdoctor, doctorProfile);
doctorRouter.post('/update',authdoctor,UpdateProfile)
export default doctorRouter;
