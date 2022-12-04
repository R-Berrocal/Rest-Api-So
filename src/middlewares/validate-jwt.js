const jwt = require("jsonwebtoken");
const User = require("../models/user");


const validateJWT=async(req,res,next)=>{
    const token = req.header("Authorization");
    if(!token){
        return res.status(401).json({
            msg: "There is no token in the request"
        })
    }


    try {
        const {id} =jwt.verify(token,process.env.SECRETORPRIVATEKEY);

        const user = await User.get(id);
        if(!user){
            return res.status(401).json({
                msg:"Invalid token - user does not exist in DB"
            })
        }


        req.user=user;


        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token not valid"
        })
    }
    
   
}
const validateRectorJWT = async(req, res, next) => {
    try {
        const user = req.user; 

        if(user.role !== 'ADMIN') {
            return res.status(401).json({
                msg:"Invalid token - user is not the rector"
            })
        }
        next();
    } catch (error) {
        console.log(error);
        res.status(401).json({
            msg: "Token not valid"
        })
    }
    
}
module.exports={
    validateJWT, 
    validateRectorJWT
}