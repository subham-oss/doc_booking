import express from 'express'
import { addDoctor,adminlogin, allDoctors, appointmentsaAdmin, cancelAppointment,adminDashboard } from '../controllers/admincontrollers.js'
import upload from '../middlewares/multer.js'
import authadmin from '../middlewares/authadmin.js'
import { changeAvailability } from '../controllers/doctorcontrollers.js'
const addminRouter = express.Router()

addminRouter.post('/add-doctor',authadmin,upload.single('image'),addDoctor)
addminRouter.post('/login',adminlogin)
addminRouter.post('/all-doctors',authadmin,allDoctors)
addminRouter.post('/change-availability',authadmin,changeAvailability)
addminRouter.get('/appointments',authadmin,appointmentsaAdmin)
addminRouter.post('/cancel-appointment',authadmin,cancelAppointment)
addminRouter.get('/dashboard',authadmin,adminDashboard)
export default addminRouter