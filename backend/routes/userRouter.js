import express from "express";
import {
  bookAppointment,
  cancelAppointment,
  getUser,
  listappointment,
  loginUser,
  paymentrazorpay,
  registerUser,
  updateUser,
  verifyRazorpay,
} from "../controllers/usercontrollers.js";
import authuser from "../middlewares/authuser.js";
import upload from "../middlewares/multer.js";

const userRouter = express.Router();

userRouter.post("/register", registerUser);
userRouter.post("/login", loginUser);
userRouter.get("/get-profile", authuser, getUser);
userRouter.post(
  "/update-profile",
  upload.single("image"),
  authuser,
  updateUser
);
userRouter.post("/booked-appointment", authuser, bookAppointment);
userRouter.get("/appointments", authuser, listappointment);
userRouter.post("/cancel-appointment", authuser, cancelAppointment);
userRouter.post("/payment-razorpay", authuser, paymentrazorpay);
userRouter.post("/verifyRazorpay", authuser, verifyRazorpay);
export default userRouter;
