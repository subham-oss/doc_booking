import express from 'express'
import cors from 'cors'
import 'dotenv/config'
import connectDB from './config/mongodb.js'
import connectCloudinary from './config/cloudinary.js'
import addminRouter from './routes/adminRouter.js'
import doctorRouter from './routes/doctorRouter.js'
import userRouter from './routes/userRouter.js'
const app = express()
const port = process.env.PORT || 4000
connectDB()
connectCloudinary()
app.use(express.json())
app.use(cors())
app.use('/api/doctor',addminRouter)
app.use('/api/admin',doctorRouter)
app.use('/api/user',userRouter)
app.get('/',(req,res)=>{
    console.log("that is working");
    
    res.send('Hello World')
})
app.listen(port, () => console.log(`Server running on port ${port}`))