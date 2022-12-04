const Schedule = require("../models/schedule")
const {v4} = require('uuid')

const createSchedule = async( req, res) => {
    try {
        const { body } = req;
        const schedule = await Schedule.create({
            id: v4(),
            ...body
        })

        res.json({
            schedule
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const getSchedules = async(req, res) => {
    try {
        const schedules = await Schedule.scan().exec();
        console.log(schedules);
        res.json({
            schedules
        })

    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const getSchedule = async(req, res) => {
    try {
        const schedule = await Schedule.get(req.params.id);
        res.json({
            schedule
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const updateSchedule = async (req, res) => {
    try {
        const { params, body} = req;
        const schedule = await Schedule.update(params.id, body)
        res.json({
            schedule
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}

const deleteSchedule = async(req, res) => {
    try {
        const schedule = await Schedule.get(req.params.id);
        await schedule.delete();
        res.json({
            msg: 'Schedule deleted',
            schedule
        })
    } catch (error) {
        console.log(error);
        res.status(500).json({
            msg: 'Talk to the administrator'
        })
    }
}
module.exports = {
    createSchedule,
    getSchedules,
    getSchedule,
    updateSchedule,
    deleteSchedule
}