import jwt from "jsonwebtoken";

const authadmin=(req,res,next)=>{
    try{
        const {atoken}=req.headers
        if(!atoken){
            return res.json({
                success:false,
                message:"No token found"
            })
        }
        const token_verifyed=jwt.verify(atoken,process.env.JWT_SECRET)
        if(!token_verifyed=== process.env.ADMIN_EMAI+process.env.ADMIN_PASSWORD){
            return res.json({
                success:false,
                message:"Invalid token"
            })
        }
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
export default authadmin;