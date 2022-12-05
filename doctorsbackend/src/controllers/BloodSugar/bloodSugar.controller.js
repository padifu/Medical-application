const httpStatus = require('http-status');
const ApiError = require('../../utils/ApiError');
const catchAsync = require('../../utils/catchAsync');
const BloodSugarService = require('../../services/BloodSugar/bloodSugar.service');
require('dotenv').config();

const createBloodSugar = catchAsync(async (req, res) => {
  const result = await BloodSugarService.createBloodSugar(req.body);
  res.send(result);
});

const getBloodSugars = catchAsync(async (req, res) => {
  const result = await BloodSugarService.getAllBloodSugars();
  res.send(result);
});

const getBloodSugar = catchAsync(async (req, res) => {
  const result = await BloodSugarService.getBloodSugarById(req.params.id);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Sugar not found');
  }
  res.send(result);
});

const getBloodSugarByPatientId = catchAsync(async (req, res) => {
  const result = await BloodSugarService.getBloodSugarByPatientId(req.body.patientId);
  if (!result) {
    throw new ApiError(httpStatus.NOT_FOUND, 'Blood Sugar not found');
  }
  res.send(result);
});

const updateBloodSugar = catchAsync(async (req, res) => {
  req.body.updated_at = new Date();
  const result = await BloodSugarService.updateBloodSugarById(req.params.id, req.body);
  res.send(result);
});

const deleteBloodSugar = catchAsync(async (req, res) => {
  await BloodSugarService.deleteBloodSugarById(req.params.id);
  res.status(httpStatus.NO_CONTENT).send();
});

module.exports = {
  createBloodSugar,
  getBloodSugars,
  getBloodSugar,
  getBloodSugarByPatientId,
  updateBloodSugar,
  deleteBloodSugar,
};
