const User = require( "../models/user");


const emailExist = async(email)=>{
    const users = await User.scan().where('email').eq(email).exec();
    if (Array.isArray(users) && users.length > 0) {
        throw new Error('El usuario ya existe');
    }
}
module.exports = {
    emailExist
}