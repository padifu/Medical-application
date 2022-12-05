const express = require('express');
const auth = require('../../../middlewares/auth');
const patientController = require('../../../controllers/Patient/patient.controller');
const router = express.Router();

router.route('/').post(auth('doctor'), patientController.createPatient).get(patientController.getPatients);

router.route('/doc/:doctorId').get(patientController.getPatientsByDoctor);
router.route('/searchByName').post(auth('doctor'), patientController.getPatientByName);
router.route('/today').get(patientController.getTodayPatients)
router.route('/searchByDate').post(patientController.getPatientsByDate);
router
.route('/searchByUserId')
.post(patientController.getPatientByUserId)
router
.route('/:id')
.get(patientController.getPatient)
.patch(auth('doctor'), patientController.updatePatient)
.delete(auth('doctor'), patientController.deletePatient);

router.route('/report/age').get(patientController.getPatientAgeReport)
router.route('/report/height').get(patientController.getPatientHeightReport)
router.route('/report/weight').get(patientController.getPatientWeightReport)

module.exports = router;
