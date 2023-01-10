const { model, Schema } = require("dynamoose");
const User = require("./user");

const modifiedScheduleSchema = new Schema({
    id: {
        type: String,
        required: true,
        hashKey: true
    },
    modifiedBy: User,
},{
    timestamps: true
});

const ModifiedSchedule = model(`ModifiedSchedule-${process.env.STAGE}`, modifiedScheduleSchema, {
    throughput: 'ON_DEMAND'
})

module.exports = ModifiedSchedule;