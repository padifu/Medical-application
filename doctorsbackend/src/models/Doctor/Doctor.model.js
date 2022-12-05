const mongoose = require("mongoose")

const Schema = mongoose.Schema;

let doctorSchema = new Schema({
    name: {
        type: String,
        required: true
    },
    phone: {
        type: String,
        required: true
    },
    gender: {
        type: String,
        required: true
    },
    city: {
        type: String,
        required: true
    },
    specialization: {
        type: String,
        required: true
    },
    salary: {
        type: String,
        required: true
    },
    userId: {
        type: Schema.Types.ObjectId,
        ref: 'User',
      },
    created_at: {
        type: String,
        required: true,
        default: new Date()
    },
    updated_at: {
        type: String,
    }
}, {
    timestamps: true
})


const doctor = mongoose.model('Doctor', doctorSchema)
module.exports = doctor