import jwt from "jsonwebtoken";

const authdoctor=(req,res,next)=>{
    try{
        const {dtoken}=req.headers
        if(!dtoken){
            return res.json({
                success:false,
                message:"No token found"
            })
        }
        const token_verifyed=jwt.verify(dtoken,process.env.JWT_SECRET)
        req.doctor=token_verifyed
       /*  req.body.userid = token_verifyed.id */
       
        next();
    }
    catch(error){
        console.log(error);
    res.json({
      success: false,
      message: error.message,
    });
    }
}
export default authdoctor;