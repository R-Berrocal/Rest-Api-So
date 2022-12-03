const User = require("../models/user")
const {v4} = require('uuid');

const createUser = async( req, res) => {
    try {
        const { body } = req;
        

        const user = await User.create({
            id: v4(),
            ...body
        })
        
        return res.json({
            user
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        msg: "hable con el administrador",
        });
    }
}

module.exports={
    createUser
}