const User = require("../models/user")
const {v4} = require('uuid');
const bcryptjs = require('bcryptjs');
const { generateJWT } = require("../helpers/generate-jwt");

const createUser = async( req, res) => {
    try {
        const { body } = req;
        
        const salt = bcryptjs.genSaltSync();
        body.password = bcryptjs.hashSync(body.password, salt);
        const user = await User.create({
            id: v4(),
            ...body
        })
        const token = await generateJWT(user.id)
        return res.json({
            user,
            token
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        msg: "Talk to the administrator",
        });
    }
}


const getUsers = async(req, res ) => {
    try {
        const users = await User.scan().exec()
        res.json({
            users
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        msg: "Talk to the administrator",
        }); 
    }
}

const getUser = async( req, res ) => {
    try {
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

        return res.json({
            user: userFind
        })
    } catch (error) {
        console.log(error);
        return res.status(500).json({
        msg: "Talk to the administrator",
        }); 
    }
}
module.exports={
    createUser,
    getUsers,
    getUser
}