const Schedule = require("../models/schedule");
const User = require( "../models/user");


const emailExist = async(email)=>{
    const users = await User.scan().where('email').eq(email).exec();
    if (Array.isArray(users) && users.length > 0) {
        throw new Error('User exist in db');
    }
}

const scheduleExist = async(id) => {
    const schedule = await Schedule.get(id);
    if(!schedule) {
        throw new Error('Schedule not exist in db')
    }
}
module.exports = {
    emailExist,
    scheduleExist
}