const mongoose = require('mongoose');

const Schema = mongoose.Schema;
const patientSchema = new Schema(
  {
    name: {
      type: String,
      required: true,
      es_indexed: true,
    },
    age: {
      type: Number,
      required: true,
      es_indexed: true,
    },
    height: {
      type: Number,
      required: true,
      es_indexed: true,
    },
    weight: {
      type: Number,
      required: true,
      es_indexed: true,
    },
    phone: {
      type: String,
      required: true,
      es_indexed: true,
    },
    gender: {
      type: String,
      required: true,
      es_indexed: true,
    },
    userId: {
      type: Schema.Types.ObjectId,
      ref: 'User',
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: 'Doctor',
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

const patient = mongoose.model('Patient', patientSchema);
module.exports = patient;
