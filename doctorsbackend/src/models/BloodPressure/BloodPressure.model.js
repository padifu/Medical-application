const mongoose = require('mongoose');

const Schema = mongoose.Schema;

let BloodPressureSchema = new Schema(
  {
    rate: {
      type: String,
      required: true,
    },
    desc: {
      type: String,
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
    },
    patient: {
      type: Schema.Types.ObjectId,
      ref: 'Patient',
    },
    created_at: {
      type: String,
      required: true,
      default: new Date(),
    },
    updated_at: {
      type: String,
    },
  },
  {
    timestamps: true,
  }
);

const vitalParam = mongoose.model('BloodPressure', BloodPressureSchema);
module.exports = vitalParam;
