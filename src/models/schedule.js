const { model, Schema } = require("dynamoose");
const scheduleSchema = new Schema({
    id: {
        type: String,
        required: true,
        hashKey: true
    },
    start_time_1: {
        type: String,
        required: true,
    },
    end_time_1: {
        type: String,
        required: true,
    },
    start_time_2: {
        type: String,
        required: true,
    },
    end_time_2: {
        type: String,
        required: true,
    },
    start_time_3: {
        type: String,
        required: true,
    },
    end_time_3: {
        type: String,
        required: true,
    },
    start_time_4: {
        type: String,
        required: true,
    },
    end_time_4: {
        type: String,
        required: true,
    },
    start_time_5: {
        type: String,
        required: true,
    },
    end_time_5: {
        type: String,
        required: true,
    },
    start_time_6: {
        type: String,
        required: true,
    },
    end_time_6: {
        type: String,
        required: true,
    },
},{
    timestamps: true
});

const Schedule = model(`Schedule-${process.env.STAGE}`, scheduleSchema, {
    throughput: 'ON_DEMAND'
})

module.exports = Schedule;