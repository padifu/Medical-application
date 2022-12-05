const httpStatus = require('http-status');
const HeartRate = require('../../models/HeartRate/HeartRate.model');
const ApiError = require('../../utils/ApiError');

const createHeartRate = async (d_body) => {
  return HeartRate.create(d_body);
};

const getAllHeartRates = async () => {
  return HeartRate.find().populate('patient doctor');
};

const getHeartRateById = async (id) => {
  return HeartRate.findById(id).populate('patient doctor');
};
const getHeartRateByPatientId = async (patientId) => {
  return HeartRate.find({ patient: patientId }).populate('patient doctor');
};
const updateHeartRateById = async (id, updateBody) => {
  const result = await getHeartRateById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Heart Rate not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

const deleteHeartRateById = async (id) => {
  const result = await getHeartRateById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Heart Rate not found');
  }
  await result.remove();
  return result;
};

module.exports = {
  createHeartRate,
  getAllHeartRates,
  getHeartRateById,
  getHeartRateByPatientId,
  updateHeartRateById,
  deleteHeartRateById,
};
