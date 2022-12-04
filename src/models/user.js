const { model, Schema } = require("dynamoose");
const validator = require('validator')
const userSchema = new Schema({
    id: {
        type: String,
        required: true,
        hashKey: true
    },
    name: {
        type: String,
        required: true,
    },
    lastName: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
        validate: validator.isEmail,
        index: {
            name: 'emailIndex',
            global: true
        }
    },
    password: {
        type: String,
        required: true
    },
    role: {
        type: String,
        required: true,
        default: 'USER'
    }
},{
    timestamps: true
});

const User = model(`User-${process.env.STAGE}`, userSchema, {
    throughput: 'ON_DEMAND'
})

module.exports = User;