const {v4} = require('uuid');
const ModifiedSchedule = require("../models/modifiedSchedule");

const createModifiedSchedule = async( req, res) => {
    try {
        const user = req.user;
        const modifiedSchedule = await ModifiedSchedule.create({
            id: v4(),
            modifiedBy: user.id
        })

        res.json({
            modifiedSchedule
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const getModifiedSchedules = async(req, res) => {
    try {
        const modifiedSchedules = await (await ModifiedSchedule.scan().exec()).populate();
        console.log({modifiedSchedules});
        res.json({
            modifiedSchedules
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

module.exports={
    createModifiedSchedule,
    getModifiedSchedules
}