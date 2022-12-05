const httpStatus = require('http-status');
const BloodSugar = require('../../models/BloodSugar/BloodSugar.model');
const ApiError = require('../../utils/ApiError');

const createBloodSugar = async (d_body) => {
  return BloodSugar.create(d_body);
};

const getAllBloodSugars = async () => {
  return BloodSugar.find().populate('patient doctor');
};

const getBloodSugarById = async (id) => {
  return BloodSugar.findById(id).populate('patient doctor');
};
const getBloodSugarByPatientId = async (patientId) => {
  return BloodSugar.find({ patient: patientId }).populate('patient doctor');
};
const updateBloodSugarById = async (id, updateBody) => {
  const result = await getBloodSugarById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Sugar not found');
  }
  Object.assign(result, updateBody);
  await result.save();
  return result;
};

const deleteBloodSugarById = async (id) => {
  const result = await getBloodSugarById(id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Sugar not found');
  }
  await result.remove();
  return result;
};

module.exports = {
  createBloodSugar,
  getAllBloodSugars,
  getBloodSugarById,
  getBloodSugarByPatientId,
  updateBloodSugarById,
  deleteBloodSugarById,
};
