const { model, Schema } = require("dynamoose");

const ScheduleObject = {
    start_time: {
      type: String,
      required: true,
    },
    end_time: {
      type: String,
      required: true,
    }
};

const scheduleSchema = new Schema({
    id: {
        type: String,
        required: true,
        hashKey: true
    },
    schedule: {
        type: Array,
        schema: [
            {
                type: Object,
                schema: ScheduleObject
            }
        ],
        default: []
    }
},{
    timestamps: true
});

const Schedule = model(`Schedule-${process.env.STAGE}`, scheduleSchema, {
    throughput: 'ON_DEMAND'
})

module.exports = Schedule;