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
        
        const userFind = await User.get(req.params.id);

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

const updateUser = async( req, res ) => {
    try {
        const {params, body} = req;
        const id = params.id;

        if(body.password) {
            const salt = bcryptjs.genSaltSync();
            body.password = bcryptjs.hashSync(body.password, salt)
        }

        const userUpdate = await User.update(id, body)
        return res.json({
            user: userUpdate
        })

    } catch (error) {
        console.log(error);
        return res.status(500).json({
            msg: "Talk to the administrator",
        }); 
    }
}

const deleteUser = async(req, res) => {
    try {
        const user = await User.get(req.params.id);
        
        if(!user) {
            res.status(400).json({
                msg: 'User not exist'
            })
        }
    
        await user.delete()
    
        res.json({
            msg: 'User Deleted',
            user
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
    getUser,
    updateUser, 
    deleteUser
}