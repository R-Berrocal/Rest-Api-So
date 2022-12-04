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
const validateAdmin = async(req, res, next) => {
    try {
        const user = req.user; 

        if(user.role !== 'ADMIN') {
            return res.status(401).json({
                msg:"Invalid token - user is not ADMIN"
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

const validateUserOrAdmin = async(req, res, next) => {
    const {user, params} = req;
    const userFind = await User.get(params.id);
    if(!userFind) {
        return res.status(400).json({
            msg: 'The User not exist'
        })
    }

    if(userFind.id !== user.id) {
        if(user.role !== 'ADMIN') {
            return res.status(401).json({
                msg: 'Unathorized'
            })
        }
    }

    next();
}
module.exports={
    validateJWT, 
    validateAdmin,
    validateUserOrAdmin
}