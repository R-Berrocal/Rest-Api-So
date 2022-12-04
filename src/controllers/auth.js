const bcryptjs = require("bcryptjs");
const {request,response} = require("express");
const { generateJWT } = require("../helpers/generate-jwt");
const User =  require("../models/user");

const login = async (req=request,res= response)=>{
    const {email, password}=req.body;

    try {
        //Verificar si el email existe
        const [user] = await User.scan({ email }).exec();
        
        if(!user){
            return res.status(400).json({
                msg: "User / Password are not correct - mail"
            })
        }

        const validPassword = bcryptjs.compareSync(password, user.password);
        if(!validPassword){
            return res.status(400).json({
                msg: "User / Password are not correct - password"
            })
        }

        const token = await generateJWT(user.id);

        res.json({
            user,
            token
        })
    } catch (error) {
        return res.status(500).json({
            msg: "Talk to the administrator"
        })
    }
}

const renovate_o_validateJwt=async(req,res)=>{
    const user = req.user;
    const token = await generateJWT(user.id);

    res.json({
        user,
        token
    })
}

module.exports = {
    login,
    renovate_o_validateJwt
}