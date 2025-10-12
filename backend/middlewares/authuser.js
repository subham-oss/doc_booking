import jwt from "jsonwebtoken";

const authuser=(req,res,next)=>{
    try{
        const {token}=req.headers
        if(!token){
            return res.json({
                success:false,
                message:"No token found"
            })
        }
        const token_verifyed=jwt.verify(token,process.env.JWT_SECRET)
        req.user=token_verifyed
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
export default authuser;